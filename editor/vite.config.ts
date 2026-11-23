import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

// Two entries: the framework-free core (03-A) and the <ceiba-page-builder> Web Component (03-B).
// Svelte is bundled into the element, so hosts need no Svelte, no Node and no build step.
export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: 'injected' } })],
  build: {
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: { core: 'src/core/index.ts', 'ceiba-page-builder': 'src/ui/index.ts' },
      formats: ['es'],
      fileName: (_format, name) => `${name}.js`,
    },
    // Stable names: hosts serve dist/ as is, and the CI compares it with a fresh build.
    rollupOptions: { output: { chunkFileNames: 'shared/[name].js' } },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    testTimeout: 20000,
  },
});
