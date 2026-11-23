import type { Command } from '../commands/types';
import { groupKeyOf } from './grouping';

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

export const DEFAULT_HISTORY: HistoryOptions = { limit: 100, groupWindowMs: 500 };

export const emptyHistory = (): HistoryState => ({ past: [], future: [] });

/** Records an applied command. A new edit clears the redo list (local history, not server revisions). */
export const record = (
  history: HistoryState,
  forward: Command,
  inverse: Command,
  at: number,
  options: HistoryOptions = DEFAULT_HISTORY,
): HistoryState => {
  const group = groupKeyOf(forward);
  const last = history.past[history.past.length - 1];
  if (group !== null && last && last.group === group && at - last.at <= options.groupWindowMs) {
    // Same burst: keep the first undo (state before the burst) and the latest redo.
    const merged: HistoryEntry = { undo: last.undo, redo: forward, group, at };
    return { past: [...history.past.slice(0, -1), merged], future: [] };
  }
  const past = [...history.past, { undo: inverse, redo: forward, group, at }];
  return { past: past.slice(Math.max(0, past.length - options.limit)), future: [] };
};

export const canUndo = (history: HistoryState): boolean => history.past.length > 0;
export const canRedo = (history: HistoryState): boolean => history.future.length > 0;

/** Moves the last step to the redo list once its undo was applied; `redo` is the inverse that application returned. */
export const afterUndo = (history: HistoryState, redo: Command): HistoryState => {
  const entry = history.past[history.past.length - 1];
  if (!entry) return history;
  return { past: history.past.slice(0, -1), future: [...history.future, { ...entry, redo, group: null }] };
};

/** Moves the next redo step back to the past once applied; `undo` is the inverse that application returned. */
export const afterRedo = (history: HistoryState, undo: Command): HistoryState => {
  const entry = history.future[history.future.length - 1];
  if (!entry) return history;
  return { past: [...history.past, { ...entry, undo, group: null }], future: history.future.slice(0, -1) };
};
