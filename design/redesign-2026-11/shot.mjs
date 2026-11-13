import { chromium } from '@playwright/test';
import { dirname, basename, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const MAX_SIDE = 8000;
const CAP_SCRIPT = `import sys
from PIL import Image
im = Image.open(sys.argv[1])
m = max(im.size)
if m > ${MAX_SIDE}:
    r = ${MAX_SIDE} / m
    im.resize((round(im.size[0] * r), round(im.size[1] * r)), Image.LANCZOS).save(sys.argv[1])`;

function hasPillow() {
  try {
    execFileSync('python3', ['-c', 'import PIL'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

const files = process.argv.slice(2);
const capShots = hasPillow();
if (!capShots) {
  console.warn(`python3 with Pillow not found: screenshots longer than ${MAX_SIDE}px are kept at full size (pip install Pillow to cap them).`);
}
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
    await page.waitForTimeout(300);
    const out = join(dirname(file), `${stem}-${v.name}.png`);
    await page.screenshot({ path: out, fullPage: true });
    if (capShots) execFileSync('python3', ['-c', CAP_SCRIPT, out]);
    await ctx.close();
  }
  console.log('shot', file);
}
await browser.close();
