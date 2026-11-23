import { EditorError } from '../errors';
import { Emitter } from '../session/events';
import { compileStyles } from '../styles/compile';
import type { DesignDocument, StyleDiagnostic } from '../styles/types';
import { DEFAULT_BREAKPOINTS } from '../styles/types';
import type { Transport } from '../transport/types';

export type DesignEvents = {
  'change': { dirty: boolean };
  'saved': { revision: number };
  'published': { revision: number };
};

export const defaultDesign = (): DesignDocument => ({ schemaVersion: 1, breakpoints: DEFAULT_BREAKPOINTS, tokens: {}, classes: {} });

/**
 * The site design while editing (plan 04-C/D): loaded from the host, changed locally (the canvas shows it at
 * once), saved as a draft with If-Match and published explicitly. A design with diagnostics is never sent.
 */
export class SiteDesignSession {
  readonly events = new Emitter<DesignEvents>();
  design: DesignDocument = defaultDesign();
  saved: DesignDocument = this.design;
  revision = 0;
  publishedRevision: number | null = null;
  available = false;

  constructor(private readonly transport: Transport) {}

  get dirty(): boolean {
    return this.design !== this.saved;
  }

  get editable(): boolean {
    return this.available && typeof this.transport.saveDesign === 'function';
  }

  get diagnostics(): readonly StyleDiagnostic[] {
    return compileStyles(this.design, []).diagnostics;
  }

  async load(): Promise<void> {
    const state = await this.transport.loadDesign?.().catch(() => null);
    if (!state) return;
    this.design = state.design;
    this.saved = state.design;
    this.revision = state.revision;
    this.publishedRevision = state.publishedRevision;
    this.available = true;
    this.events.emit('change', { dirty: false });
  }

  /** Local change: nothing is stored until save(). */
  update(design: DesignDocument): void {
    this.design = design;
    this.events.emit('change', { dirty: this.dirty });
  }

  async save(): Promise<number> {
    if (!this.transport.saveDesign) throw new EditorError('AUTHORIZATION_DENIED', 'This host does not store designs');
    const first = this.diagnostics[0];
    if (first) throw new EditorError('VALIDATION_FAILED', `Invalid design at ${first.path}`, { [first.path]: first.code });
    const design = this.design;
    const { revision } = await this.transport.saveDesign(design, this.revision);
    this.revision = revision;
    this.saved = design;
    this.events.emit('saved', { revision });
    this.events.emit('change', { dirty: this.dirty });
    return revision;
  }

  async publish(): Promise<number> {
    if (!this.transport.publishDesign) throw new EditorError('AUTHORIZATION_DENIED', 'This host does not publish designs');
    if (this.dirty) throw new EditorError('NOTHING_TO_PUBLISH', 'Save the design before publishing');
    const { revision } = await this.transport.publishDesign(this.revision);
    this.publishedRevision = revision;
    this.events.emit('published', { revision });
    return revision;
  }

  /** Drops local changes and reloads the server design (after a conflict). */
  async reload(): Promise<void> {
    await this.load();
  }
}
