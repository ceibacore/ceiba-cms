import type { Catalogue, DesignDocument, NodeRecord, NodeStyles, TreeState } from '../../core';
import { styleClassNames } from '../../core';
import type { MediaMap, Slot } from './components';
import { COMPONENT_VIEWS, resolveProps, toDom } from './components';
import { isMultiline } from './inline-edit';
import { safeClass, safeUrl, text } from './sanitize';

/** HTML tags the canvas may create. Anything else (script, iframe, form, object…) becomes a placeholder. */
const SAFE_TAGS = new Set(['div', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside', 'h1', 'h2', 'h3',
  'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'small', 'a', 'ul', 'ol', 'li', 'blockquote', 'figure', 'figcaption',
  'code', 'pre', 'hr', 'br', 'img', 'label']);

export interface CanvasLabels {
  readonly unknown: (type: string) => string;
  readonly html: string;
  readonly emptyImage: string;
  /** A component with nothing to draw yet (no items, a link that is not a video…). */
  readonly empty: (type: string) => string;
  /** The site menu's links come from the host; the canvas names the menu instead. */
  readonly menu: (slug: string) => string;
}

/** Where each element's children go (a card's body); the element itself when absent. */
const slots = new WeakMap<HTMLElement, Slot>();

const propsOf = (node: NodeRecord): Record<string, unknown> => {
  const props = node.fields.props;
  return typeof props === 'object' && props !== null && !Array.isArray(props) ? (props as Record<string, unknown>) : {};
};

const placeholder = (doc: Document, label: string): HTMLElement => {
  const box = doc.createElement('div');
  box.className = 'ceiba-placeholder';
  box.textContent = label;
  return box;
};

/** One node as an element (without children); null children slot means the element takes no children. */
const element = (doc: Document, node: NodeRecord, labels: CanvasLabels, known: boolean, media: MediaMap): HTMLElement => {
  const p = resolveProps(propsOf(node), media);
  const view = known ? COMPONENT_VIEWS[node.type] : undefined;
  if (view) {
    // Same markup as the server view (fixtures/components); placeholders only where the server draws nothing.
    const vnode = view(p);
    if (vnode === null) return placeholder(doc, node.type === 'image' ? labels.emptyImage : labels.empty(node.type));
    const { el, slot } = toDom(doc, vnode);
    if (slot.parent !== el || slot.before !== null) slots.set(el, slot);
    // Editing only: every accordion item stays open so its content can be selected (the page keeps `open` as set).
    if (el.tagName === 'DETAILS') el.setAttribute('open', '');
    if (el.classList.contains('cms-site-menu')) el.textContent = labels.menu(el.dataset.cmsMenu ?? '');
    return el;
  }
  const make = (tag: string, className = ''): HTMLElement => {
    const el = doc.createElement(tag);
    const classes = `${className} ${safeClass(p.class)}`.trim();
    if (classes) el.className = classes;
    return el;
  };
  switch (node.type) {
    case 'container': return make('div', p.fluid ? 'container-fluid' : 'container');
    // Same classes as the server views (Frameworks/Bootstrap5/views/row.php and col.php).
    case 'row': {
      const gutter = safeClass(text(p.gutter));
      return make('div', `row ${/^[0-5]$/.test(gutter) ? `g-${gutter}` : gutter || 'g-0'}`);
    }
    case 'col': {
      const sizes = ['sm', 'md', 'lg', 'xl'].map((bp) => (Number(p[bp]) > 0 ? `col-${bp}-${Number(p[bp])}` : ''));
      const xs = p.xs === undefined ? 12 : Number(p.xs);
      return make('div', [xs > 0 ? `col-${xs}` : 'col', ...sizes].join(' ').replace(/\s+/g, ' ').trim());
    }
    case 'heading': {
      const level = Math.min(6, Math.max(1, Number(p.level) || 2));
      const el = make(`h${level}`);
      el.textContent = text(p.text);
      return el;
    }
    case 'text': {
      const el = make('p');
      el.textContent = text(p.content);
      return el;
    }
    case 'img': {
      const src = safeUrl(p.src);
      if (src === '') return placeholder(doc, labels.emptyImage);
      const img = make('img') as HTMLImageElement;
      img.src = src;
      img.alt = text(p.alt);
      return img;
    }
    case 'button': {
      const a = make('a', 'btn btn-primary') as HTMLAnchorElement;
      a.href = safeUrl(p.url) || '#';
      a.textContent = text(p.label);
      return a;
    }
    case 'html': return placeholder(doc, labels.html);
  }
  if (!known || !SAFE_TAGS.has(node.type)) return placeholder(doc, labels.unknown(node.type));
  const el = make(node.type);
  if (node.type === 'a') (el as HTMLAnchorElement).href = safeUrl(p.href) || '#';
  if (p.content !== undefined) el.append(doc.createTextNode(text(p.content)));
  return el;
};

/** Renders the whole tree into the body of the canvas document (full re-render; pages hold ≤ 500 nodes). */
export const renderCanvas = (
  doc: Document,
  tree: TreeState,
  catalogue: Catalogue,
  selection: string | null,
  labels: CanvasLabels,
  design?: DesignDocument,
  media: MediaMap = {},
): void => {
  const build = (id: string): HTMLElement | null => {
    const node = tree.nodes[id];
    if (!node) return null;
    const el = element(doc, node, labels, catalogue.has(node.type), media);
    el.dataset.ceibaId = id;
    const styles = node.fields.styles;
    if (design && typeof styles === 'object' && styles !== null && !Array.isArray(styles)) {
      el.classList.add(...styleClassNames(id, styles as NodeStyles, design));
    }
    if (id === selection) el.dataset.ceibaSelected = '';
    if (isMultiline(node.type)) el.dataset.ceibaMultiline = '';
    if (el.className !== 'ceiba-placeholder' && !['IMG', 'HR'].includes(el.tagName)) {
      const slot = slots.get(el) ?? { parent: el, before: null };
      for (const child of node.children) {
        const built = build(child);
        if (built) slot.parent.insertBefore(built, slot.before);
      }
    }
    return el;
  };
  const nodes = tree.rootIds.map(build).filter((el): el is HTMLElement => el !== null);
  doc.body.replaceChildren(...nodes);
};
