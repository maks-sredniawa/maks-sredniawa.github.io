import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { themeAssets, themeClasses } from './pages-theme';

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

    const live = await page.locator('#live .mf-tile').count();
    const building = await page.locator('#building .mf-tile').count();
    const facts = page.locator('.mf-fact strong');

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

const translations = [
  { path: '/pl/', lang: 'pl' },
  { path: '/de/', lang: 'de' },
  { path: '/es/', lang: 'es' },
  { path: '/fr/', lang: 'fr' },
  { path: '/it/', lang: 'it' },
  { path: '/pt-br/', lang: 'pt-BR' },
  { path: '/cs/', lang: 'cs' },
  { path: '/uk/', lang: 'uk' },
];

async function chooseLanguage(page: Page, name: string): Promise<void> {
  await page.locator('details.lang summary').click();
  await page.getByRole('link', { name, exact: true }).click();
}

test.describe('translations', () => {
  for (const { path, lang } of translations) {
    test(`${path} is translated and hydrates without errors`, async ({ page }) => {
      const errors = collectErrors(page);

      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(
        'Small apps that do one thing well.',
      );
      await expect(page.locator('[ngh]')).toHaveCount(0);
      expect(errors).toEqual([]);
    });

    test(`${path} does not overflow sideways`, async ({ page }) => {
      await page.goto(path);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );

      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('every page links to its translations for search engines', async ({ page }) => {
    await page.goto('/pl/');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://maksforge.com/pl/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      translations.length + 2,
    );
  });

  test('a 404 stays in its language', async ({ page }) => {
    const response = await page.goto('/pl/no-such-page');

    expect(response?.status()).toBe(404);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await page.locator('.not-found .actions a').click();
    await expect(page).toHaveURL('/pl/');
  });
});

test.describe('language detection', () => {
  test.describe('with a Polish browser', () => {
    test.use({ locale: 'pl-PL' });

    test('a first visit lands on the Polish page', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveURL('/pl/');
    });

    test('keeps the section in the address', async ({ page }) => {
      await page.goto('/#tools');

      await expect(page).toHaveURL('/pl/#tools');
    });

    for (const start of ['/pl/', '/pl/no-such-page']) {
      test(`reaches English from ${start} when site data is blocked`, async ({ page }) => {
        await page.addInitScript(() => {
          Object.defineProperty(window, 'localStorage', {
            get() {
              throw new Error('blocked');
            },
          });
        });
        await page.goto(start);

        await chooseLanguage(page, 'English');

        await expect(page).toHaveURL('/');
      });
    }

    test('reaches English from the menu when site data is full', async ({ page }) => {
      await page.addInitScript(() => {
        Storage.prototype.setItem = () => {
          throw new DOMException('full', 'QuotaExceededError');
        };
      });
      await page.goto('/pl/');

      await chooseLanguage(page, 'English');

      await expect(page).toHaveURL('/');
    });

    test('remembers a switch back to English', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL('/pl/');

      await chooseLanguage(page, 'English');
      await expect(page).toHaveURL('/');

      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('with a Portuguese browser from Portugal', () => {
    test.use({ locale: 'pt-PT' });

    test('lands on the only Portuguese page', async ({ page }) => {
      await page.goto('/');

      await expect(page).toHaveURL('/pt-br/');
    });
  });

  test.describe('with a browser in a language the site does not have', () => {
    test.use({ locale: 'ja-JP' });

    test('stays on the English page', async ({ page }) => {
      await page.goto('/');

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page).toHaveURL('/');
    });
  });

  test('a chosen language overrides the browser on later visits', async ({ page }) => {
    await page.goto('/');

    await chooseLanguage(page, 'Deutsch');
    await expect(page).toHaveURL('/de/');

    await page.goto('/');
    await expect(page).toHaveURL('/de/');
  });

  test('the menu marks the current language and closes on Escape', async ({ page }) => {
    await page.goto('/pl/');
    await expect(page.locator('[ngh]')).toHaveCount(0);
    const summary = page.locator('details.lang summary');

    await summary.click();
    await expect(page.locator('a[aria-current="page"]')).toHaveText('Polski');

    await page.keyboard.press('Escape');
    await expect(page.locator('.lang-menu')).toBeHidden();
    await expect(summary).toBeFocused();
  });

  test('every language in the menu is detected from the browser', async ({
    baseURL,
    browser,
    page,
  }) => {
    await page.goto('/');
    const links = await page.locator('a[data-language]').evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        language: anchor.getAttribute('data-language') ?? '',
        path: anchor.getAttribute('href') ?? '',
      })),
    );

    expect(links).toHaveLength(translations.length + 1);
    for (const { language, path } of links) {
      const context = await browser.newContext({ locale: language });
      const visitor = await context.newPage();

      await visitor.goto(new URL('/', baseURL).href);

      await expect(visitor).toHaveURL(new URL(path, baseURL).href);
      await context.close();
    }
  });

  test('the menu closes when focus moves out of it', async ({ page }) => {
    await page.goto('/pl/');

    await page.locator('details.lang summary').click();
    await page.locator('.lang-menu a').last().focus();
    await page.keyboard.press('Tab');

    await expect(page.locator('.lang-menu')).toBeHidden();
  });

  test('the menu closes on a click outside it', async ({ page }) => {
    await page.goto('/pl/');

    await page.locator('details.lang summary').click();
    await expect(page.locator('.lang-menu')).toBeVisible();

    await page.getByRole('heading', { level: 1 }).click();
    await expect(page.locator('.lang-menu')).toBeHidden();
  });
});

test.describe('accessibility', () => {
  for (const path of ['/', '/no-such-page', ...translations.map(({ path: page }) => page)]) {
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
    expect(await response.text()).toContain('--color-brand');
  });

  test('defines every class the app sites use', async ({ request }) => {
    const css = await (await request.get('/assets/style.css')).text();

    const missing = themeClasses.filter(
      (name) => !new RegExp(String.raw`\.${name}(?![\w-])`).test(css),
    );

    expect(missing).toEqual([]);
  });

  test('serves every asset the app sites load', async ({ request }) => {
    for (const path of themeAssets) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });

  for (const path of ['/', '/pl/']) {
    test(`caches the hashed bundles of ${path} for a year`, async ({ page, request }) => {
      await page.goto(path);
      const bundles = await page
        .locator('script[type="module"][src]')
        .evaluateAll((scripts) => scripts.map((script) => script.getAttribute('src') ?? ''));

      expect(bundles.length).toBeGreaterThan(0);
      for (const bundle of bundles) {
        const response = await request.get(`${path}${bundle}`);
        expect(response.headers()['cache-control']).toBe('public, max-age=31536000, immutable');
      }
    });
  }

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
