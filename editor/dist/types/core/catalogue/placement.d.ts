import type { TreeState } from '../tree/state';
import type { Catalogue } from './types';
/**
 * Checks that a node of `type` may live under `parent` (null = root). Unknown types (kept from the document)
 * are not checked against their own rules, but a known parent still decides what it accepts.
 */
export declare const assertPlacement: (state: TreeState, catalogue: Catalogue, type: string, parent: string | null) => void;
/** Insertions only accept known types (plan 03: never replace a component silently). */
export declare const assertKnown: (catalogue: Catalogue, type: string) => void;
/** Props of unknown types are locked: the editor has no schema to change them safely. */
export declare const assertEditable: (catalogue: Catalogue, type: string) => void;
/** New content (insert, paste): every node must be known and every child allowed by its known parent. */
export declare const assertNewContent: (catalogue: Catalogue, raw: {
    type: string;
    children?: {
        type: string;
    }[];
}) => void;
