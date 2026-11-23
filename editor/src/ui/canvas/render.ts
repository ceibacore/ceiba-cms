import type { Catalogue, NodeRecord, TreeState } from '../../core';
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
}

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
const element = (doc: Document, node: NodeRecord, labels: CanvasLabels, known: boolean): HTMLElement => {
  const p = propsOf(node);
  const make = (tag: string, className = ''): HTMLElement => {
    const el = doc.createElement(tag);
    const classes = `${className} ${safeClass(p.class)}`.trim();
    if (classes) el.className = classes;
    return el;
  };
  switch (node.type) {
    case 'container': return make('div', p.fluid ? 'container-fluid' : 'container');
    case 'row': return make('div', `row g-${safeClass(text(p.gutter)) || '3'}`);
    case 'col': return make('div', [p.xs ? `col-${Number(p.xs)}` : 'col', p.md ? `col-md-${Number(p.md)}` : ''].join(' '));
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
    case 'image': case 'img': {
      const src = safeUrl(p.src);
      if (src === '') return placeholder(doc, labels.emptyImage);
      const img = make('img', 'img-fluid') as HTMLImageElement;
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
  if (node.type === 'img') {
    (el as HTMLImageElement).src = safeUrl(p.src);
    (el as HTMLImageElement).alt = text(p.alt);
  }
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
): void => {
  const build = (id: string): HTMLElement | null => {
    const node = tree.nodes[id];
    if (!node) return null;
    const el = element(doc, node, labels, catalogue.has(node.type));
    el.dataset.ceibaId = id;
    if (id === selection) el.dataset.ceibaSelected = '';
    if (isMultiline(node.type)) el.dataset.ceibaMultiline = '';
    if (el.className !== 'ceiba-placeholder' && el.tagName !== 'IMG') {
      for (const child of node.children) {
        const built = build(child);
        if (built) el.append(built);
      }
    }
    return el;
  };
  const nodes = tree.rootIds.map(build).filter((el): el is HTMLElement => el !== null);
  doc.body.replaceChildren(...nodes);
};
