import { chromium } from '@playwright/test';
const browser = await chromium.launch();
for (const v of [{n:'1440',w:1440,h:900},{n:'390',w:390,h:844,m:true}]) {
  const ctx = await browser.newContext({ viewport:{width:v.w,height:v.h}, deviceScaleFactor: v.m?2:1, isMobile:!!v.m });
  const p = await ctx.newPage();
  await p.goto('https://maksforge.com/', { waitUntil:'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const out = new URL(`home-${v.n}-full.png`, import.meta.url).pathname;
  await p.screenshot({ path: out, fullPage: true });
  const dims = await p.evaluate(() => ({ h: document.documentElement.scrollHeight, words: document.body.innerText.split(/\s+/).length, links: [...document.querySelectorAll('a[href^="#"]')].length }));
  console.log(v.n, JSON.stringify(dims));
  await ctx.close();
}
await browser.close();
