/// <reference types="vitest/config" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: '/crypto-coin/',
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
    typecheck: {
      enabled: true,
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
