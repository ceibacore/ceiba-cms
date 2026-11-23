import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// Dev server of the demo page (also the Playwright target).
export default defineConfig({
  root: new URL('.', import.meta.url).pathname,
  plugins: [svelte({ compilerOptions: { css: 'injected' }, configFile: '../svelte.config.js' })],
  server: { host: '127.0.0.1' },
});
