import type { ResolvedMedia } from '../../../core';
import { isAssetRef } from '../../../core';
import { phpTrim } from './values';

export type MediaMap = Readonly<Record<string, ResolvedMedia>>;

const IMAGE_SLOTS = new Set(['src', 'image']);
const empty = (value: unknown): boolean => value === undefined || value === null || value === '' || value === 0 || value === false || value === '0';

/**
 * Twin of MediaPropsDecorator.php: {asset} props become the URL ('' when unknown) and image slots ("src",
 * "image") get srcset, width, height and alt next to them. Alt: of this use ("" = decorative), node, library.
 */
export const resolveProps = (props: Record<string, unknown>, media: MediaMap, depth = 0): Record<string, unknown> => {
  let out: Record<string, unknown> = { ...props };
  for (const [key, value] of Object.entries(props)) {
    if (typeof value !== 'object' || value === null) continue;
    if (!isAssetRef(value)) {
      if (depth < 8) out[key] = Array.isArray(value)
        ? value.map((v) => (typeof v === 'object' && v !== null && !Array.isArray(v) ? resolveProps(v as Record<string, unknown>, media, depth + 1) : v))
        : resolveProps(value as Record<string, unknown>, media, depth + 1);
      continue;
    }
    const found = media[value.asset];
    out[key] = found?.url ?? '';
    if (found && IMAGE_SLOTS.has(key)) out = imageAttributes(out, found, value.alt);
  }
  return out;
};

const imageAttributes = (props: Record<string, unknown>, media: ResolvedMedia, useAlt: string | undefined): Record<string, unknown> => {
  const nodeAlt = typeof props.alt === 'string' ? phpTrim(props.alt) : '';
  const out: Record<string, unknown> = { ...props, alt: useAlt !== undefined ? phpTrim(useAlt) : nodeAlt !== '' ? nodeAlt : media.alt };
  if ((props.srcset === undefined || props.srcset === null) && media.srcset !== '') out.srcset = media.srcset;
  if (empty(props.width) && empty(props.height) && media.width !== null && media.height !== null) {
    out.width = media.width;
    out.height = media.height;
  }
  return out;
};
