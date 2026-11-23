// Owner rule: no source file over 200 lines. Split it into a folder with an index (factory) or a master class.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX = 200;
const root = fileURLToPath(new URL('..', import.meta.url));
const skip = new Set(['node_modules', 'dist', 'coverage', 'package-lock.json']);
const extensions = /\.(ts|js|mjs|svelte|css|php|json|md|yml)$/;

const offenders = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (skip.has(name) || name.startsWith('.')) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (extensions.test(name)) {
      const lines = readFileSync(path, 'utf8').split('\n').length - 1;
      if (lines > MAX) offenders.push(`${relative(root, path)}: ${lines} lines`);
    }
  }
};
walk(root);

if (offenders.length > 0) {
  console.error(`Files over ${MAX} lines (split them into a folder with an index):\n  ${offenders.join('\n  ')}`);
  process.exit(1);
}
console.log(`All files are within ${MAX} lines.`);
