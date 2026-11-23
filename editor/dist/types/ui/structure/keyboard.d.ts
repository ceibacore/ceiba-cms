import type { Command, TreeState } from '../../core';
export interface KeyInput {
    readonly key: string;
    readonly altKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
}
export type KeyAction = {
    readonly type: 'select';
    readonly id: string;
} | {
    readonly type: 'command';
    readonly command: Command;
} | {
    readonly type: 'undo';
} | {
    readonly type: 'redo';
};
/** Undo/redo shortcuts, shared by the whole editor (ignored while typing in a field). */
export declare const historyAction: (e: KeyInput) => KeyAction | null;
/**
 * Keyboard of the structure navigator (WAI-ARIA tree): arrows navigate, Alt+arrows move and (un)indent,
 * Delete removes, Ctrl/Cmd+D duplicates. Returns null for keys it does not handle.
 */
export declare const treeAction: (tree: TreeState, selection: string | null, e: KeyInput) => KeyAction | null;
