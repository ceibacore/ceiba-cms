import type { Catalogue, NodeRecord } from '../../core';
/**
 * Prop that holds the visible text of a node, or null when it cannot be edited in place (containers, nodes with
 * children, unknown components, embeds). Plan 03 D-6: plain text and line breaks only.
 */
export declare const textKey: (node: NodeRecord, catalogue: Catalogue) => string | null;
export declare const isMultiline: (type: string) => boolean;
/** Text typed in place: line breaks kept (only for multi-line nodes), other control characters dropped. */
export declare const cleanText: (raw: string, multiline: boolean) => string;
/** Puts the caret at the end of an element of the canvas document. */
export declare const caretAtEnd: (element: HTMLElement) => void;
