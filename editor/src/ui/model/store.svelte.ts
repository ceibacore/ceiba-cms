import type { Catalogue, Command, EditorSession, SessionStatus, TreeState } from '../../core';
import { EditorError } from '../../core';
import type { MessageKey, Translate } from '../i18n';

/**
 * Reactive view of an EditorSession for the Svelte components. Every change goes through the session;
 * errors are announced (aria-live) instead of thrown at the UI.
 */
export class EditorStore {
  tree = $state.raw<TreeState>({ nodes: {}, rootIds: [] });
  catalogue = $state.raw<Catalogue | null>(null);
  selection = $state<string | null>(null);
  status = $state<SessionStatus>('loading');
  dirty = $state(false);
  canUndo = $state(false);
  canRedo = $state(false);
  revision = $state(0);
  publishedRevision = $state<number | null>(null);
  canPublish = $state(false);
  publishing = $state(false);
  conflictRevision = $state<number | null>(null);
  /** Polite announcement (results) and assertive one (errors). */
  message = $state('');
  alert = $state('');
  private readonly stops: (() => void)[] = [];

  constructor(readonly session: EditorSession, readonly t: Translate) {
    for (const event of ['status-change', 'dirty-change', 'history-change', 'selection-change', 'ready',
      'save-success', 'conflict', 'publish-start', 'publish-success', 'publish-error'] as const) {
      this.stops.push(session.events.on(event, () => this.sync()));
    }
    this.sync();
  }

  sync(): void {
    const s = this.session;
    this.tree = s.tree;
    this.catalogue = s.status === 'loading' || s.status === 'load-error' ? this.catalogue : s.catalogue;
    this.selection = s.selection;
    this.status = s.status;
    this.dirty = s.dirty;
    this.canUndo = s.canUndo;
    this.canRedo = s.canRedo;
    this.revision = s.baseRevision;
    this.publishedRevision = s.publishedRevision;
    this.canPublish = s.canPublish;
    this.publishing = s.publishing;
    this.conflictRevision = s.conflictRevision;
  }

  /** Something on the server is not public yet (or local edits are pending). */
  get unpublished(): boolean {
    return this.dirty || this.publishedRevision !== this.revision;
  }

  async publish(): Promise<void> {
    try {
      const revision = await this.session.publish();
      this.sync();
      this.announce('announce.published', { revision });
    } catch (error) {
      this.sync();
      this.fail(error);
    }
  }

  async resolve(choice: 'keep-mine' | 'take-theirs'): Promise<void> {
    try {
      await this.session.resolveConflict(choice);
      this.sync();
      this.announce(choice === 'keep-mine' ? 'announce.keptMine' : 'announce.tookTheirs', { revision: this.revision });
    } catch (error) {
      this.sync();
      this.fail(error);
    }
  }

  announce(key: MessageKey, params: Record<string, string | number> = {}): void {
    this.message = this.t(key, params);
    this.alert = '';
  }

  fail(error: unknown, code = error instanceof EditorError ? error.code : 'SERVER'): void {
    this.alert = this.t(`error.${code}` as MessageKey);
  }

  /** Runs a command; returns false (and announces why) when the core refuses it. */
  run(command: Command, announce?: [MessageKey, Record<string, string | number>?]): boolean {
    try {
      this.session.dispatch(command);
      this.sync();
      if (announce) this.announce(announce[0], announce[1]);
      return true;
    } catch (error) {
      this.fail(error);
      return false;
    }
  }

  undo(): void {
    this.guard(() => this.session.undo());
  }

  redo(): void {
    this.guard(() => this.session.redo());
  }

  select(id: string | null): void {
    this.session.select(id);
    this.sync();
  }

  async save(): Promise<void> {
    try {
      const revision = await this.session.save('edit');
      this.sync();
      if (revision !== null) this.announce('announce.saved', { revision });
    } catch (error) {
      this.sync();
      this.fail(error);
    }
  }

  destroy(): void {
    for (const stop of this.stops) stop();
  }

  private guard(action: () => void): void {
    try {
      action();
    } catch (error) {
      this.fail(error);
    }
    this.sync();
  }
}
