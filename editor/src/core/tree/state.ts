/** Normalized tree: nodes by id, parent pointers and ordered children. Every update returns a new state. */
export interface NodeRecord {
  readonly id: string;
  readonly type: string;
  readonly parent: string | null;
  readonly children: readonly string[];
  /** Every other field of the raw node (props, name, bindings, extensions…), kept as is. */
  readonly fields: Readonly<Record<string, unknown>>;
}

export interface TreeState {
  readonly nodes: Readonly<Record<string, NodeRecord>>;
  readonly rootIds: readonly string[];
}

export const emptyTree = (): TreeState => ({ nodes: {}, rootIds: [] });

/** Children list of a parent (null = root). */
export const childrenOf = (state: TreeState, parent: string | null): readonly string[] =>
  parent === null ? state.rootIds : state.nodes[parent]?.children ?? [];

/** Replaces the children list of a parent. */
export const withChildren = (state: TreeState, parent: string | null, children: readonly string[]): TreeState => {
  if (parent === null) {
    return { ...state, rootIds: children };
  }
  const node = state.nodes[parent];
  return node ? withNode(state, { ...node, children }) : state;
};

export const withNode = (state: TreeState, node: NodeRecord): TreeState => ({
  ...state,
  nodes: { ...state.nodes, [node.id]: node },
});

export const withoutNodes = (state: TreeState, ids: readonly string[]): TreeState => {
  const nodes = { ...state.nodes };
  for (const id of ids) {
    delete nodes[id];
  }
  return { ...state, nodes };
};

/** Inserts an id at a position (clamped) of a children list. */
export const insertAt = (list: readonly string[], index: number, id: string): string[] => {
  const at = Math.max(0, Math.min(index, list.length));
  return [...list.slice(0, at), id, ...list.slice(at)];
};
