import { EditorError } from '../../src/core';
import type { PageDocument, Transport } from '../../src/core';
import { COMPONENTS, HTML_TAGS } from './catalogue';
import { sampleDocument } from './documents';

/** In-memory server with the module's revision rules: If-Match, revision = base + 1, 412 when stale. */
export class MemoryServer {
  revisions = new Map<number, PageDocument>([[3, sampleDocument()]]);
  current = 3;
  failNext: EditorError | null = null;
  saves: { reason: string; base: number }[] = [];
  published: number | null = 3;
  permissions = ['pages.read', 'pages.update', 'pages.publish'];
  publishKeys: string[] = [];

  /** Someone else saves a revision (another tab, another author). */
  saveElsewhere(): void {
    const doc = structuredClone(this.revisions.get(this.current) as PageDocument);
    doc.revision = this.current + 1;
    doc.root.push({ id: 'theirs', type: 'p', props: { content: 'Theirs' }, children: [] });
    this.current++;
    this.revisions.set(this.current, doc);
  }

  transport(): Transport {
    return {
      load: async () => ({ revision: this.current, document: structuredClone(this.revisions.get(this.current) as PageDocument) }),
      save: async (document, base, reason) => {
        this.saves.push({ reason, base });
        if (this.failNext) {
          const error = this.failNext;
          this.failNext = null;
          throw error;
        }
        if (base !== this.current) {
          throw new EditorError('REVISION_CONFLICT', 'stale', { currentRevision: String(this.current) });
        }
        if (document.revision !== base + 1) throw new EditorError('VALIDATION_FAILED', 'sequence');
        this.current = document.revision;
        this.revisions.set(this.current, structuredClone(document));
        return { revision: this.current };
      },
      preview: async (_page, revision) => structuredClone(this.revisions.get(revision) as PageDocument),
      listComponents: async () => COMPONENTS,
      listElementRules: async () => HTML_TAGS,
      capabilities: async () => ({ permissions: this.permissions,
        features: { revisionPublish: this.permissions.includes('pages.publish'), autosave: true } }),
      status: async () => ({ revision: this.current, publishedRevision: this.published,
        hasUnpublishedChanges: this.published !== this.current }),
      publish: async (_page, revision, key) => {
        this.publishKeys.push(key);
        if (!this.permissions.includes('pages.publish')) throw new EditorError('AUTHORIZATION_DENIED', 'no');
        if (revision !== this.current) throw new EditorError('REVISION_CONFLICT', 'stale', { currentRevision: String(this.current) });
        this.published = revision;
        return { revision };
      },
      render: async (_page, revision) => `<p>revision ${revision}</p>`,
    };
  }
}
