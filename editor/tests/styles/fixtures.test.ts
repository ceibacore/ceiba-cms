import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { collectStyledNodes, compileStyles, STYLE_MATRIX, styleClassNames } from '../../src/core';

// Plan 04 D-5: the editor compiler gives, byte for byte, what fixtures/styles says (the PHP compiler is held to the
// same files in tests/PageBuilder/Style/StyleFixturesTest.php).
const root = fileURLToPath(new URL('../../../', import.meta.url));
const fixtures = readdirSync(`${root}fixtures/styles`).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`${root}fixtures/styles/${f}`, 'utf8')));

describe('style compiler fixtures', () => {
  it.each(fixtures.map((f) => [f.name, f]))('%s', (_name, fixture) => {
    const compiled = compileStyles(fixture.design, fixture.nodes);
    expect(compiled.css).toBe(fixture.css);
    expect(compiled.diagnostics).toEqual(fixture.diagnostics);
    expect(compileStyles(fixture.design, fixture.nodes)).toEqual(compiled);
  });

  it('the property matrix mirrors schemas/style-properties-v1.json', () => {
    const source = JSON.parse(readFileSync(`${root}schemas/style-properties-v1.json`, 'utf8'));
    expect(JSON.parse(JSON.stringify(STYLE_MATRIX))).toEqual(source);
  });
});

describe('styled nodes', () => {
  it('are collected in document order and get their classes', () => {
    const nodes = collectStyledNodes([
      { id: 'a', type: 'div', styles: { classes: ['hero', 'gone'], base: { color: '#fff' } }, children: [
        { _id: 'b', type: 'p', styles: { classes: ['hero'] }, children: [] },
        { id: 'c', type: 'p', children: [] },
      ] },
    ]);
    expect(nodes.map((n) => n.id)).toEqual(['a', 'b']);
    const design = { breakpoints: [], tokens: {}, classes: { hero: { styles: {} } } };
    expect(styleClassNames('a', nodes[0]!.styles, design)).toEqual(['cms-c-hero', 'cms-n-a']);
    expect(styleClassNames('b', nodes[1]!.styles, design)).toEqual(['cms-c-hero']);
  });
});
