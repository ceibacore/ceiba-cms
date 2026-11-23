import type { PropertySpec } from './matrix';
import { STYLE_MATRIX } from './matrix';

/**
 * Value grammar of plan 04 (mirrored by src/PageBuilder/Domain/Style/StyleValues.php). Every function returns the
 * normalized CSS text or null when the value is not allowed. Nothing outside this grammar reaches the stylesheet.
 */
const LIMITS = STYLE_MATRIX.limits;
const FORBIDDEN = /[;{}\\<>"'`]|\/\*|url\(|expression|@import|!/i;
const LENGTH = /^(-?)(\d+(?:\.\d+)?|\.\d+)(px|rem|em|%|vw|vh)$/;
const FRACTION = /^(\d+(?:\.\d+)?|\.\d+)fr$/;
const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const FUNCTION_COLOR = /^(?:rgb|rgba|hsl|hsla)\([0-9.%, /]{1,60}\)$/;
const GRID_COLUMN = /^(?:auto|span (?:[1-9]|1[0-2])|(?:[1-9]|1[0-3]) \/ (?:[1-9]|1[0-3]|-1))$/;
const REPEAT = /^repeat\(([1-9]|1[0-2]), ?(.+)\)$/;

/** Trims and collapses whitespace; null when the text is too long or carries anything that could escape CSS. */
export const normalize = (raw: string): string | null => {
  // Explicit ASCII whitespace: JS \s and trim() also match Unicode spaces, PHP does not.
  const value = raw.replace(/^[ \t\n\r\f\v]+|[ \t\n\r\f\v]+$/g, '').replace(/[ \t\n\r\f\v]+/g, ' ');
  return value === '' || value.length > LIMITS.valueLength || FORBIDDEN.test(value) ? null : value;
};

/** Numbers as both compilers print them: integers as is, others with up to 4 decimals. */
export const formatNumber = (n: number): string =>
  Number.isInteger(n) ? String(n) : n.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');

export const lengthPart = (part: string, auto = false, negative = false): string | null => {
  if (part === '0') return '0';
  if (part === 'auto') return auto ? 'auto' : null;
  const match = LENGTH.exec(part);
  if (!match || (match[1] === '-' && !negative) || Number(match[2]) > LIMITS.magnitude) return null;
  return part;
};

export const length = (value: string, spec: Pick<PropertySpec, 'parts' | 'auto' | 'negative'>): string | null => {
  const parts = value.split(' ');
  if (parts.length > (spec.parts ?? 1)) return null;
  return parts.every((p) => lengthPart(p, spec.auto, spec.negative) !== null) ? value : null;
};

export const color = (value: string): string | null =>
  value === 'transparent' || value === 'currentColor' || HEX.test(value) || FUNCTION_COLOR.test(value) ? value : null;

const track = (part: string): boolean => {
  if (part === 'auto' || part === 'min-content' || part === 'max-content') return true;
  const fr = FRACTION.exec(part);
  if (fr) return Number(fr[1]) <= 100;
  return lengthPart(part) !== null;
};

export const tracks = (value: string): string | null => {
  const repeat = REPEAT.exec(value);
  if (repeat) return track(repeat[2] as string) ? `repeat(${repeat[1]}, ${repeat[2]})` : null;
  const parts = value.split(' ');
  return parts.length <= 12 && parts.every(track) ? value : null;
};

export const inRange = (n: number, spec: Pick<PropertySpec, 'min' | 'max'>): string | null =>
  Number.isFinite(n) && n >= (spec.min ?? 0) && n <= (spec.max ?? LIMITS.magnitude) ? formatNumber(n) : null;

/** A literal value of a property (token references are handled by the caller). */
export const literal = (spec: PropertySpec, raw: string | number): string | null => {
  if (typeof raw === 'number') {
    if (spec.kind === 'number' || spec.kind === 'lineHeight') return inRange(raw, spec);
    if (spec.kind === 'keyword' && spec.name === 'fontWeight') return literal(spec, String(raw));
    return null;
  }
  const value = normalize(raw);
  if (value === null) return null;
  switch (spec.kind) {
    case 'keyword': return STYLE_MATRIX.keywords[spec.name]?.includes(value) ? value : null;
    case 'length': return length(value, spec);
    case 'color': return color(value);
    case 'tracks': return tracks(value);
    case 'gridColumn': return GRID_COLUMN.test(value) ? value : null;
    case 'lineHeight': return length(value, {});
    default: return null;
  }
};

/** Token type a property accepts in a {token} reference, or null. */
export const acceptedTokenType = (spec: PropertySpec): string | null =>
  spec.kind === 'color' ? 'color' : spec.kind === 'length' ? 'length' : spec.tokenType ?? null;
