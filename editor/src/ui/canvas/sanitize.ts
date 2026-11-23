/**
 * Safe values for the canvas (plan 03: "bloquear HTML activo y protocolos peligrosos incluso en preview").
 * Text always goes through textContent; only these attributes are set, and only after these checks.
 */
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/** A URL the canvas may use, or '' when it is unsafe (javascript:, data:, vbscript:, …). */
export const safeUrl = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  // Browsers ignore control characters and whitespace when reading a scheme ("java\tscript:").
  const compact = value.replace(/[\u0000- \u007f-\u009f]/g, '');
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(compact)?.[1];
  if (scheme === undefined) return value.trim();
  return SAFE_SCHEMES.has(`${scheme.toLowerCase()}:`) ? value.trim() : '';
};

/** Class names: letters, digits, dash, underscore, colon (responsive prefixes) and spaces. */
export const safeClass = (value: unknown): string =>
  typeof value === 'string' ? value.replace(/[^\w\- :]/g, '').trim() : '';

/** Stylesheets the host gives for the canvas (the page's framework CSS): http(s) or same-origin paths only. */
export const safeStylesheet = (value: string): string => {
  const url = safeUrl(value);
  return url !== '' && !/^(mailto|tel):/i.test(url) ? url : '';
};

export const text = (value: unknown): string =>
  typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '';
