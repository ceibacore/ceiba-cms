import type { TreeState } from '../tree/state';
import type { Limits } from './limits';
export interface TreeIssue {
    readonly code: 'ORPHAN' | 'PARENT_MISMATCH' | 'CYCLE' | 'DUPLICATE_ID' | 'MAX_NODES' | 'MAX_DEPTH';
    readonly id: string;
}
/**
 * Full integrity check of a tree: every node reachable once from the root, parent pointers consistent, no cycles,
 * within limits. Commands keep these invariants; this check guards loading and the tests.
 */
export declare const checkTree: (state: TreeState, limits: Limits) => TreeIssue[];
