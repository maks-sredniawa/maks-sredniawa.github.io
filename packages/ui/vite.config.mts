import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  resolve: { tsconfigPaths: true },
  plugins: [angular({ tsconfig: `${import.meta.dirname}/tsconfig.spec.json` })],
  test: {
    name: 'ui',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/test-setup.ts'],
    coverage: { reportsDirectory: '../../coverage/packages/ui', provider: 'v8' },
  },
});
