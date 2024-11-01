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
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
  base: '/crypto-coin/',
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
