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
export declare const emptyTree: () => TreeState;
/** Children list of a parent (null = root). */
export declare const childrenOf: (state: TreeState, parent: string | null) => readonly string[];
/** Replaces the children list of a parent. */
export declare const withChildren: (state: TreeState, parent: string | null, children: readonly string[]) => TreeState;
export declare const withNode: (state: TreeState, node: NodeRecord) => TreeState;
export declare const withoutNodes: (state: TreeState, ids: readonly string[]) => TreeState;
/** Inserts an id at a position (clamped) of a children list. */
export declare const insertAt: (list: readonly string[], index: number, id: string) => string[];
