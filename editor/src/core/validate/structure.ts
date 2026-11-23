import type { TreeState } from '../tree/state';
import type { Limits } from './limits';

export interface TreeIssue {
  readonly code: 'ORPHAN' | 'PARENT_MISMATCH' | 'CYCLE' | 'DUPLICATE_ID' | 'MAX_NODES' | 'MAX_DEPTH';
  readonly id: string;
}

/**
 * Full integrity check of a tree: every node reachable once from the root, parent pointers consistent, no cycles,
 * within limits. Commands keep these invariants; this check guards loading and the tests.
 */
export const checkTree = (state: TreeState, limits: Limits): TreeIssue[] => {
  const issues: TreeIssue[] = [];
  const visited = new Set<string>();
  const walk = (id: string, parent: string | null, depth: number, path: Set<string>): void => {
    if (path.has(id)) {
      issues.push({ code: 'CYCLE', id });
      return;
    }
    if (visited.has(id)) {
      issues.push({ code: 'DUPLICATE_ID', id });
      return;
    }
    visited.add(id);
    const node = state.nodes[id];
    if (!node) {
      issues.push({ code: 'ORPHAN', id });
      return;
    }
    if (node.parent !== parent) issues.push({ code: 'PARENT_MISMATCH', id });
    if (depth > limits.maxDepth) issues.push({ code: 'MAX_DEPTH', id });
    const next = new Set(path).add(id);
    for (const child of node.children) walk(child, id, depth + 1, next);
  };
  for (const id of state.rootIds) walk(id, null, 1, new Set());
  for (const id of Object.keys(state.nodes)) {
    if (!visited.has(id)) issues.push({ code: 'ORPHAN', id });
  }
  if (visited.size > limits.maxNodes) issues.push({ code: 'MAX_NODES', id: '' });
  return issues;
};
