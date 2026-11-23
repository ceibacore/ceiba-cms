import type { Command, CommandContext } from '../commands/types';
import { toDocument } from '../document/normalize';
import type { PageDocument } from '../document/types';
import { EditorError } from '../errors';
import { afterRedo, afterUndo, canRedo, canUndo, record } from '../history/history';
import type { TreeState } from '../tree/state';
import type { EditorCapabilities, SaveReason, Transport } from '../transport/types';
import { SessionCore } from './core';
import { loadSession } from './load';
import type { SessionOptions } from './options';
import { resolveOptions } from './options';
import { canPublish, publishSession } from './publish';
import { resolveConflict, saveSession } from './save';
import type { SessionStatus } from './status';

/**
 * Master class of the editor core: one page being edited. The UI calls it and listens to `events`;
 * two sessions never share state.
 */
export class EditorSession {
  private readonly core: SessionCore;

  constructor(options: SessionOptions) {
    this.core = new SessionCore(resolveOptions(options));
  }

  get events() { return this.core.events; }
  get status(): SessionStatus { return this.core.status; }
  get tree(): TreeState { return this.core.tree; }
  get selection(): string | null { return this.core.selection; }
  get baseRevision(): number { return this.core.baseRevision; }
  get dirty(): boolean { return this.core.dirty; }
  get catalogue() { return this.core.catalogue; }
  get lastError(): EditorError | null { return this.core.lastError; }
  get canUndo(): boolean { return canUndo(this.core.history); }
  get canRedo(): boolean { return canRedo(this.core.history); }
  /** Catalogue, limits and ids of the loaded page, to try a command without applying it (drop targets). */
  get commandContext(): CommandContext | null { return this.core.commands?.context ?? null; }
  get capabilities(): EditorCapabilities | null { return this.core.capabilities; }
  get publishedRevision(): number | null { return this.core.publishedRevision; }
  get canPublish(): boolean { return canPublish(this.core); }
  get publishing(): boolean { return this.core.publishing; }
  get conflictRevision(): number | null { return this.core.conflictRevision; }
  get pageId(): string { return this.core.options.pageId; }
  get transport(): Transport { return this.core.options.transport; }

  load(): Promise<void> {
    return loadSession(this.core);
  }

  /**
   * Applies a command. On error the tree is unchanged and the EditorError is thrown.
   * The tree is committed before history-change fires, so listeners (autosave) see the new dirty state.
   */
  dispatch(command: Command): void {
    const commands = this.editable();
    const result = commands.apply(this.core.tree, command);
    this.core.commitTree(result.state, result.focus);
    this.core.setHistory(record(this.core.history, command, result.inverse, this.core.options.now(), this.core.options.history));
  }

  undo(): void {
    const commands = this.editable();
    const entry = this.core.history.past[this.core.history.past.length - 1];
    if (!entry) return;
    const result = commands.apply(this.core.tree, entry.undo);
    this.core.commitTree(result.state, result.focus);
    this.core.setHistory(afterUndo(this.core.history, result.inverse));
  }

  redo(): void {
    const commands = this.editable();
    const entry = this.core.history.future[this.core.history.future.length - 1];
    if (!entry) return;
    const result = commands.apply(this.core.tree, entry.redo);
    this.core.commitTree(result.state, result.focus);
    this.core.setHistory(afterRedo(this.core.history, result.inverse));
  }

  select(id: string | null): void {
    this.core.select(id);
  }

  save(reason: SaveReason = 'edit'): Promise<number | null> {
    return saveSession(this.core, reason);
  }

  /** Publishes the saved revision the editor stands on (save first). */
  publish(): Promise<number> {
    return publishSession(this.core);
  }

  resolveConflict(choice: 'keep-mine' | 'take-theirs'): Promise<void> {
    return resolveConflict(this.core, choice);
  }

  /** The document as it would be saved now (for the server preview or export). */
  toDocument(): PageDocument {
    return toDocument(this.core.tree, this.core.meta, this.core.baseRevision + 1);
  }

  /** Releases listeners; the host calls it when unmounting the editor. */
  destroy(): void {
    this.core.events.clear();
  }

  private editable() {
    if (!this.core.commands || this.core.status === 'loading' || this.core.status === 'load-error'
        || this.core.status === 'saving') {
      throw new EditorError('INVALID_DOCUMENT', `The editor cannot change the page while ${this.core.status}`);
    }
    return this.core.commands;
  }
}
