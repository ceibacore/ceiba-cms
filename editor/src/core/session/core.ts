import type { Catalogue } from '../catalogue/types';
import { createCatalogue } from '../catalogue/build';
import type { Commands } from '../commands';
import type { DocumentMeta } from '../document/normalize';
import type { EditorError } from '../errors';
import type { HistoryState } from '../history/history';
import { canRedo, canUndo, emptyHistory } from '../history/history';
import type { EditorCapabilities } from '../transport/types';
import type { TreeState } from '../tree/state';
import { emptyTree } from '../tree/state';
import { Emitter } from './events';
import type { ResolvedOptions } from './options';
import type { SessionEvents, SessionStatus } from './status';

/** Mutable state of a session plus the helpers that keep events in sync. Only the session and its helpers use it. */
export class SessionCore {
  readonly events = new Emitter<SessionEvents>();
  status: SessionStatus = 'loading';
  tree: TreeState = emptyTree();
  /** Tree as the server has it (last load or successful save). */
  savedTree: TreeState = emptyTree();
  meta: DocumentMeta = { documentId: '', settings: {}, resources: [] };
  baseRevision = 0;
  history: HistoryState = emptyHistory();
  selection: string | null = null;
  catalogue: Catalogue = createCatalogue([]);
  commands: Commands | null = null;
  lastError: EditorError | null = null;
  conflictRevision: number | null = null;
  /** Negotiated permissions and features; null when the transport does not report them. */
  capabilities: EditorCapabilities | null = null;
  /** Revision on the public site; null when never published or unknown. */
  publishedRevision: number | null = null;
  publishing = false;

  constructor(readonly options: ResolvedOptions) {}

  get dirty(): boolean {
    return this.tree !== this.savedTree;
  }

  setStatus(status: SessionStatus): void {
    if (this.status === status) return;
    this.status = status;
    this.events.emit('status-change', { status });
  }

  /** Replaces the tree and keeps status, dirty flag and selection coherent. */
  commitTree(tree: TreeState, selection: string | null): void {
    const wasDirty = this.dirty;
    this.tree = tree;
    if (this.dirty !== wasDirty) this.events.emit('dirty-change', { dirty: this.dirty });
    if (this.status === 'ready' || this.status === 'dirty') this.setStatus(this.dirty ? 'dirty' : 'ready');
    this.select(selection !== null && tree.nodes[selection] ? selection : null);
  }

  /** Marks the current tree as the one stored on the server. */
  markSaved(tree: TreeState, revision: number): void {
    const wasDirty = this.dirty;
    this.savedTree = tree;
    this.baseRevision = revision;
    if (this.dirty !== wasDirty) this.events.emit('dirty-change', { dirty: this.dirty });
  }

  select(id: string | null): void {
    const next = id !== null && this.tree.nodes[id] ? id : null;
    if (next === this.selection) return;
    this.selection = next;
    this.events.emit('selection-change', { id: next });
  }

  setHistory(history: HistoryState): void {
    this.history = history;
    this.events.emit('history-change', { canUndo: canUndo(history), canRedo: canRedo(history) });
  }
}
