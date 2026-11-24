import { assetUrl } from '../../../core';
import { safeUrl } from '../sanitize';
import type { VNode } from './vnode';
import { h } from './vnode';

/** Value rules of the Bootstrap5\Html helper (PHP), so the canvas draws what the server draws. */
export const phpTrim = (value: string): string => value.replace(/^[ \t\n\r\0\x0B]+|[ \t\n\r\0\x0B]+$/g, '');

export const str = (value: unknown): string => (typeof value === 'string' ? value : '');

export const text = (value: unknown): string =>
  typeof value === 'string' ? value : typeof value === 'number' ? String(value) : value === true ? '1' : '';

const NUMERIC = /^[ \t\n\r\v\f]*[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[ \t\n\r\v\f]*$/;

export const int = (value: unknown, fallback: number, min: number, max: number): number => {
  const number = typeof value === 'number' && Number.isFinite(value) ? Math.trunc(value)
    : typeof value === 'string' && NUMERIC.test(value) ? Math.trunc(Number(value)) : fallback;
  return Math.max(min, Math.min(max, number));
};

export const oneOf = (value: unknown, allowed: readonly string[]): string => {
  const scalar = typeof value === 'string' || typeof value === 'number' ? String(value) : value === true ? '1' : null;
  return scalar !== null && allowed.includes(scalar) ? scalar : allowed[0]!;
};

/** Text with its line breaks as <br>. */
export const lines = (value: unknown): (VNode | string)[] =>
  str(value).replace(/\r/g, '').split('\n').flatMap((line, i) => (i === 0 ? [line] : [h('br'), line]));

export const cls = (base: string, extra: unknown): string => phpTrim(`${base} ${str(extra)}`);

export const url = (value: unknown): string => safeUrl(value);

/** <img> of a resolved image slot, or null without a usable source (alt always written, "" = decorative). */
export const img = (item: Record<string, unknown>, slot: string, className: string, sizes = '100vw'): VNode | null => {
  const src = url(item[slot]);
  if (src === '') return null;
  const srcset = str(item.srcset);
  const width = int(item.width, 0, 0, Number.MAX_SAFE_INTEGER);
  const height = int(item.height, 0, 0, Number.MAX_SAFE_INTEGER);
  const node = h('img', { src, srcset, sizes: srcset !== '' ? sizes : '', class: className, width: width || null,
    height: height || null, loading: 'lazy', decoding: 'async' });
  return { ...node, attrs: [node.attrs[0]!, ['alt', str(item.alt)], ...node.attrs.slice(1)] };
};

export const backgroundImage = (value: unknown): string => {
  const css = assetUrl(value);
  return css === null ? '' : `background-image:${css}`;
};
