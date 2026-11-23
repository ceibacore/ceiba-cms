import type { EditorError } from '../errors';

/** Session states of plan 03. An error never drops the draft kept in memory. */
export type SessionStatus = 'loading' | 'ready' | 'dirty' | 'saving' | 'conflict' | 'offline' | 'load-error';

/** Public events: they carry ids and state, never page content or credentials. */
export type SessionEvents = {
  'ready': { revision: number; repairedIds: readonly string[] };
  'status-change': { status: SessionStatus };
  'selection-change': { id: string | null };
  'dirty-change': { dirty: boolean };
  'history-change': { canUndo: boolean; canRedo: boolean };
  'save-start': { reason: 'edit' | 'autosave'; baseRevision: number };
  'save-success': { revision: number };
  'save-error': { error: EditorError };
  'conflict': { baseRevision: number; currentRevision: number | null };
};
