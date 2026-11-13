import { chromium } from '@playwright/test';

const browser = await chromium.launch();
for (const file of process.argv.slice(2)) {
  for (const [width, height, mobile] of [[1440, 900, false], [1920, 1080, false], [390, 844, true]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, isMobile: mobile, deviceScaleFactor: mobile ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto('file://' + file, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      words: document.body.innerText.split(/\s+/).length,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    console.log(file.split('/').at(-2), width, JSON.stringify(m));
    await ctx.close();
  }
}
await browser.close();
