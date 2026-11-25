import { EditorError } from '../src/core';
import type { MediaUsages, PageDocument, RawNode, Transport } from '../src/core';
import { COMPONENTS, HTML_TAGS } from './catalogue';
import { importHtml, TemplateStore } from './content';
import { DesignStore } from './design';
import { MediaStore } from './media';
import { SitePartsStore } from './site-parts';
import { DataSourcesStore } from './data-sources';
import type { MediaMap } from '../src/ui/canvas/components';
import { COMPONENT_VIEWS, resolveProps, toHtml } from '../src/ui/canvas/components';

const escape = (value: unknown): string =>
  String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rough stand-in for the server renderer; it also emits the page's own script, which the preview must not run. */
const renderNode = (node: RawNode, media: MediaMap = {}): string => {
  const p = (node.props ?? {}) as Record<string, unknown>;
  const inner = (node.children ?? []).map((child) => renderNode(child, media)).join('');
  // The module's components draw the markup the Bootstrap 5 views give (fixtures/components).
  const view = COMPONENT_VIEWS[node.type];
  if (view) {
    const vnode = view(resolveProps(p, media));
    return vnode === null ? '' : toHtml(vnode);
  }
  switch (node.type) {
    case 'container': return `<div class="container">${inner}</div>`;
    case 'heading': return `<h${Number(p.level) || 2}>${escape(p.text)}</h${Number(p.level) || 2}>`;
    case 'text': return `<p>${escape(p.content).replace(/\n/g, '<br>')}</p>`;
    case 'button': return `<a class="btn btn-primary" href="${escape(p.url)}">${escape(p.label)}</a>`;
    case 'html': return String(p.content ?? '');
    default: return `<${node.type}>${escape(p.content)}${inner}</${node.type}>`;
  }
};

/** In-browser stand-in for the module API, with its revision rules (If-Match, base + 1, 412 when stale). */
export class MemoryServer {
  current = 1;
  published: number | null = 1;
  readonly revisions = new Map<number, PageDocument>();
  readonly templates = new TemplateStore();
  readonly design = new DesignStore();
  readonly media = new MediaStore();
  readonly siteParts: SitePartsStore;
  readonly data = new DataSourcesStore();

  constructor(pageId: string, root: PageDocument['root'], readonly permissions: string[]) {
    this.revisions.set(1, { schemaVersion: 1, documentId: pageId, revision: 1, root, settings: {}, resources: [] });
    this.siteParts = new SitePartsStore(pageId);
  }

  latest(): PageDocument {
    return structuredClone(this.revisions.get(this.current) as PageDocument);
  }

  /** Someone else saves a revision (another tab, another author). */
  saveElsewhere(text = 'Saved elsewhere'): void {
    const doc = this.latest();
    doc.root.push({ id: `other-${this.current}`, type: 'text', props: { content: text }, children: [] });
    this.current++;
    this.revisions.set(this.current, { ...doc, revision: this.current });
  }

  private usages(id: string): MediaUsages {
    return this.media.usages(id, this.latest(), this.design.state().design);
  }

  private mediaTransport(): Partial<Transport> {
    const pick = (ids: readonly string[]) => Object.fromEntries(this.media.items.filter((i) => ids.includes(i.id)).map((i) => [i.id, i]));
    return {
      listMedia: async (search, page) => this.media.list(search, page),
      uploadMedia: async (file, options) => this.media.upload(file, options),
      resolveMedia: async (ids) => pick(ids),
      mediaSettings: async () => this.media.settings,
      describeMedia: async (id, alt) => this.media.describe(id, alt),
      mediaUsages: async (id) => this.usages(id),
      deleteMedia: async (id) => this.media.remove(id, this.usages(id)),
    };
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
      capabilities: async () => ({ permissions: this.permissions,
        features: { revisionPublish: this.permissions.includes('pages.publish'), autosave: true, templates: true, htmlImport: true } }),
      status: async () => ({ revision: this.current, publishedRevision: this.published,
        hasUnpublishedChanges: this.published !== this.current }),
      publish: async (_id, revision) => {
        if (!this.permissions.includes('pages.publish')) throw new EditorError('AUTHORIZATION_DENIED', 'no');
        this.published = revision;
        return { revision };
      },
      loadDesign: async () => this.design.state(),
      saveDesign: async (design, base) => this.design.save(design, base),
      publishDesign: async (revision) => this.design.publish(revision),
      designUsages: async (kind, id) => this.design.usages(this.latest(), kind, id),
      listTemplates: async () => structuredClone(this.templates.templates),
      saveTemplate: async (template) => this.templates.save(structuredClone(template)),
      importHtml: async (html) => importHtml(html),
      ...this.mediaTransport(),
      listDataSources: async () => [{ id: this.data.schema.id, label: this.data.schema.label, capabilities: this.data.schema.capabilities }],
      dataSourceSchema: async () => structuredClone(this.data.schema),
      dataSourceRecords: async () => this.data.rows.map((r) => ({ slug: r.id, label: r.title })),
      previewQuery: async (query) => this.data.preview(query),
      listSiteParts: async () => this.siteParts.catalog(),
      saveSitePartRules: async (id, rules, version) => this.siteParts.save(id, rules, version),
      sitePartImpact: async (ids) => this.siteParts.impact(ids),
      previewSitePart: async (id, revision, pageId) => ({ css: '', applies: this.siteParts.applies(id, pageId),
        html: (this.revisions.get(revision)?.root ?? []).map((n) => renderNode(n)).join('') + `<p>Page ${pageId ?? '404'}</p>` }),
      publishSiteParts: async (changes) => {
        this.siteParts.publish(changes.map((c) => c.id));
        this.published = changes[0]?.revision ?? this.published;
        return Object.fromEntries(changes.map((c) => [c.id, `rev-${c.revision}`]));
      },
      render: async (_id, revision) => {
        const media = Object.fromEntries(this.media.items.map((i) => [i.id, i]));
        return { html: (this.revisions.get(revision)?.root ?? []).map((n) => renderNode(n, media)).join(''), css: '' };
      },
    };
  }
}
