/** Markup of a component as data: built into the canvas DOM, or serialized for the shared fixtures (plan 05-B). */
export interface VNode {
    readonly tag: string;
    /** true is a boolean attribute (open); '' is an empty value (alt=""). */
    readonly attrs: readonly (readonly [string, string | true])[];
    readonly children: readonly (VNode | string)[];
}
/** Where the node's children go (a card's body, before its link), like `$slot` in the server view. */
export declare const SLOT: VNode;
/** Like PHP htmlspecialchars(ENT_QUOTES): the server views escape the same way. */
export declare const escape: (value: string) => string;
/** Attributes in order; null, undefined, false and '' are left out; true is a boolean attribute (open). */
export declare const h: (tag: string, attrs?: Record<string, string | number | boolean | null | undefined>, children?: readonly (VNode | string | null)[]) => VNode;
/** HTML of a VNode; `slot` is the HTML of the node's children, written where SLOT is. */
export declare const toHtml: (node: VNode | string, slot?: string) => string;
/** Where children are inserted: before `before` in `parent` (at the end of the root when there is no SLOT). */
export interface Slot {
    readonly parent: HTMLElement;
    readonly before: Node | null;
}
/** DOM of a VNode and the place of the node's children. */
export declare const toDom: (doc: Document, node: VNode) => {
    el: HTMLElement;
    slot: Slot;
};
