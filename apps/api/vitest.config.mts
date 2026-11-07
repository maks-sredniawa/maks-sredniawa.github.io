import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/api',
  test: {
    name: 'api',
    watch: false,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: { reportsDirectory: '../../coverage/apps/api', provider: 'v8' },
  },
});
