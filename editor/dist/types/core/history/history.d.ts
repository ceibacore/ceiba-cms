import type { Command } from '../commands/types';
/** One undo step: `undo` reverts it, `redo` applies it again keeping the same ids. */
export interface HistoryEntry {
    readonly undo: Command;
    readonly redo: Command;
    readonly group: string | null;
    readonly at: number;
}
export interface HistoryState {
    readonly past: readonly HistoryEntry[];
    readonly future: readonly HistoryEntry[];
}
export interface HistoryOptions {
    /** Steps kept in memory; the oldest are dropped. */
    readonly limit: number;
    /** Bursts of the same edit closer than this merge into one step. */
    readonly groupWindowMs: number;
}
export declare const DEFAULT_HISTORY: HistoryOptions;
export declare const emptyHistory: () => HistoryState;
/** Records an applied command. A new edit clears the redo list (local history, not server revisions). */
export declare const record: (history: HistoryState, forward: Command, inverse: Command, at: number, options?: HistoryOptions) => HistoryState;
export declare const canUndo: (history: HistoryState) => boolean;
export declare const canRedo: (history: HistoryState) => boolean;
/** Moves the last step to the redo list once its undo was applied; `redo` is the inverse that application returned. */
export declare const afterUndo: (history: HistoryState, redo: Command) => HistoryState;
/** Moves the next redo step back to the past once applied; `undo` is the inverse that application returned. */
export declare const afterRedo: (history: HistoryState, undo: Command) => HistoryState;
