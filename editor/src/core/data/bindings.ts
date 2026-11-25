/**
 * Typed bindings of a node (plan 07, D-4; BindingResolver.php): `bindings: {prop: {from?, field, transform?, args?, fallback?}}`.
 */
export const TRANSFORMS = ['date', 'number', 'currency', 'upper', 'lower', 'truncate', 'strip'] as const;
export type TransformName = (typeof TRANSFORMS)[number];

export interface Binding {
  readonly from?: string;
  readonly field: string;
  readonly transform?: TransformName;
  readonly args?: Readonly<Record<string, string | number>>;
  readonly fallback?: string;
}

const record = (v: unknown): Record<string, unknown> => (typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

export const readBindings = (value: unknown): Record<string, Binding> => {
  const out: Record<string, Binding> = {};
  for (const [prop, raw] of Object.entries(record(value))) {
    const b = record(raw);
    if (typeof b.field !== 'string' || b.field === '') continue;
    out[prop] = { field: b.field,
      ...(typeof b.from === 'string' && b.from !== '' ? { from: b.from } : {}),
      ...(TRANSFORMS.includes(b.transform as TransformName) ? { transform: b.transform as TransformName } : {}),
      ...(Object.keys(record(b.args)).length > 0 ? { args: record(b.args) as Record<string, string | number> } : {}),
      ...(typeof b.fallback === 'string' && b.fallback !== '' ? { fallback: b.fallback } : {}) };
  }
  return out;
};

/** The bindings with one prop set (a binding) or removed (null); null when nothing is left. */
export const withBinding = (current: unknown, prop: string, binding: Binding | null): Record<string, Binding> | null => {
  const next = { ...readBindings(current) };
  if (binding === null || binding.field === '') delete next[prop];
  else next[prop] = readBindings({ [prop]: binding })[prop]!;
  return Object.keys(next).length === 0 ? null : next;
};

/** Props of a component a binding may fill: its text-like controls (never classes, ids or structure). */
export const bindableProps = (controls: Readonly<Record<string, unknown>>): string[] =>
  Object.entries(controls).filter(([key, c]) => ['text', 'textarea', 'url', 'string', 'richtext', 'media_picker', 'media'].includes(String(record(c).type))
    && !['class', 'id', 'tag'].includes(key)).map(([key]) => key);
