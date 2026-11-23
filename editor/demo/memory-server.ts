import { EditorError } from '../src/core';
import type { PageDocument, RawNode, Transport } from '../src/core';
import { COMPONENTS, HTML_TAGS } from './catalogue';
import { importHtml, TemplateStore } from './content';
import { DesignStore } from './design';

const escape = (value: unknown): string =>
  String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rough stand-in for the server renderer; it also emits the page's own script, which the preview must not run. */
const renderNode = (node: RawNode): string => {
  const p = (node.props ?? {}) as Record<string, unknown>;
  const inner = (node.children ?? []).map(renderNode).join('');
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

  constructor(pageId: string, root: PageDocument['root'], readonly permissions: string[]) {
    this.revisions.set(1, { schemaVersion: 1, documentId: pageId, revision: 1, root, settings: {}, resources: [] });
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
      render: async (_id, revision) => ({ html: (this.revisions.get(revision)?.root ?? []).map(renderNode).join(''), css: '' }),
    };
  }
}
