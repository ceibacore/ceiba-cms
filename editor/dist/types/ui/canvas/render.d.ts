import type { Catalogue, DesignDocument, TreeState } from '../../core';
import type { MediaMap } from './components';
export interface CanvasLabels {
    readonly unknown: (type: string) => string;
    readonly html: string;
    readonly emptyImage: string;
    /** A component with nothing to draw yet (no items, a link that is not a video…). */
    readonly empty: (type: string) => string;
    /** The site menu's links come from the host; the canvas names the menu instead. */
    readonly menu: (slug: string) => string;
}
/** Renders the whole tree into the body of the canvas document (full re-render; pages hold ≤ 500 nodes). */
export declare const renderCanvas: (doc: Document, tree: TreeState, catalogue: Catalogue, selection: string | null, labels: CanvasLabels, design?: DesignDocument, media?: MediaMap, 
/** Props to show over each node's own (plan 07-C: a query block's preview data). */
overrides?: Readonly<Record<string, Record<string, unknown>>>) => void;
