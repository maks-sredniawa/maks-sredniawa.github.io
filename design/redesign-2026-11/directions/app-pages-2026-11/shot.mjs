import { chromium } from '@playwright/test';
import { dirname, basename, join } from 'node:path';

const files = process.argv.slice(2);
const views = [
  { name: '1440', width: 1440, height: 900, scheme: 'light' },
  { name: '1920', width: 1920, height: 1080, scheme: 'light' },
  { name: '390', width: 390, height: 844, scheme: 'light', mobile: true },
  { name: '1440-dark', width: 1440, height: 900, scheme: 'dark' },
];
const browser = await chromium.launch();
for (const file of files) {
  const stem = basename(file, '.html');
  for (const v of views) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: v.mobile ? 2 : 1,
      isMobile: !!v.mobile,
      colorScheme: v.scheme,
    });
    const page = await ctx.newPage();
    await page.goto('file://' + file, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) console.log(`  overflow ${overflow}px at ${v.name} in ${stem}`);
    await page.screenshot({ path: join(dirname(file), `${stem}-${v.name}.png`), fullPage: true });
    await ctx.close();
  }
  console.log('shot', file);
}
await browser.close();
