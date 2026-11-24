import { describe, expect, it } from 'vitest';
import { createCatalogue } from '../../src/core';
import { safeClass, safeStylesheet, safeUrl } from '../../src/ui/canvas/sanitize';
import { fieldsFor, parseField } from '../../src/ui/inspector/fields';
import { COMPONENTS, HTML_TAGS } from '../../demo/catalogue';

describe('canvas sanitizing', () => {
  it('keeps web, mail and phone links and site paths; drops active schemes, even disguised', () => {
    for (const ok of ['https://a.test/x', 'http://a.test', 'mailto:a@b.c', 'tel:+57', '/path', './rel', '#top', 'page?x=1']) {
      expect(safeUrl(ok)).toBe(ok);
    }
    for (const bad of ['javascript:alert(1)', ' JavaScript:x', 'java\tscript:x', 'java\nscript:x', '\u0000javascript:x',
      'data:text/html,<b>', 'vbscript:x', 'file:///etc/passwd', 42, null]) {
      expect(safeUrl(bad)).toBe('');
    }
    expect(safeClass('btn btn-lg" onclick="x')).toBe('btn btn-lg onclickx');
    expect(safeStylesheet('mailto:a@b.c')).toBe('');
    expect(safeStylesheet('/css/bootstrap.min.css')).toBe('/css/bootstrap.min.css');
  });
});

describe('inspector fields', () => {
  const catalogue = createCatalogue(COMPONENTS, HTML_TAGS);
  const keys = (type: string) => fieldsFor(catalogue.get(type)!).map((f) => `${f.key}:${f.control}`);

  it('come from editorControls, then propsSchema, then HTML defaults', () => {
    expect(keys('heading')).toEqual(['text:text', 'level:select']);
    expect(keys('image')).toEqual(['src:media', 'alt:text']);
    expect(keys('container')).toEqual(['fluid:checkbox']);
    expect(keys('a')).toEqual(['content:textarea', 'href:url', 'class:text']);
    expect(keys('div')).toEqual(['class:text']);
  });

  it('parse values and refuse invalid ones before they reach the document', () => {
    const [url] = fieldsFor(catalogue.get('button')!).filter((f) => f.key === 'url');
    const [level] = fieldsFor(catalogue.get('heading')!).filter((f) => f.key === 'level');
    const [xs] = fieldsFor(catalogue.get('col')!).filter((f) => f.key === 'xs');
    expect(parseField(url!, 'javascript:alert(1)')).toEqual({ error: 'field.url' });
    expect(parseField(url!, '/contact')).toEqual({ value: '/contact' });
    expect(parseField(level!, '3')).toEqual({ value: 3 });
    expect(parseField(level!, '9')).toEqual({ error: 'field.option' });
    expect(parseField(xs!, 'abc')).toEqual({ error: 'field.number' });
    expect(parseField(xs!, '')).toEqual({ value: null });
  });
});
