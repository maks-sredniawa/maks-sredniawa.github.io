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
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));

    expect(targets.length).toBeGreaterThan(0);
    for (const target of targets) {
      await expect(page.locator(target)).toBeAttached();
    }
  });

  for (const id of ['live', 'wot-mods']) {
    test(`lands the former #${id} link on the app list`, async ({ page }) => {
      await page.goto(`/#${id}`);

      await expect
        .poll(() => page.locator('#apps').evaluate((list) => list.getBoundingClientRect().top))
        .toBeLessThanOrEqual(24);
    });
  }

  test('filters the list by every option without a script', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    const rows = page.locator('.mf-ledger-row');
    const radios = page.getByRole('group', { name: 'Show' }).getByRole('radio');
    const values = await radios.evaluateAll((inputs) =>
      inputs.map((input) => (input as HTMLInputElement).value),
    );
    const shownIds = (): Promise<string[]> =>
      rows.evaluateAll((elements) =>
        elements.filter((row) => row.checkVisibility()).map((row) => row.id),
      );
    const idsWhere = (selector: string): Promise<string[]> =>
      page
        .locator(`.mf-ledger-row${selector}`)
        .evaluateAll((elements) => elements.map((row) => row.id));
    const favourites = await idsWhere('[data-favourite]');

    expect(values.slice(0, 2)).toEqual(['favourites', 'all']);
    expect(values.length).toBeGreaterThan(3);
    expect(await shownIds()).toEqual(favourites);
    for (const value of values) {
      await radios.and(page.locator(`[value="${value}"]`)).check();

      const expected = await idsWhere(
        value === 'all'
          ? ''
          : value === 'favourites'
            ? '[data-favourite]'
            : `[data-platform="${value}"]`,
      );
      expect(expected.length, value).toBeGreaterThan(0);
      expect(await shownIds(), value).toEqual(expected);
    }
    expect(favourites.length).toBeLessThan(await rows.count());
    await context.close();
  });

  test('opens the full list for a link to an app outside the favourites', async ({ page }) => {
    await page.goto('/#kozica');

    await expect(page.locator('.mf-filter input[value="all"]')).toBeChecked();
    await expect(page.locator('#kozica')).toBeInViewport();
  });

  test('a link to a favourite keeps the favourites', async ({ page }) => {
    await page.goto('/#gloam');

    await expect(page.locator('#gloam')).toBeInViewport();
    await expect(page.locator('.mf-filter input[value="favourites"]')).toBeChecked();
  });

  test('a link to the app list keeps the favourites', async ({ page }) => {
    await page.goto('/#apps');
    await expect(page.locator('[ngh]')).toHaveCount(0);

    await expect(page.locator('.mf-filter input[value="favourites"]')).toBeChecked();
  });

  test('the Apps link in the navigation keeps the chosen filter', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[ngh]')).toHaveCount(0);
    await page
      .getByRole('group', { name: 'Show' })
      .getByRole('radio', { name: /Android/ })
      .check();
    const hashChanged = page.evaluate(
      () =>
        new Promise((resolve) => {
          addEventListener('hashchange', () => setTimeout(resolve), { once: true });
        }),
    );

    await page
      .getByRole('navigation', { name: 'Sections' })
      .getByRole('link', { name: 'Apps' })
      .click();
    await hashChanged;

    await expect(page.locator('.mf-filter input[value="android"]')).toBeChecked();
  });

  for (const [id, tab] of [
    ['wot-mods', 'wot'],
    ['tools', 'dev'],
  ]) {
    test(`the former #${id} link selects its platform`, async ({ page }) => {
      await page.goto(`/#${id}`);

      await expect(page.locator(`.mf-filter input[value="${tab}"]`)).toBeChecked();
    });
  }

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
    await expect(page.locator('#darek span[lang="pl"]')).toHaveText('"Darek, otwórz bramę"');
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

