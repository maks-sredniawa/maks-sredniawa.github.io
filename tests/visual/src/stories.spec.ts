import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { urls } from '../playwright.config';

interface StoryIndex {
  entries: Record<string, { id: string; type: 'story' | 'docs' }>;
}

const index = JSON.parse(
  readFileSync(new URL('../../../dist/storybook/ui/index.json', import.meta.url), 'utf8'),
) as StoryIndex;
// app-page.spec.ts shoots the App page stories at every width.
const stories = Object.values(index.entries).filter(
  (entry) => entry.type === 'story' && !entry.id.startsWith('app-page--'),
);

test.describe('stories', () => {
  for (const { id } of stories) {
    test(id, async ({ page }) => {
      await page.goto(`${urls.storybook}/iframe.html?id=${id}&viewMode=story`);

      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${id}.png`);
    });
  }
});
