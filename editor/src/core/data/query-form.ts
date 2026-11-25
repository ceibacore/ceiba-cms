import type { DataSourceSchema } from '../transport/data-source-types';

/**
 * Props of a `query` block (plan 07-B, QueryNodeConfig.php) as inspector fields, and back. Pure so it can be tested
 * without a browser; the server validates again (QueryValidator) and the preview shows its refusals.
 */
export interface QueryFilterRow { field: string; op: string; value: string }
export interface QuerySortRow { field: string; direction: 'asc' | 'desc' }
export interface QueryUrlParamRow { param: string; target: 'search' | 'filter'; field: string; op: string }

export interface QueryForm {
  id: string;
  source: string;
  pageSize: string;
  pagination: boolean;
  pageParam: string;
  filters: QueryFilterRow[];
  sort: QuerySortRow[];
  urlParams: QueryUrlParamRow[];
}

export type QueryFormError = 'query.id' | 'query.source' | 'query.pageSize' | 'query.field' | 'query.operator' | 'query.param';

const record = (v: unknown): Record<string, unknown> => (typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {});
const list = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? v.map(record) : []);
const s = (v: unknown): string => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : Array.isArray(v) ? v.join(',') : '');
const ID = /^[a-z][a-z0-9_]{0,40}$/;
const PARAM = /^[a-z][a-z0-9_]{0,30}$/;

export const queryToForm = (props: unknown): QueryForm => {
  const p = record(props);
  return {
    id: s(p.id) || 'items',
    source: s(p.source),
    pageSize: p.page_size === undefined ? '12' : s(p.page_size),
    pagination: p.pagination === true,
    pageParam: s(p.page_param) || 'page',
    filters: list(p.filters).map((f) => ({ field: s(f.field), op: s(f.op) || 'eq', value: s(f.value) })),
    sort: list(p.sort).map((x) => ({ field: s(x.field), direction: x.direction === 'desc' ? 'desc' : 'asc' })),
    urlParams: list(p.url_params).map((u) => ({ param: s(u.param), target: u.target === 'filter' ? 'filter' : 'search', field: s(u.field), op: s(u.op) || 'eq' })),
  };
};

/** The props to store, or the first problem. With a schema, fields and operators are checked against it too. */
export const formToQuery = (form: QueryForm, schema: DataSourceSchema | null): { props: Record<string, unknown> } | { error: QueryFormError; index?: number } => {
  if (!ID.test(form.id.trim())) return { error: 'query.id' };
  if (!/^(module|host):[a-z0-9][a-z0-9_.-]{0,80}$/.test(form.source.trim())) return { error: 'query.source' };
  const size = Number(form.pageSize);
  const max = schema?.max_page_size ?? 50;
  if (!Number.isInteger(size) || size < 1 || size > max) return { error: 'query.pageSize' };
  const field = (name: string) => schema?.fields.find((f) => f.name === name);
  for (const [i, f] of form.filters.entries()) {
    if (schema && !field(f.field)) return { error: 'query.field', index: i };
    if (schema && !field(f.field)!.operators.includes(f.op)) return { error: 'query.operator', index: i };
  }
  for (const [i, x] of form.sort.entries()) {
    if (schema && !field(x.field)?.sortable) return { error: 'query.field', index: i };
  }
  const seen = new Set<string>();
  for (const [i, u] of form.urlParams.entries()) {
    if (!PARAM.test(u.param) || u.param === form.pageParam || seen.has(u.param)) return { error: 'query.param', index: i };
    seen.add(u.param);
    if (u.target === 'filter' && schema && !field(u.field)?.operators.includes(u.op)) return { error: 'query.operator', index: i };
  }
  if (!PARAM.test(form.pageParam)) return { error: 'query.param' };
  const value = (f: QueryFilterRow): unknown => (['is_null', 'not_null'].includes(f.op) ? null : f.op === 'in' ? f.value.split(',').map((v) => v.trim()).filter(Boolean) : f.value);
  return { props: {
    id: form.id.trim(), source: form.source.trim(), page_size: size, pagination: form.pagination, page_param: form.pageParam,
    filters: form.filters.map((f) => ({ field: f.field, op: f.op, value: value(f) })),
    sort: form.sort.slice(0, 3).map((x) => ({ field: x.field, direction: x.direction })),
    url_params: form.urlParams.map((u) => (u.target === 'search' ? { param: u.param, target: 'search' } : { param: u.param, target: 'filter', field: u.field, op: u.op })),
  } };
};
