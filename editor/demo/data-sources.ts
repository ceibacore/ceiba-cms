import { EditorError } from '../src/core';
import type { DataPreview, DataSourceSchema } from '../src/core';

const field = (name: string, type: string, operators: string[], extra: Record<string, unknown> = {}) =>
  ({ name, type, label: name, nullable: true, searchable: false, sortable: true, operators, options: [], relation: null, ...extra });

/** In-browser stand-in for the data sources API (plan 07-C): one host source; `secret` never leaves it. */
export class DataSourcesStore {
  down = false;
  previews = 0;
  readonly schema: DataSourceSchema = {
    id: 'host:courses', label: 'Courses', capabilities: ['search', 'pagination', 'single'], max_page_size: 20, slug_field: 'id',
    fields: [field('id', 'id', ['eq']), field('title', 'text', ['eq', 'contains'], { searchable: true }),
      field('level', 'select', ['eq', 'in'], { options: ['basic', 'advanced'] }), field('url', 'url', ['eq']), field('price', 'decimal', ['eq', 'gt'])] as DataSourceSchema['fields'],
  };
  readonly rows = [
    { id: '1', title: 'PHP from scratch', level: 'basic', url: 'javascript:alert(1)', price: 1500, secret: 'x' },
    { id: '2', title: 'UX research', level: 'advanced', url: '/courses/ux', price: 2500, secret: 'x' },
    { id: '3', title: 'Design systems', level: 'advanced', url: '/courses/ds', price: 3500, secret: 'x' },
  ];

  preview(query: Record<string, unknown>): DataPreview {
    this.previews++;
    if (this.down) throw new EditorError('SERVER', 'down', { apiCode: 'DATA_SOURCE_ERROR', status: '502' });
    if (query.source !== this.schema.id) throw new EditorError('VALIDATION_FAILED', 'unknown', { apiCode: 'NOT_FOUND', status: '404' });
    const filters = (Array.isArray(query.filters) ? query.filters : []) as { field: string; op: string; value: unknown }[];
    let rows = this.rows;
    for (const [i, f] of filters.entries()) {
      const known = this.schema.fields.find((x) => x.name === f.field);
      if (!known) throw new EditorError('VALIDATION_FAILED', 'field', { [`filters.${i}.field`]: 'QUERY_FIELD', apiCode: 'VALIDATION_FAILED', status: '422' });
      rows = rows.filter((r) => String((r as Record<string, unknown>)[f.field]) === String(f.value));
    }
    const size = Number(query.page_size ?? 12);
    const items = rows.slice(0, size).map(({ secret: _, ...rest }) => rest);
    return { state: items.length === 0 ? 'empty' : 'results', items,
      pagination: { page: 1, page_size: size, total: rows.length, pages: Math.max(1, Math.ceil(rows.length / size)), has_more: rows.length > size } };
  }
}
