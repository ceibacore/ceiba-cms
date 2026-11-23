import type { TreeState } from '../../core';

export interface FlatItem {
  readonly id: string;
  readonly depth: number;
  readonly parent: string | null;
  readonly index: number;
  readonly siblings: number;
}

/** Visible order of the structure navigator (depth first, everything expanded). */
export const flatten = (tree: TreeState): FlatItem[] => {
  const out: FlatItem[] = [];
  const walk = (ids: readonly string[], parent: string | null, depth: number): void => {
    ids.forEach((id, index) => {
      out.push({ id, depth, parent, index, siblings: ids.length });
      walk(tree.nodes[id]?.children ?? [], id, depth + 1);
    });
  };
  walk(tree.rootIds, null, 1);
  return out;
};
