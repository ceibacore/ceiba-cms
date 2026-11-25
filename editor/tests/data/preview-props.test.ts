import { describe, expect, it } from 'vitest';
import type { DataPreview, RawNode } from '../../src/core';
import { applyTransform, attachRaw, emptyTree, previewProps, sequentialIds, withChildren } from '../../src/core';

const buildTree = (roots: RawNode[]) => {
  let state = emptyTree();
  const ids: string[] = [];
  for (const raw of roots) {
    const r = attachRaw(state, raw, null, sequentialIds(), 'keep');
    state = r.state;
    ids.push(r.id);
  }
  return withChildren(state, null, ids);
};

const preview: DataPreview = { state: 'results', pagination: { page: 1, page_size: 2, total: 5, pages: 3, has_more: true },
  items: [{ title: 'PHP <b>x</b>', url: 'javascript:alert(1)', price: 1500.5, starts: '2026-12-01' }, { title: 'UX' }] };

describe('canvas preview of dynamic content (plan 07-C)', () => {
  it('fill the template with the first item, safely, and give pagination and filters what they draw', () => {
    const tree = buildTree([{ id: 'q', type: 'query', props: { id: 'courses', source: 'host:courses', pagination: true,
      url_params: [{ param: 'nivel', target: 'filter', field: 'level', op: 'eq' }] }, children: [
      { id: 'card', type: 'section', loop: { query: '', variable: 'c' }, props: {}, children: [
        { id: 'h', type: 'heading', props: {}, bindings: { text: { field: 'title' } }, children: [] },
        { id: 'b', type: 'button', props: { label: 'Desde {{ c.price }} #{{ loop.index }} {{ other.x }}' }, bindings: { url: { field: 'url', fallback: '/cursos' } }, children: [] },
        { id: 'd', type: 'text', props: {}, bindings: { content: { field: 'starts', transform: 'date', args: { format: 'd/m/Y' } } }, children: [] },
      ] },
      { id: 'p', type: 'pagination', props: {}, children: [] },
      { id: 'f', type: 'query_filter', props: { param: 'nivel', kind: 'select' }, children: [] },
      { id: 'g', type: 'query_filter', props: { param: 'undeclared' }, children: [] },
    ] }] as unknown as RawNode[]);
    const schema = { id: 'host:courses', label: '', capabilities: [], max_page_size: 20, slug_field: null, fields: [
      { name: 'level', type: 'select', label: '', nullable: true, searchable: false, sortable: true, operators: ['eq'], options: ['basic'], relation: null }] } as const;
    const out = previewProps(tree, { courses: preview }, { 'host:courses': schema });

    expect(out.q).toEqual({ _state: 'results' });
    expect(out.h).toEqual({ text: 'PHP x' });
    expect(out.b).toEqual({ url: '/cursos', label: 'Desde 1500.5 #1 {{ other.x }}' });
    expect(out.d).toEqual({ content: '01/12/2026' });
    expect((out.p!._pages as { links: unknown[]; next: string }).next).toBe('?page=2');
    expect(out.f!._filter).toMatchObject({ name: 'nivel', kind: 'select', options: [{ value: 'basic', label: 'basic' }] });
    expect(out.g).toBeUndefined();
  });

  it('transforms like the server', () => {
    expect(applyTransform('currency', 1234.5, { code: 'cop', decimals: 0 }, 'es')).toBe('1.235 COP');
    expect(applyTransform('number', 1234.5, { decimals: 1 }, 'en')).toBe('1,234.5');
    expect(applyTransform('truncate', '<p>Hola mundo</p>', { length: 4 }, 'es')).toBe('Hola…');
  });
});
