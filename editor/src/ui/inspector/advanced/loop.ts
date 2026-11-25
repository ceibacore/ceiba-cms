/**
 * Loop of a node (ceiba-cms LoopConfig: source "module:<slug>" or "host:<name>" from the data source registry,
 * variable, key, limit, offset, filters, sort) as the fields of the inspector, and back. Free URLs are not sources
 * (plan 07, D-3). Kept pure so it can be tested without a browser.
 */
export interface LoopForm {
  sourceType: 'none' | 'module' | 'host';
  module: string;
  host: string;
  variable: string;
  key: string;
  limit: string;
  offset: string;
  sortColumn: string;
  sortDirection: 'ASC' | 'DESC';
  /** One "key=value" per line. */
  filters: string;
}

const record = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

export const loopToForm = (loop: unknown): LoopForm => {
  const l = record(loop);
  const source = typeof l.source === 'string' ? l.source : '';
  const sort = record(l.sort);
  return {
    sourceType: source.startsWith('module:') ? 'module' : source.startsWith('host:') ? 'host' : 'none',
    module: source.startsWith('module:') ? source.slice(7) : '',
    host: source.startsWith('host:') ? source.slice(5) : '',
    variable: typeof l.variable === 'string' ? l.variable : 'item',
    key: typeof l.key === 'string' ? l.key : 'id',
    limit: l.limit === undefined || l.limit === null ? '' : String(l.limit),
    offset: l.offset === undefined || l.offset === null ? '' : String(l.offset),
    sortColumn: typeof sort.column === 'string' ? sort.column : '',
    sortDirection: sort.direction === 'ASC' ? 'ASC' : 'DESC',
    filters: Object.entries(record(l.filters)).map(([k, v]) => `${k}=${String(v)}`).join('\n'),
  };
};

export type LoopResult = { loop: Record<string, unknown> | null } | { error: 'loop.source' | 'loop.number' | 'loop.variable' };

const count = (value: string): number | null | undefined => {
  if (value.trim() === '') return undefined;
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : null;
};

/** The loop to store, null to remove it, or the error key of the first invalid field. */
export const formToLoop = (form: LoopForm): LoopResult => {
  if (form.sourceType === 'none') return { loop: null };
  const target = (form.sourceType === 'module' ? form.module : form.host).trim();
  if (!/^[a-z0-9][a-z0-9_.-]{0,80}$/.test(target)) return { error: 'loop.source' };
  if (!/^[A-Za-z_][A-Za-z0-9_]{0,40}$/.test(form.variable.trim())) return { error: 'loop.variable' };
  const loop: Record<string, unknown> = {
    source: `${form.sourceType}:${target}`,
    variable: form.variable.trim(),
    key: form.key.trim() || 'id',
  };
  for (const [name, raw] of [['limit', form.limit], ['offset', form.offset]] as const) {
    const n = count(raw);
    if (n === null) return { error: 'loop.number' };
    if (n !== undefined) loop[name] = n;
  }
  const filters: Record<string, string> = {};
  for (const line of form.filters.split('\n')) {
    const at = line.indexOf('=');
    if (at > 0) filters[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  if (Object.keys(filters).length > 0) loop.filters = filters;
  if (form.sortColumn.trim() !== '') loop.sort = { column: form.sortColumn.trim(), direction: form.sortDirection };
  return { loop };
};
