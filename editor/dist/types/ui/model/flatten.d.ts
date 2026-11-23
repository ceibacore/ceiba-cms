import type { TreeState } from '../../core';
export interface FlatItem {
    readonly id: string;
    readonly depth: number;
    readonly parent: string | null;
    readonly index: number;
    readonly siblings: number;
}
/** Visible order of the structure navigator (depth first, everything expanded). */
export declare const flatten: (tree: TreeState) => FlatItem[];
