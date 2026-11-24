import type { Catalogue, DesignDocument, TreeState } from '../../core';
import type { MediaMap } from './components';
export interface CanvasLabels {
    readonly unknown: (type: string) => string;
    readonly html: string;
    readonly emptyImage: string;
    /** A component with nothing to draw yet (no items, a link that is not a video…). */
    readonly empty: (type: string) => string;
}
/** Renders the whole tree into the body of the canvas document (full re-render; pages hold ≤ 500 nodes). */
export declare const renderCanvas: (doc: Document, tree: TreeState, catalogue: Catalogue, selection: string | null, labels: CanvasLabels, design?: DesignDocument, media?: MediaMap) => void;
