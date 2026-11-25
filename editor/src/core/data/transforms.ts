import type { TransformName } from './bindings';

/** Twin of ValueTransforms.php for the canvas (display only; the server decides what the page shows). */
const pad = (n: number): string => String(n).padStart(2, '0');

const date = (value: string, format: string): string => {
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value.replace(' ', 'T'));
  if (Number.isNaN(d.getTime())) return value;
  const map: Record<string, string> = { d: pad(d.getDate()), j: String(d.getDate()), m: pad(d.getMonth() + 1), n: String(d.getMonth() + 1),
    Y: String(d.getFullYear()), y: String(d.getFullYear()).slice(-2), H: pad(d.getHours()), G: String(d.getHours()), i: pad(d.getMinutes()), s: pad(d.getSeconds()) };
  return format.replace(/[a-zA-Z]/g, (c) => map[c] ?? '');
};

const number = (value: unknown, decimals: number, locale: string): string => {
  const [int, frac] = (Number(value) || 0).toFixed(decimals).split('.');
  const en = locale.startsWith('en');
  const grouped = int!.replace(/\B(?=(\d{3})+(?!\d))/g, en ? ',' : '.');
  return frac === undefined ? grouped : `${grouped}${en ? '.' : ','}${frac}`;
};

export const stripTags = (value: unknown): string => {
  const raw = String(value ?? '').replace(/<[^>]*>/g, '');
  const el = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (el) el.innerHTML = raw;
  return (el ? el.value : raw).replace(/\s+/g, ' ').trim();
};

export const applyTransform = (name: TransformName, value: unknown, args: Readonly<Record<string, unknown>>, locale: string): unknown => {
  if (value === null || value === undefined || value === '') return value;
  const clamp = (v: unknown, def: number, min: number, max: number) => {
    const n = Math.trunc(Number(v ?? def));
    return Math.max(min, Math.min(max, Number.isNaN(n) ? def : n));
  };
  switch (name) {
    case 'date': return date(String(value), String(args.format ?? 'd/m/Y'));
    case 'number': return number(value, clamp(args.decimals, 0, 0, 6), locale);
    case 'currency': return `${number(value, clamp(args.decimals, 2, 0, 4), locale)} ${String(args.code ?? '').toUpperCase().replace(/[^A-Z]/g, '')}`.trim();
    case 'upper': return String(value).toUpperCase();
    case 'lower': return String(value).toLowerCase();
    case 'truncate': {
      const text = stripTags(value);
      const n = clamp(args.length, 120, 1, 1000);
      return text.length <= n ? text : `${text.slice(0, n).trimEnd()}…`;
    }
    case 'strip': return stripTags(value);
  }
};
