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
    };
  }
}
