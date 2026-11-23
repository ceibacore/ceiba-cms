import { defineConfig } from 'vitest/config';

// Library build of the editor core (plan 03-A). The UI (Web Component) is added in 03-B.
export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: 'src/core/index.ts',
      formats: ['es'],
      fileName: () => 'core.js',
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    testTimeout: 20000,
  },
});
