import { defineConfig, devices } from '@playwright/test';

const site = 'http://127.0.0.1:4811';
const storybook = 'http://127.0.0.1:4812';
const isCi = Boolean(process.env['CI']);

export const urls = { site, storybook };

export default defineConfig({
  testDir: 'src',
  outputDir: '../../dist/.playwright/tests/visual/test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: isCi,
  reporter: isCi
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: '../../dist/.playwright/tests/visual/report' }],
      ]
    : 'list',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.001 } },
  projects: [
    { name: 'desktop-dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    { name: 'desktop-light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
    {
      name: 'phone-dark',
      testIgnore: 'stories.spec.ts',
      use: { ...devices['Pixel 7'], colorScheme: 'dark' },
    },
    {
      name: 'phone-light',
      testIgnore: 'stories.spec.ts',
      use: { ...devices['Pixel 7'], colorScheme: 'light' },
    },
  ],
  webServer: [
    { command: 'node serve.mjs ../../_site 4811', url: site },
    { command: 'node serve.mjs ../../dist/storybook/ui 4812', url: `${storybook}/index.json` },
  ],
});
