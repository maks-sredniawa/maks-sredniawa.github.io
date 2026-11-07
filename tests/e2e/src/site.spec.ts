import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test.describe('home page', () => {
  test('renders and hydrates without errors', async ({ page }) => {
    const errors = collectErrors(page);

    await page.goto('/');

    await expect(page).toHaveTitle('MaksForge · Small, free apps');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Small apps that do one thing well.',
    );
    // The prerendered HTML already carries ng-version; only hydration strips the ngh markers.
    await expect(page.locator('[ngh]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('has a section for every navigation link', async ({ page }) => {
    await page.goto('/');

    const targets = await page
      .getByRole('navigation', { name: 'Sections' })
      .getByRole('link')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));

    expect(targets.length).toBeGreaterThan(0);
    for (const target of targets) {
      await expect(page.locator(target)).toBeAttached();
    }
  });

  test('counts the live and in-development cards in About', async ({ page }) => {
    await page.goto('/');

    const live = await page.locator('#live .card').count();
    const building = await page.locator('#building .card').count();
    const facts = page.locator('.facts strong');

    await expect(facts.nth(0)).toHaveText(String(live));
    await expect(facts.nth(1)).toHaveText(String(building));
  });

  test('loads every image', async ({ page }) => {
    await page.goto('/');

    const broken = await page
      .locator('img')
      .evaluateAll((images) =>
        images
          .filter((image) => !(image as HTMLImageElement).naturalWidth)
          .map((image) => image.getAttribute('src')),
      );

    expect(broken).toEqual([]);
  });

  test('keeps the markup inside card summaries', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'GUIFlash' })).toHaveAttribute(
      'href',
      'https://github.com/CH4MPi/GUIFlash',
    );
    await expect(page.locator('#building span[lang="pl"]')).toHaveText('"Darek, otwórz bramę"');
  });
});

test.describe('accessibility', () => {
  for (const path of ['/', '/no-such-page']) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.goto(path);

      const { violations } = await new AxeBuilder({ page }).analyze();

      expect(violations.map((violation) => violation.id)).toEqual([]);
    });
  }
});

test.describe('not found page', () => {
  test('answers 404 with the not-found page', async ({ page }) => {
    const errors = collectErrors(page);

    const response = await page.goto('/no-such-page');

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle('Page not found · MaksForge');
    await page.getByRole('link', { name: 'Back to MaksForge' }).click();
    await expect(page).toHaveURL('/');
    expect(errors).toEqual([
      'Failed to load resource: the server responded with a status of 404 (Not Found)',
    ]);
  });
});

test.describe('shared assets', () => {
  test('serves the stylesheet the app sites load at a fixed URL', async ({ request }) => {
    const response = await request.get('/assets/style.css');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/css');
    expect(await response.text()).toContain('--accent');
  });

  test('caches the hashed bundles for a year', async ({ page, request }) => {
    await page.goto('/');
    const bundles = await page
      .locator('script[src]')
      .evaluateAll((scripts) => scripts.map((script) => script.getAttribute('src') ?? ''));

    expect(bundles.length).toBeGreaterThan(0);
    for (const bundle of bundles) {
      const response = await request.get(`/${bundle}`);
      expect(response.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
    }
  });

  test('serves the third-party licence notices', async ({ request }) => {
    const response = await request.get('/3rdpartylicenses.txt');

    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('Package: @angular/core');
  });

  test('sends the security headers', async ({ request }) => {
    const response = await request.get('/');

    expect(response.headers()['content-security-policy']).toContain("script-src 'self'");
    expect(response.headers()['x-frame-options']).toBe('DENY');
  });
});
