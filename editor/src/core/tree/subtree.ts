import type { RawNode } from '../document/types';
import { getNode } from './queries';
import type { IdFactory } from './ids';
import type { NodeRecord, TreeState } from './state';
import { withNode } from './state';

const STRUCTURAL = new Set(['id', 'type', 'children']);

/** How ids of incoming raw nodes are treated. */
export type IdMode =
  /** Keep the ids of the raw nodes (undo of a removal, loading a document). Missing ids are generated. */
  | 'keep'
  /** Give every node a fresh id (insert, duplicate, paste). */
  | 'fresh';

const fieldsOf = (raw: RawNode): Record<string, unknown> => {
  const fields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!STRUCTURAL.has(key)) fields[key] = value;
  }
  return fields;
};

/**
 * Adds a raw subtree under a parent (the caller places the returned root id in the parent's children list).
 * Returns the new state, the root id and a map old id → new id for reference rewriting.
 */
export const attachRaw = (
  state: TreeState,
  raw: RawNode,
  parent: string | null,
  ids: IdFactory,
  mode: IdMode,
  renamed: Map<string, string> = new Map(),
): { state: TreeState; id: string; renamed: Map<string, string> } => {
  const original = typeof raw.id === 'string' && raw.id !== '' ? raw.id : typeof raw._id === 'string' ? raw._id : '';
  const id = mode === 'keep' && original !== '' && !state.nodes[original] ? original : ids();
  if (original !== '') renamed.set(original, id);
  let next = withNode(state, { id, type: raw.type, parent, children: [], fields: fieldsOf(raw) });
  const children: string[] = [];
  for (const child of raw.children ?? []) {
    const attached = attachRaw(next, child, id, ids, mode, renamed);
    next = attached.state;
    children.push(attached.id);
  }
  next = withNode(next, { ...(next.nodes[id] as NodeRecord), children });
  return { state: next, id, renamed };
};

/** Raw subtree of a node, with its current ids (for undo and serialization). */
export const toRaw = (state: TreeState, id: string): RawNode => {
  const node = getNode(state, id);
  return {
    id: node.id,
    type: node.type,
    ...node.fields,
    children: node.children.map((child) => toRaw(state, child)),
  };
};

/** Number of nodes and height of a raw subtree, to check limits before attaching it. */
export const measureRaw = (raw: RawNode): { count: number; height: number } => {
  const children = (raw.children ?? []).map(measureRaw);
  return {
    count: 1 + children.reduce((sum, c) => sum + c.count, 0),
    height: 1 + Math.max(0, ...children.map((c) => c.height)),
  };
};
