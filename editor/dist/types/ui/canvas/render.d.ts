import type { Catalogue, TreeState } from '../../core';
export interface CanvasLabels {
    readonly unknown: (type: string) => string;
    readonly html: string;
    readonly emptyImage: string;
}
/** Renders the whole tree into the body of the canvas document (full re-render; pages hold ≤ 500 nodes). */
export declare const renderCanvas: (doc: Document, tree: TreeState, catalogue: Catalogue, selection: string | null, labels: CanvasLabels) => void;
