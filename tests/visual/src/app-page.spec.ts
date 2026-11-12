import { expect, test } from '@playwright/test';
import { urls } from '../playwright.config';

for (const id of [
  'app-page--home',
  'app-page--subpage',
  'dossier--home',
  'dossier--subpage',
  'sheet--home',
  'sheet--long-name',
  'sheet--subpage',
]) {
  test(id, async ({ page }) => {
    await page.goto(`${urls.storybook}/iframe.html?id=${id}&viewMode=story`);

    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${id}.png`);
  });

  test(`${id} at tablet width`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'The phone projects cover the narrow layout.');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(`${urls.storybook}/iframe.html?id=${id}&viewMode=story`);

    await expect(page.locator('#storybook-root')).toHaveScreenshot(`${id}-tablet.png`);
  });
}

for (const name of ['Woodworking planner', 'Bezpieczeństwo']) {
  for (const width of [1280, 1440, 1700, 2000]) {
    test(`sheet keeps the name ${name} clear of the pitch at ${String(width)}px`, async ({
      page,
      isMobile,
    }) => {
      test.skip(isMobile, 'The phone layout stacks the name above the pitch.');
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`${urls.storybook}/iframe.html?id=sheet--long-name&viewMode=story`);
      const title = page.locator('.mf-sheet__name');
      await title.evaluate((element, text) => {
        element.textContent = text;
      }, name);
      await page.evaluate(() => document.fonts.ready);

      const nameRight = await title.evaluate((element) => {
        const text = document.createRange();
        text.selectNodeContents(element);
        return Math.max(...Array.from(text.getClientRects(), (line) => line.right));
      });
      const pitch = await page.locator('.mf-sheet__pitch').boundingBox();

      expect(nameRight).toBeLessThanOrEqual(pitch?.x ?? 0);
    });
  }
}
