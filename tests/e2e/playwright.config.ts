import { defineConfig, devices } from '@playwright/test';

const port = 4810;
const baseURL = `http://127.0.0.1:${String(port)}`;
const isCi = Boolean(process.env['CI']);

export default defineConfig({
  testDir: 'src',
  outputDir: '../../dist/.playwright/tests/e2e/test-results',
  fullyParallel: true,
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  reporter: isCi
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: '../../dist/.playwright/tests/e2e/report' }],
      ]
    : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `scripts/build.sh && pnpm exec wrangler dev --ip 127.0.0.1 --port ${String(port)}`,
    cwd: '../..',
    url: baseURL,
    timeout: 180_000,
    reuseExistingServer: !isCi,
  },
});
