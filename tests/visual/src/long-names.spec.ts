import { expect, test } from '@playwright/test';
import { urls } from '../playwright.config';

const wcagTextSpacing = `
  * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
  p { margin-bottom: 2em !important; }
`;

const pages = [
  {
    name: 'home page list',
    url: () => `${urls.site}/`,
    selector: '.mf-ledger-row h3',
    widths: [320, 1280],
  },
  {
    name: 'home page ideas',
    url: () => `${urls.site}/`,
    selector: '.mf-idea__name',
    widths: [320, 1280],
  },
  {
    name: 'app page',
    url: () => `${urls.storybook}/iframe.html?id=sheet--long-name&viewMode=story`,
    selector: '.mf-sheet__name',
    widths: [320],
  },
];

for (const { name, url, selector, widths } of pages) {
  for (const width of widths) {
    test(`${name} wraps a long one-word name at ${String(width)}px with WCAG text spacing`, async ({
      page,
      isMobile,
    }) => {
      test.skip(isMobile, 'The widths are set here.');
      await page.setViewportSize({ width, height: 800 });
      await page.goto(url());
      const title = page.locator(selector).first();
      await title.evaluate((element) => {
        element.textContent = 'Supercalifragilisticexpialidociousplanner';
      });
      await page.addStyleTag({ content: wcagTextSpacing });
      await page.evaluate(() => document.fonts.ready);

      const { textRight, boxRight, pageWidth } = await title.evaluate((element) => {
        const text = document.createRange();
        text.selectNodeContents(element);
        return {
          textRight: Math.max(...Array.from(text.getClientRects(), (line) => line.right)),
          boxRight: element.getBoundingClientRect().right,
          pageWidth: document.documentElement.scrollWidth,
        };
      });

      expect(pageWidth).toBeLessThanOrEqual(width);
      expect(textRight).toBeLessThanOrEqual(boxRight + 1);
    });
  }
}
