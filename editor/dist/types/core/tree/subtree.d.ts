import type { RawNode } from '../document/types';
import type { IdFactory } from './ids';
import type { TreeState } from './state';
/** How ids of incoming raw nodes are treated. */
export type IdMode = 
/** Keep the ids of the raw nodes (undo of a removal, loading a document). Missing ids are generated. */
'keep'
/** Give every node a fresh id (insert, duplicate, paste). */
 | 'fresh';
/**
 * Adds a raw subtree under a parent (the caller places the returned root id in the parent's children list).
 * Returns the new state, the root id and a map old id → new id for reference rewriting.
 */
export declare const attachRaw: (state: TreeState, raw: RawNode, parent: string | null, ids: IdFactory, mode: IdMode, renamed?: Map<string, string>) => {
    state: TreeState;
    id: string;
    renamed: Map<string, string>;
};
/** Raw subtree of a node, with its current ids (for undo and serialization). */
export declare const toRaw: (state: TreeState, id: string) => RawNode;
/** Number of nodes and height of a raw subtree, to check limits before attaching it. */
export declare const measureRaw: (raw: RawNode) => {
    count: number;
    height: number;
};
