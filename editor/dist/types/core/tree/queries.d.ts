import type { NodeRecord, TreeState } from './state';
export declare const getNode: (state: TreeState, id: string) => NodeRecord;
/** Ids of a node and all its descendants, depth first. */
export declare const subtreeIds: (state: TreeState, id: string) => string[];
/** True when candidate is ancestor or the node itself. */
export declare const isSelfOrDescendant: (state: TreeState, ancestor: string, candidate: string | null) => boolean;
/** Depth of a node: root nodes are at depth 1. */
export declare const depthOf: (state: TreeState, id: string | null) => number;
/** Height of a subtree: a leaf is 1. */
export declare const heightOf: (state: TreeState, id: string) => number;
export declare const indexInParent: (state: TreeState, id: string) => number;
export declare const nodeCount: (state: TreeState) => number;
