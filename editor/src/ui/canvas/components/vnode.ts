/** Markup of a component as data: built into the canvas DOM, or serialized for the shared fixtures (plan 05-B). */
export interface VNode {
  readonly tag: string;
  /** true is a boolean attribute (open); '' is an empty value (alt=""). */
  readonly attrs: readonly (readonly [string, string | true])[];
  readonly children: readonly (VNode | string)[];
}

/** Where the node's children go (a card's body, before its link), like `$slot` in the server view. */
export const SLOT: VNode = { tag: '#slot', attrs: [], children: [] };

const VOID = new Set(['img', 'hr', 'br']);

/** Like PHP htmlspecialchars(ENT_QUOTES): the server views escape the same way. */
export const escape = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

/** Attributes in order; null, undefined, false and '' are left out; true is a boolean attribute (open). */
export const h = (tag: string, attrs: Record<string, string | number | boolean | null | undefined> = {},
  children: readonly (VNode | string | null)[] = []): VNode => ({
  tag,
  attrs: Object.entries(attrs).filter((e): e is [string, string | number | true] => e[1] !== null && e[1] !== undefined && e[1] !== false && e[1] !== '')
    .map(([k, v]) => [k, v === true ? true : String(v)] as const),
  children: children.filter((c): c is VNode | string => c !== null),
});

/** HTML of a VNode; `slot` is the HTML of the node's children, written where SLOT is. */
export const toHtml = (node: VNode | string, slot = ''): string => {
  if (typeof node === 'string') return escape(node);
  if (node === SLOT) return slot;
  const attrs = node.attrs.map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${escape(v)}"`)).join('');
  return VOID.has(node.tag) ? `<${node.tag}${attrs}>` : `<${node.tag}${attrs}>${node.children.map((c) => toHtml(c, slot)).join('')}</${node.tag}>`;
};

/** Where children are inserted: before `before` in `parent` (at the end of the root when there is no SLOT). */
export interface Slot {
  readonly parent: HTMLElement;
  readonly before: Node | null;
}

/** DOM of a VNode and the place of the node's children. */
export const toDom = (doc: Document, node: VNode): { el: HTMLElement; slot: Slot } => {
  let slot: Slot | null = null;
  const build = (n: VNode): HTMLElement => {
    const el = doc.createElement(n.tag);
    for (const [k, v] of n.attrs) el.setAttribute(k, v === true ? '' : v);
    for (const child of n.children) {
      if (child === SLOT) {
        const marker = doc.createComment('slot');
        el.append(marker);
        slot = { parent: el, before: marker };
      } else {
        el.append(typeof child === 'string' ? doc.createTextNode(child) : build(child));
      }
    }
    return el;
  };
  const el = build(node);
  return { el, slot: slot ?? { parent: el, before: null } };
};
