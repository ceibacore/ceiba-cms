import type { TreeState } from '../tree/state';
/**
 * Props that hold the id of another node of the page (anchors, tabs, accordions, form labels).
 * After a duplicate they must point inside the copy when they pointed inside the original.
 */
export declare const REFERENCE_PROPS: readonly string[];
export declare const rewriteReferences: (state: TreeState, root: string, renamed: ReadonlyMap<string, string>) => TreeState;
