import type { Catalogue, RawNode, TreeState } from '../../core';
/** Default props of a catalogue entry (propsSchema[key].default). */
export declare const defaultNode: (catalogue: Catalogue, type: string) => RawNode;
/**
 * Where the palette inserts: inside the selection when it is a container that accepts the type (as last child),
 * otherwise right after the selection; at the end of the page when nothing is selected.
 */
export declare const insertTarget: (tree: TreeState, catalogue: Catalogue, selection: string | null, type: string) => {
    parent: string | null;
    index: number;
};
