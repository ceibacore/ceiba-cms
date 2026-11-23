import type { RawNode } from '../document/types';
import type { TreeState } from '../tree/state';
import type { IdMode } from '../tree/subtree';
import type { CommandContext } from './types';
/** Shared by insert, restore, duplicate and replace: checks limits and placement, then attaches the subtree. */
export declare const attachChecked: (state: TreeState, raw: RawNode, parent: string | null, index: number, context: CommandContext, mode: IdMode, removedCount?: number) => {
    state: TreeState;
    id: string;
    renamed: Map<string, string>;
};
