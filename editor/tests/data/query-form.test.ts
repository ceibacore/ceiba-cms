import { describe, expect, it } from 'vitest';
import type { DataSourceSchema } from '../../src/core';
import { bindableProps, formToQuery, queryToForm, readBindings, withBinding } from '../../src/core';

const schema: DataSourceSchema = { id: 'module:courses', label: 'Cursos', capabilities: ['search', 'pagination'], max_page_size: 20, slug_field: 'slug',
  fields: [
    { name: 'title', type: 'text', label: 'T', nullable: true, searchable: true, sortable: true, operators: ['eq', 'contains'], options: [], relation: null },
    { name: 'level', type: 'select', label: 'L', nullable: true, searchable: false, sortable: true, operators: ['eq', 'in'], options: ['a', 'b'], relation: null },
    { name: 'body', type: 'richtext', label: 'B', nullable: true, searchable: false, sortable: false, operators: ['is_null'], options: [], relation: null },
  ] };

describe('query block form (plan 07-C)', () => {
  it('round-trips the props the server reads', () => {
    const props = { id: 'courses', source: 'module:courses', page_size: 6, pagination: true, page_param: 'p',
      filters: [{ field: 'level', op: 'in', value: ['a', 'b'] }], sort: [{ field: 'title', direction: 'desc' }],
      url_params: [{ param: 'q', target: 'search' }, { param: 'nivel', target: 'filter', field: 'level', op: 'eq' }] };
    expect(formToQuery(queryToForm(props), schema)).toEqual({ props });
  });

  it('refuses what the server would refuse', () => {
    const base = queryToForm({ id: 'courses', source: 'module:courses' });
    expect(formToQuery({ ...base, id: 'Bad id' }, schema)).toEqual({ error: 'query.id' });
    expect(formToQuery({ ...base, source: 'https://x.test' }, schema)).toEqual({ error: 'query.source' });
    expect(formToQuery({ ...base, pageSize: '21' }, schema)).toEqual({ error: 'query.pageSize' });
    expect(formToQuery({ ...base, filters: [{ field: 'secret', op: 'eq', value: '' }] }, schema)).toEqual({ error: 'query.field', index: 0 });
    expect(formToQuery({ ...base, filters: [{ field: 'title', op: 'gt', value: '1' }] }, schema)).toEqual({ error: 'query.operator', index: 0 });
    expect(formToQuery({ ...base, sort: [{ field: 'body', direction: 'asc' }] }, schema)).toEqual({ error: 'query.field', index: 0 });
    expect(formToQuery({ ...base, urlParams: [{ param: 'page', target: 'search', field: '', op: '' }] }, schema)).toEqual({ error: 'query.param', index: 0 });
    expect(formToQuery({ ...base, filters: [{ field: 'body', op: 'is_null', value: 'x' }] }, schema))
      .toMatchObject({ props: { filters: [{ field: 'body', op: 'is_null', value: null }] } });
  });
});

describe('bindings', () => {
  it('keep only well-formed bindings and remove the last one to null', () => {
    expect(readBindings({ text: { field: 'title', transform: 'nope' }, x: { from: 'c' } })).toEqual({ text: { field: 'title' } });
    const one = withBinding(null, 'text', { field: 'title', transform: 'upper', fallback: '—' });
    expect(one).toEqual({ text: { field: 'title', transform: 'upper', fallback: '—' } });
    expect(withBinding(one, 'text', null)).toBeNull();
    expect(bindableProps({ text: { type: 'text' }, level: { type: 'select' }, class: { type: 'text' }, href: { type: 'url' } })).toEqual(['text', 'href']);
  });
});
