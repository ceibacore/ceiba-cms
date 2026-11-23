import { EditorError } from '../src/core';
import type { DesignDocument, DesignState, PageDocument } from '../src/core';

/** In-browser stand-in for the site design store (If-Match, explicit publication, usage search). */
export class DesignStore {
  revision = 1;
  published: number | null = 1;
  readonly revisions = new Map<number, DesignDocument>([[1, {
    schemaVersion: 1,
    breakpoints: [{ id: 'sm', minWidth: 576 }, { id: 'md', minWidth: 768 }, { id: 'lg', minWidth: 992 }, { id: 'xl', minWidth: 1200 }],
    tokens: { 'color.brand': { type: 'color', value: '#b91c1c' }, 'space.lg': { type: 'length', value: '3rem' } },
    classes: { hero: { name: 'Hero', styles: { base: { paddingBlock: { token: 'space.lg' } } } } },
  }]]);

  state(): DesignState {
    return { revision: this.revision, publishedRevision: this.published, design: structuredClone(this.revisions.get(this.revision) as DesignDocument) };
  }

  save(design: DesignDocument, base: number): { revision: number } {
    if (base !== this.revision) throw new EditorError('REVISION_CONFLICT', 'stale', { currentRevision: String(this.revision) });
    this.revision++;
    this.revisions.set(this.revision, structuredClone(design));
    return { revision: this.revision };
  }

  publish(revision: number): { revision: number } {
    this.published = revision;
    return { revision };
  }

  usages(page: PageDocument, kind: 'token' | 'class', id: string): { pageId: string; title: string }[] {
    const needle = kind === 'token' ? `"token":"${id}"` : `"${id}"`;
    return JSON.stringify(page.root).includes(needle) ? [{ pageId: page.documentId, title: page.documentId }] : [];
  }
}
