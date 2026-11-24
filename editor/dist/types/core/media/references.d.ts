import type { AssetRef } from '../transport/media-types';
import type { TreeState } from '../tree';
import type { DesignDocument } from '../styles/types';
/** {"asset": "<id>"} with an optional per-use alt and nothing else (same rule as MediaReferences.php). */
export declare const isAssetRef: (value: unknown) => value is AssetRef;
/** Asset ids used by the tree (props and styles of every node) and by the design's classes. */
export declare const collectAssetIds: (tree: TreeState, design?: DesignDocument) => string[];
