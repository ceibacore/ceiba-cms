import { fail } from '../errors';
import type { NodeRecord, TreeState } from './state';
import { childrenOf } from './state';

export const getNode = (state: TreeState, id: string): NodeRecord =>
  state.nodes[id] ?? fail('NODE_NOT_FOUND', `Node ${id} does not exist`, { id });

/** Ids of a node and all its descendants, depth first. */
export const subtreeIds = (state: TreeState, id: string): string[] => {
  const out: string[] = [];
  const stack = [id];
  while (stack.length > 0) {
    const current = stack.pop() as string;
    out.push(current);
    const node = state.nodes[current];
    if (node) {
      stack.push(...[...node.children].reverse());
    }
  }
  return out;
};

/** True when candidate is ancestor or the node itself. */
export const isSelfOrDescendant = (state: TreeState, ancestor: string, candidate: string | null): boolean => {
  let current = candidate;
  while (current !== null) {
    if (current === ancestor) return true;
    current = state.nodes[current]?.parent ?? null;
  }
  return false;
};

/** Depth of a node: root nodes are at depth 1. */
export const depthOf = (state: TreeState, id: string | null): number => {
  let depth = 0;
  let current = id;
  while (current !== null) {
    depth++;
    current = state.nodes[current]?.parent ?? null;
  }
  return depth;
};

/** Height of a subtree: a leaf is 1. */
export const heightOf = (state: TreeState, id: string): number => {
  const node = state.nodes[id];
  if (!node || node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map((child) => heightOf(state, child)));
};

export const indexInParent = (state: TreeState, id: string): number =>
  childrenOf(state, getNode(state, id).parent).indexOf(id);

export const nodeCount = (state: TreeState): number => Object.keys(state.nodes).length;
