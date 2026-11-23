import { STYLE_MATRIX } from './matrix';
import type { DesignToken, StyleDiagnostic } from './types';
import { color, lengthPart, normalize } from './values';

const TOKEN_ID = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/;
const FAMILY = /^[A-Za-z0-9 -]{1,60}$/;
const DURATION = /^\d{1,5}(?:ms|s)$/;

export interface ResolvedToken {
  readonly type: string;
  /** var(--cms-t-…) reference used by declarations. */
  readonly ref: string;
}

/** CSS custom property of a token: dots become underscores (ids never contain "_", so names never collide). */
export const tokenVariable = (id: string): string => `--cms-t-${id.replace(/\./g, '_')}`;

/** Splits on a separator outside parentheses (shadows: "0 1px 2px rgba(0,0,0,.2), …"). */
const splitTop = (value: string, separator: string): string[] => {
  const out: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === separator && depth === 0) {
      out.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  out.push(current.trim());
  return out;
};

const shadow = (value: string): string | null => {
  const shadows = splitTop(value, ',');
  if (shadows.length > 3) return null;
  for (const one of shadows) {
    const parts = splitTop(one, ' ').filter((p) => p !== '');
    if (parts[0] === 'inset') parts.shift();
    const last = parts[parts.length - 1] ?? '';
    const lengths = color(last) !== null && lengthPart(last, false, true) === null ? parts.slice(0, -1) : parts;
    if (lengths.length < 2 || lengths.length > 4 || lengths.some((p) => p.endsWith('%') || lengthPart(p, false, true) === null)) {
      return null;
    }
  }
  return value;
};

/** Literal value of a token of a type, normalized; null when invalid. */
export const tokenLiteral = (type: string, raw: string): string | null => {
  if (type === 'fontFamily') {
    const families = raw.split(',').map((f) => f.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, '').replace(/[ \t\n\r\f\v]+/g, ' '));
    if (families.length > 8 || !families.every((f) => FAMILY.test(f))) return null;
    return families.map((f) => (f.includes(' ') ? `"${f}"` : f)).join(', ');
  }
  const value = normalize(raw);
  if (value === null) return null;
  switch (type) {
    case 'color': return color(value);
    case 'length': return lengthPart(value);
    case 'fontWeight': return STYLE_MATRIX.keywords.fontWeight?.includes(value) ? value : null;
    case 'shadow': return shadow(value);
    case 'duration': return DURATION.test(value) ? value : null;
    default: return null;
  }
};

/**
 * Validates the tokens of a design: ids, types, literal values, aliases ({token}), type agreement and cycles.
 * Returns the usable tokens and the :root rule declaring them (sorted by id).
 */
export const resolveTokens = (
  tokens: Readonly<Record<string, DesignToken>>,
  diagnostics: StyleDiagnostic[],
): { table: Map<string, ResolvedToken>; root: string } => {
  const table = new Map<string, ResolvedToken>();
  const ids = Object.keys(tokens).sort();
  if (ids.length > STYLE_MATRIX.limits.tokens) {
    diagnostics.push({ path: 'design.tokens', code: 'LIMIT' });
    return { table, root: '' };
  }
  const declarations: string[] = [];
  const resolve = (id: string, seen: string[]): { type: string; css: string } | 'cycle' | 'type' | null => {
    const token = tokens[id] as DesignToken | undefined;
    if (typeof token !== 'object' || token === null || !TOKEN_ID.test(id) || id.length > 64
        || typeof token.type !== 'string' || !STYLE_MATRIX.tokenTypes.includes(token.type)) return null;
    if (typeof token.value === 'string') {
      const css = tokenLiteral(token.type, token.value);
      return css === null ? null : { type: token.type, css };
    }
    const target = typeof token.value === 'object' && token.value !== null ? token.value.token : undefined;
    if (typeof target !== 'string') return null;
    if (seen.includes(target)) return 'cycle';
    const resolved = resolve(target, [...seen, target]);
    if (resolved === null || resolved === 'cycle' || resolved === 'type') return resolved;
    return resolved.type === token.type ? { type: token.type, css: `var(${tokenVariable(target)})` } : 'type';
  };
  for (const id of ids) {
    if (!TOKEN_ID.test(id) || id.length > 64) {
      diagnostics.push({ path: `design.tokens.${id}`, code: 'INVALID_ID' });
      continue;
    }
    const resolved = resolve(id, [id]);
    if (resolved === 'cycle' || resolved === 'type') {
      diagnostics.push({ path: `design.tokens.${id}`, code: resolved === 'cycle' ? 'TOKEN_CYCLE' : 'TOKEN_TYPE' });
    } else if (resolved === null) {
      diagnostics.push({ path: `design.tokens.${id}`, code: 'INVALID_VALUE' });
    } else {
      table.set(id, { type: resolved.type, ref: `var(${tokenVariable(id)})` });
      declarations.push(`${tokenVariable(id)}:${resolved.css}`);
    }
  }
  return { table, root: declarations.length > 0 ? `:root{${declarations.join(';')}}` : '' };
};
