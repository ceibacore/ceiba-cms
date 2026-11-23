import type { RawNode, TemplateSummary } from '../../core';
import { applyCommand } from '../../core';
import { insertTarget } from '../model/insert';
import type { EditorStore } from '../model/store.svelte';

const stripIds = (node: RawNode): RawNode => {
  const { id: _id, _id: _legacy, children, ...rest } = node;
  return { ...rest, children: (children ?? []).map(stripIds) } as RawNode;
};

/**
 * Templates and HTML import (plan 03-E2). Both are optional: shown only when the transport has them and the server
 * says so (features.templates / features.htmlImport), or when the transport reports no capabilities at all.
 */
export class ContentActions {
  templates = $state.raw<readonly TemplateSummary[]>([]);

  constructor(private readonly store: EditorStore) {}

  private allowed(feature: string, method: unknown): boolean {
    const capabilities = this.store.session.capabilities;
    return typeof method === 'function' && (capabilities === null || capabilities.features[feature] === true);
  }

  get canTemplates(): boolean {
    return this.allowed('templates', this.store.session.transport.listTemplates);
  }

  get canImport(): boolean {
    return this.allowed('htmlImport', this.store.session.transport.importHtml);
  }

  async loadTemplates(): Promise<void> {
    const transport = this.store.session.transport;
    if (!this.canTemplates || !transport.listTemplates) return;
    try {
      this.templates = await transport.listTemplates();
    } catch (error) {
      this.store.fail(error);
    }
  }

  /** Inserts several nodes one after another where the palette would insert the first one. */
  insertNodes(nodes: readonly RawNode[], label: string): boolean {
    const catalogue = this.store.catalogue;
    const first = nodes[0];
    if (!catalogue || !first) return false;
    const target = insertTarget(this.store.tree, catalogue, this.store.selection, first.type);
    // All or nothing: try every insert on a copy first, so a refused node leaves nothing half inserted.
    const context = this.store.session.commandContext;
    if (!context) return false;
    try {
      nodes.reduce((tree, node, i) => applyCommand(tree,
        { kind: 'insert', parent: target.parent, index: target.index + i, node }, context).state, this.store.tree);
    } catch (error) {
      this.store.fail(error);
      return false;
    }
    let ok = true;
    nodes.forEach((node, i) => {
      if (ok) ok = this.store.run({ kind: 'insert', parent: target.parent, index: target.index + i, node });
    });
    if (ok) this.store.announce('announce.inserted', { label });
    return ok;
  }

  async saveTemplate(nodeId: string, name: string, category: string): Promise<boolean> {
    const save = this.store.session.transport.saveTemplate;
    const node = this.store.session.toDocument().root.flatMap(function find(n: RawNode): RawNode[] {
      return n.id === nodeId ? [n] : (n.children ?? []).flatMap(find);
    })[0];
    if (!save || !node) return false;
    try {
      const saved = await save.call(this.store.session.transport, { name, category, nodes: [stripIds(node)] });
      this.templates = [...this.templates, saved];
      this.store.announce('announce.templateSaved', { name });
      return true;
    } catch (error) {
      this.store.fail(error);
      return false;
    }
  }

  async importHtml(html: string): Promise<number | null> {
    const transport = this.store.session.transport;
    if (!transport.importHtml) return null;
    try {
      const result = await transport.importHtml(html);
      if (result.nodes.length === 0) {
        this.store.announce('announce.importEmpty');
        return 0;
      }
      return this.insertNodes(result.nodes, this.store.t('import.label')) ? result.warnings.length : null;
    } catch (error) {
      this.store.fail(error);
      return null;
    }
  }
}

