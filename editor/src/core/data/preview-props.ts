import type { TreeState } from '../tree/state';
import type { DataPreview, DataSourceSchema } from '../transport/data-source-types';
import { readBindings } from './bindings';
import { applyTransform, stripTags } from './transforms';

type Props = Record<string, unknown>;
const record = (v: unknown): Props => (typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Props) : {});
const URL_PROPS = new Set(['href', 'src', 'url', 'link', 'image_url']);
const safeUrl = (v: string): string | null => (/^(\/(?!\/)|\.\.?\/|\?|#)/.test(v) || /^(https?|mailto|tel):/i.test(v) ? v : null);

/**
 * What the canvas shows of dynamic content (plan 07-C), as props to merge per node: the query block's state, the
 * template item filled with the preview's first item (bindings and {{ var.field }}), and what pagination and filters
 * draw. Like TreeExpander.php, but the template is drawn once (it stays selectable and editable).
 */
export const previewProps = (tree: TreeState, previews: Readonly<Record<string, DataPreview>>, schemas: Readonly<Record<string, DataSourceSchema>>,
  locale = 'es'): Record<string, Props> => {
  const out: Record<string, Props> = {};
  const walk = (id: string, query: Props | null, vars: Record<string, unknown>, nearestVar: string | null): void => {
    const node = tree.nodes[id];
    if (!node) return;
    const props = record(node.fields.props);
    let scope = query;
    if (node.type === 'query') {
      scope = props;
      out[id] = { _state: previews[String(props.id ?? '')]?.state ?? 'results' };
    }
    const named = (): Props | null => (typeof props.query === 'string' && props.query !== '' ? findQuery(tree, props.query) : scope);
    const preview = (q: Props | null) => (q ? previews[String(q.id ?? '')] : undefined);
    if (node.type === 'pagination') {
      const q = named();
      if (q?.pagination === true) out[id] = { _pages: pages(preview(q)) };
    } else if (node.type === 'query_filter') {
      const q = named();
      const filter = q ? filterOf(q, String(props.param ?? ''), String(props.kind ?? 'search'), schemas[String(q.source ?? '')]) : null;
      if (filter) out[id] = { _filter: filter };
    }
    let inner = vars;
    let innerVar = nearestVar;
    const loop = record(node.fields.loop);
    if ('query' in loop) {
      const q = loop.query === '' || loop.query === null ? scope : findQuery(tree, String(loop.query));
      const variable = typeof loop.variable === 'string' && /^[A-Za-z_]\w{0,40}$/.test(loop.variable) ? loop.variable : 'item';
      const first = preview(q)?.items[0];
      if (first) {
        inner = { ...vars, [variable]: first, loop: { index: 1, first: true, last: (preview(q)?.items.length ?? 1) === 1 } };
        innerVar = variable;
      }
    }
    if (inner !== vars || Object.keys(inner).length > 0) {
      const bound = boundProps(node.type, props, node.fields.bindings, inner, innerVar, locale);
      if (Object.keys(bound).length > 0) out[id] = { ...(out[id] ?? {}), ...bound };
    }
    for (const child of node.children) walk(child, scope, inner, innerVar);
  };
  for (const id of tree.rootIds) walk(id, null, {}, null);
  return out;
};

const findQuery = (tree: TreeState, id: string): Props | null => {
  for (const node of Object.values(tree.nodes)) {
    if (node.type === 'query' && record(node.fields.props).id === id) return record(node.fields.props);
  }
  return null;
};

const boundProps = (type: string, props: Props, bindings: unknown, vars: Record<string, unknown>, nearest: string | null, locale: string): Props => {
  const out: Props = {};
  for (const [prop, b] of Object.entries(readBindings(bindings))) {
    const rec = record(vars[b.from ?? nearest ?? '']);
    let value = rec[b.field];
    if (b.transform) value = applyTransform(b.transform, value, b.args ?? {}, locale);
    const fallback = b.fallback ?? '';
    out[prop] = value === null || value === undefined || value === '' ? fallback
      : URL_PROPS.has(prop) ? safeUrl(String(value)) ?? fallback
      : type === 'html' && prop === 'content' ? String(value) : String(value).includes('<') ? stripTags(value) : String(value);
  }
  for (const [key, value] of Object.entries(props)) {
    if (key in out || typeof value !== 'string' || !value.includes('{{')) continue;
    out[key] = value.replace(/\{\{\s*([A-Za-z_]\w*)((?:\.\w+){0,3})\s*\}\}/g, (match, name: string, path: string) => {
      if (!(name in vars)) return match;
      let v: unknown = vars[name];
      for (const part of path.split('.').filter(Boolean)) v = record(v)[part];
      return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ? String(v) : '';
    });
  }
  return out;
};

const pages = (p: DataPreview | undefined): Props => {
  const total = p?.pagination.pages ?? 1;
  const links = Array.from({ length: Math.min(total ?? 1, 5) }, (_, i) => ({ label: String(i + 1), href: i === 0 ? '?' : `?page=${i + 1}`, current: i === 0 }));
  return { current: 1, pages: total, prev: null, next: p?.pagination.has_more ? '?page=2' : null, links };
};

const filterOf = (query: Props, param: string, kind: string, schema: DataSourceSchema | undefined): Props | null => {
  const declared = (Array.isArray(query.url_params) ? query.url_params : []).map(record).find((u) => u.param === param);
  if (!declared) return null;
  const options = declared.target === 'filter' ? (schema?.fields.find((f) => f.name === declared.field)?.options ?? []).map((o) => ({ value: o, label: o })) : [];
  return { name: param, kind: kind === 'select' && options.length > 0 ? 'select' : 'search', value: '', options, hidden: {} };
};