test.describe('top bar', () => {
  const frauncesLoaded = (page: Page): Promise<boolean> =>
    page.evaluate(() => document.fonts.check('600 12px Fraunces'));

  for (const path of ['/', ...translations.map(({ path: page }) => page)]) {
    test(`${path} fits on one row at 960px beside a classic scrollbar`, async ({ page }) => {
      const windowWidth = 960;
      const classicScrollbar = 15;
      await page.setViewportSize({ width: windowWidth, height: 800 });
      await page.goto(path);
      // A media query counts the scrollbar, so only the layout may narrow.
      await page.addStyleTag({
        content: `html { width: ${String(windowWidth - classicScrollbar)}px }`,
      });
      await page.evaluate(() => document.fonts.ready);
      expect(await frauncesLoaded(page)).toBe(true);

      const midlines = await page.locator('.topbar > *').evaluateAll((children) =>
        children.map((child) => {
          const { top, height } = child.getBoundingClientRect();
          return top + height / 2;
        }),
      );

      expect(Math.max(...midlines) - Math.min(...midlines)).toBeLessThanOrEqual(1);
    });
  }

  for (const width of [800, 1000]) {
    test(`keeps its height at ${String(width)}px when the fonts land after first layout`, async ({
      page,
    }) => {
      let fontRequested = (): void => undefined;
      const firstFontRequest = new Promise<void>((resolve) => {
        fontRequested = resolve;
      });
      let releaseFonts = (): void => undefined;
      const fontsReleased = new Promise<void>((resolve) => {
        releaseFonts = resolve;
      });
      await page.route('**/*.woff2', async (route) => {
        fontRequested();
        await fontsReleased;
        await route.continue();
      });
      await page.setViewportSize({ width, height: 800 });

      await page.goto('/pt-br/', { waitUntil: 'domcontentloaded' });
      await firstFontRequest;
      const bar = page.locator('.topbar');
      const heightBeforeFonts = await bar.evaluate((row) => row.getBoundingClientRect().height);

      releaseFonts();
      await expect.poll(() => frauncesLoaded(page)).toBe(true);
      await page.evaluate(() => document.fonts.ready);

      expect(await bar.evaluate((row) => row.getBoundingClientRect().height)).toBe(
        heightBeforeFonts,
      );
    });
  }
});

test.describe('intro', () => {
  const swapsThatMovedTheCap = [
    { path: '/de/', width: 1280 },
    { path: '/es/', width: 1280 },
    { path: '/pt-br/', width: 1440 },
    { path: '/cs/', width: 1600 },
    { path: '/uk/', width: 1000 },
  ];

  for (const { path, width } of swapsThatMovedTheCap) {
    test(`${path} keeps its height at ${String(width)}px with or without the webfonts`, async ({
      browser,
    }) => {
      const introHeight = async (fonts: 'blocked' | 'loaded'): Promise<number> => {
        const page = await browser.newPage({ viewport: { width, height: 800 } });
        if (fonts === 'blocked') {
          await page.route('**/*.woff2', (route) => route.abort());
        }
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        const frauncesLoaded = await page.evaluate(() =>
          [...document.fonts].some(
            (face) => face.family === 'Fraunces' && face.status === 'loaded',
          ),
        );
        expect(frauncesLoaded).toBe(fonts === 'loaded');
        const height = await page
          .locator('.intro')
          .evaluate((intro) => intro.getBoundingClientRect().height);
        await page.close();
        return height;
      };

      expect(await introHeight('loaded')).toBe(await introHeight('blocked'));
    });
  }
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

    await page.locator('.mf-foot').click();
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

test.describe('MaksForge Studio', () => {
  test('shows the number of its Google listing on the home page', async ({ page }) => {
    await page.goto('/');

    const phone = page.locator('#studio a[href="tel:+48720855945"]');
    await expect(phone).toBeVisible();
    await expect(phone).toHaveText('+48 720 855 945');
  });

  test('serves its contact card as a vCard', async ({ request }) => {
    const response = await request.get('/assets/maks-forge-studio.vcf');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^text\/vcard/);
    const lines = (await response.text()).split('\r\n');
    expect(lines).toContain('FN:MaksForge Studio');
    expect(lines).toContain('TEL;TYPE=WORK,VOICE,CELL:+48720855945');
    expect(lines).toContain('ORG:MaksForge Studio');
  });

  test('gives its contact card the name and number the page publishes', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    const data = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    ) as { name: string; telephone: string };
    const card = await request.get('/assets/maks-forge-studio.vcf');
    const lines = (await card.text()).split('\r\n');

    expect(lines).toEqual(
      expect.arrayContaining([
        `FN:${data.name}`,
        `ORG:${data.name}`,
        `TEL;TYPE=WORK,VOICE,CELL:${data.telephone}`,
      ]),
    );
  });

  test('describes itself in structured data on every language of the home page', async ({
    page,
  }) => {
    for (const path of ['/', '/pl/']) {
      await page.goto(path);
      const data = JSON.parse(
        (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
      ) as Record<string, unknown>;

      expect(data).toMatchObject({ name: 'MaksForge Studio', telephone: '+48720855945' });
    }
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

  test('lets browsers cache the fonts', async ({ request }) => {
    const fonts = [
      '/assets/fonts/fraunces-latin-normal.woff2',
      '/assets/fonts/fraunces-latin-italic.woff2',
      '/assets/fonts/newsreader-latin-normal.woff2',
    ];

    for (const font of fonts) {
      const response = await request.get(font);
      expect(response.status(), font).toBe(200);
      expect(response.headers()['cache-control'], font).toBe('public, max-age=2592000');
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
