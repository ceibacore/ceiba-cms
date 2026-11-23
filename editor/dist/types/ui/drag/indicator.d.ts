import type { Zone } from './target';
/** Draws where a drop would land, inside the canvas document (no scripts needed there). */
export declare const showIndicator: (doc: Document, anchor: Element | null, zone: Zone, refused: boolean) => void;
export declare const hideIndicator: (doc: Document | null | undefined) => void;
