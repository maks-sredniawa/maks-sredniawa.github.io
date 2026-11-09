import { expect, test } from '@playwright/test';
import { urls } from '../playwright.config';

for (const id of ['app-page--home', 'app-page--subpage', 'dossier--home', 'dossier--subpage']) {
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
