import type { AssetRef } from '../transport/media-types';
import type { TreeState } from '../tree';
import type { DesignDocument } from '../styles/types';

const ASSET_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** {"asset": "<id>"} with an optional per-use alt and nothing else (same rule as MediaReferences.php). */
export const isAssetRef = (value: unknown): value is AssetRef => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  const ref = value as { asset?: unknown; alt?: unknown };
  return typeof ref.asset === 'string' && ASSET_ID.test(ref.asset) && keys.every((k) => k === 'asset' || k === 'alt')
    && (ref.alt === undefined || typeof ref.alt === 'string');
};

const scan = (value: unknown, out: Set<string>, depth: number): void => {
  if (depth > 12 || typeof value !== 'object' || value === null) return;
  if (isAssetRef(value)) {
    out.add(value.asset);
    return;
  }
  for (const item of Object.values(value)) scan(item, out, depth + 1);
};

/** Asset ids used by the tree (props and styles of every node) and by the design's classes. */
export const collectAssetIds = (tree: TreeState, design?: DesignDocument): string[] => {
  const out = new Set<string>();
  for (const node of Object.values(tree.nodes)) {
    scan(node.fields.props, out, 0);
    scan(node.fields.styles, out, 0);
  }
  if (design) scan(design.classes, out, 0);
  return [...out];
};
