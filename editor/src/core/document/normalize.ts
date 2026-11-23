import { EditorError } from '../errors';
import type { IdFactory } from '../tree/ids';
import { attachRaw, toRaw } from '../tree/subtree';
import type { TreeState } from '../tree/state';
import { emptyTree } from '../tree/state';
import type { PageDocument, RawNode } from './types';
import { SCHEMA_VERSION } from './types';

/** Document metadata the tree does not own; kept to rebuild the envelope on save. */
export interface DocumentMeta {
  readonly documentId: string;
  readonly settings: Readonly<Record<string, unknown>>;
  readonly resources: readonly string[];
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const checkNode = (node: unknown, path: string): void => {
  if (!isObject(node) || typeof node.type !== 'string' || node.type === '') {
    throw new EditorError('INVALID_DOCUMENT', `Node without type at ${path}`, { path });
  }
  if (node.children !== undefined && !Array.isArray(node.children)) {
    throw new EditorError('INVALID_DOCUMENT', `Children must be a list at ${path}`, { path });
  }
  (node.children as unknown[] | undefined)?.forEach((child, i) => checkNode(child, `${path}.children[${i}]`));
};

/** Checks the envelope shape the server sends (the server already validated it in depth). */
export const parseDocument = (value: unknown): PageDocument => {
  if (!isObject(value) || value.schemaVersion !== SCHEMA_VERSION) {
    throw new EditorError('INVALID_DOCUMENT', 'Unsupported document schema version');
  }
  const { documentId, revision, root, settings, resources } = value;
  if (typeof documentId !== 'string' || documentId === '' || typeof revision !== 'number' || !Array.isArray(root)
      || !isObject(settings) || !Array.isArray(resources)) {
    throw new EditorError('INVALID_DOCUMENT', 'Invalid document envelope');
  }
  root.forEach((node, i) => checkNode(node, `root[${i}]`));
  return value as unknown as PageDocument;
};

/**
 * Loads a document into a tree. Ids are kept; missing or repeated ids get new ones, and the repeated ones are
 * reported so the UI can say the document was repaired.
 */
export const fromDocument = (
  document: PageDocument,
  ids: IdFactory,
): { tree: TreeState; meta: DocumentMeta; repairedIds: string[] } => {
  let tree = emptyTree();
  const seen = new Set<string>();
  const repairedIds: string[] = [];
  const rootIds: string[] = [];
  for (const raw of document.root) {
    const attached = attachRaw(tree, raw, null, ids, 'keep');
    for (const [original, assigned] of attached.renamed) {
      if (seen.has(original) || original !== assigned) repairedIds.push(original);
      seen.add(original);
    }
    tree = attached.state;
    rootIds.push(attached.id);
  }
  return {
    tree: { ...tree, rootIds },
    meta: { documentId: document.documentId, settings: document.settings, resources: document.resources },
    repairedIds: [...new Set(repairedIds)],
  };
};

/** Envelope for a save: revision is the one the server must create (base + 1). */
export const toDocument = (tree: TreeState, meta: DocumentMeta, revision: number): PageDocument => ({
  schemaVersion: SCHEMA_VERSION,
  documentId: meta.documentId,
  revision,
  root: tree.rootIds.map((id): RawNode => toRaw(tree, id)),
  settings: { ...meta.settings },
  resources: [...meta.resources],
});
