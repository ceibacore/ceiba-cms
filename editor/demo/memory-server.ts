import { EditorError } from '../src/core';
import type { PageDocument, Transport } from '../src/core';
import { COMPONENTS, HTML_TAGS } from './catalogue';

/** In-browser stand-in for the module API, with its revision rules (If-Match, base + 1, 412 when stale). */
export class MemoryServer {
  current = 1;
  readonly revisions = new Map<number, PageDocument>();

  constructor(pageId: string, root: PageDocument['root']) {
    this.revisions.set(1, { schemaVersion: 1, documentId: pageId, revision: 1, root, settings: {}, resources: [] });
  }

  latest(): PageDocument {
    return structuredClone(this.revisions.get(this.current) as PageDocument);
  }

  transport(): Transport {
    return {
      load: async () => ({ revision: this.current, document: this.latest() }),
      save: async (document, base) => {
        if (base !== this.current) throw new EditorError('REVISION_CONFLICT', 'stale', { currentRevision: String(this.current) });
        this.current = base + 1;
        this.revisions.set(this.current, structuredClone({ ...document, revision: this.current }));
        return { revision: this.current };
      },
      preview: async (_id, revision) => structuredClone(this.revisions.get(revision) as PageDocument),
      listComponents: async () => COMPONENTS,
      listElementRules: async () => HTML_TAGS,
    };
  }
}
