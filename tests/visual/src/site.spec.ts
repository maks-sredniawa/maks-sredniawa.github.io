import { expect, test } from '@playwright/test';
import { urls } from '../playwright.config';

// The home page shows only its first screen: the cards below change with every catalog edit
// and are covered by the component stories.
test('home page', async ({ page }) => {
  await page.goto(`${urls.site}/`);

  await expect(page).toHaveScreenshot('home.png');
});

test('not-found page', async ({ page }) => {
  await page.goto(`${urls.site}/no-such-page`);

  await expect(page).toHaveScreenshot('not-found.png', { fullPage: true });
});
