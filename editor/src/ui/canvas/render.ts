import type { Catalogue, DesignDocument, NodeRecord, NodeStyles, ResolvedMedia, TreeState } from '../../core';
import { isAssetRef, styleClassNames } from '../../core';
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

type MediaMap = Readonly<Record<string, ResolvedMedia>>;

/** src and alt of an image prop: a library asset (resolved URL, per-use alt, else node alt, else library alt) or a URL. */
const image = (p: Record<string, unknown>, media: MediaMap): { src: string; alt: string } => {
  const ref = p.src;
  if (!isAssetRef(ref)) return { src: safeUrl(ref), alt: text(p.alt) };
  const found = media[ref.asset];
  const alt = ref.alt !== undefined ? ref.alt : text(p.alt) !== '' ? text(p.alt) : found?.alt ?? '';
  return { src: found ? safeUrl(found.url) : '', alt };
};

/** One node as an element (without children); null children slot means the element takes no children. */
const element = (doc: Document, node: NodeRecord, labels: CanvasLabels, known: boolean, media: MediaMap): HTMLElement => {
  const p = propsOf(node);
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
    case 'image': case 'img': {
      const { src, alt } = image(p, media);
      if (src === '') return placeholder(doc, labels.emptyImage);
      const img = make('img', node.type === 'image' ? 'img-fluid' : '') as HTMLImageElement;
      img.src = src;
      img.alt = alt;
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
