import type { SitePartCatalog, SitePartImpact, SitePartPreview, SitePartRules, SitePartSummary, Transport } from '../../core';
import { EditorError } from '../../core';
import type { EditorStore } from '../model/store.svelte';

const sameRules = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

const newKey = (): string => Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');

/**
 * The site part being edited (plan 06-C): its draft rules (saved over their version), impact, in-context preview
 * and publication of document + rules together through the site parts API.
 */
export class SitePartState {
  open = $state(false);
  part = $state.raw<SitePartSummary | null>(null);
  rules = $state.raw<SitePartRules>({ include: [{ type: 'site' }] });
  version = $state(0);
  dirty = $state(false);
  routes = $state.raw<Record<string, string>>({});
  pages = $state.raw<SitePartCatalog['pages']>([]);
  impact = $state.raw<SitePartImpact | null>(null);
  preview = $state.raw<SitePartPreview | null>(null);
  error = $state('');
  /** Path of the rule the server refused (include.0.ids.1), to mark the field. */
  errorPath = $state('');
  busy = $state(false);
  store: EditorStore | null = null;

  constructor(readonly transport: Transport, readonly id: string) {}

  /** The published rules differ from the draft ones. */
  get rulesUnpublished(): boolean {
    return this.dirty || !sameRules(this.part?.rules, this.part?.publishedRules);
  }

  async load(): Promise<void> {
    if (!this.transport.listSiteParts) return;
    const catalog = await this.transport.listSiteParts();
    this.routes = catalog.routes;
    this.pages = catalog.pages;
    this.part = catalog.parts.find((p) => p.id === this.id) ?? null;
    if (this.part && !this.dirty) {
      this.rules = this.part.rules;
      this.version = this.part.version;
    }
  }

  setRules(rules: SitePartRules): void {
    this.rules = rules;
    this.dirty = true;
    this.impact = null;
  }

  async saveRules(): Promise<boolean> {
    if (!this.dirty || !this.transport.saveSitePartRules) return true;
    return this.act(async () => {
      this.version = (await this.transport.saveSitePartRules!(this.id, this.rules, this.version)).version;
      this.dirty = false;
      await this.load();
      this.store?.announce('parts.saved');
    });
  }

  async loadImpact(): Promise<void> {
    if (!this.transport.sitePartImpact) return;
    await this.act(async () => {
      if (this.dirty && !(await this.saveRules())) return;
      this.impact = await this.transport.sitePartImpact!([this.id]);
    });
  }

  async showPreview(pageId: string | null): Promise<void> {
    const store = this.store;
    if (!store || !this.transport.previewSitePart) return;
    await this.act(async () => {
      if (store.dirty) await store.save();
      if (this.dirty && !(await this.saveRules())) return;
      this.preview = await this.transport.previewSitePart!(this.id, store.revision, pageId);
    });
  }

  /** The session's publish goes here: the saved revision of the document with the current rules. */
  async publishDocument(revision: number, key: string): Promise<{ revision: number }> {
    if (this.dirty && !(await this.saveRules())) throw new EditorError('VALIDATION_FAILED', this.error);
    await this.transport.publishSiteParts!([{ id: this.id, revision, rulesVersion: this.version }], key);
    await this.load();
    return { revision };
  }

  /** Publishes: through the session when the document changed (it calls publishDocument), else only the rules. */
  async publish(): Promise<void> {
    const store = this.store;
    if (!store) return;
    if (store.dirty) await store.save();
    if (store.unpublished) {
      await store.publish();
      return;
    }
    await this.act(async () => {
      await this.publishDocument(store.revision, newKey());
      store.announce('parts.published');
    });
  }

  private async act(action: () => Promise<void>): Promise<boolean> {
    this.busy = true;
    this.error = '';
    this.errorPath = '';
    try {
      await action();
      return this.error === '';
    } catch (cause) {
      const error = cause instanceof EditorError ? cause : new EditorError('SERVER', String(cause));
      const path = Object.keys(error.details).find((k) => !['status', 'apiCode', 'requestId', 'currentRevision'].includes(k));
      this.errorPath = path ?? '';
      const t = this.store?.t;
      this.error = t ? (path ? t('parts.invalid', { path, reason: error.details[path] ?? '' }) : t(`error.${error.code}` as Parameters<typeof t>[0])) : error.message;
      if (error.code === 'SITE_PART_CONFLICT' && this.transport.sitePartImpact) this.impact = await this.transport.sitePartImpact([this.id]);
      return false;
    } finally {
      this.busy = false;
    }
  }
}

/** A transport whose page publication publishes the site part (document + rules) as one set. */
export const sitePartTransport = (transport: Transport, part: SitePartState): Transport => ({
  ...transport,
  publish: (_pageId, revision, key) => part.publishDocument(revision, key),
});
