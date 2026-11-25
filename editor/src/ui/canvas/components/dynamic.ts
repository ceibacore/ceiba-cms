import type { VNode } from './vnode';
import { h, SLOT } from './vnode';
import { cls, oneOf, str } from './values';

type Props = Record<string, unknown>;
type Link = { label?: unknown; href?: unknown; current?: unknown };

const nonEmpty = (value: unknown, fallback: string): string => (typeof value === 'string' && value !== '' ? value : fallback);
const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
/** <option value=""> keeps its empty value, like the literal markup of the server view. */
const emptyOption = (label: string): VNode => ({ tag: 'option', attrs: [['value', '']], children: [label] });

const pageItem = (href: string | null, text: string, current = false, aria: string | null = null): VNode => {
  const className = `page-item${href === null ? ' disabled' : ''}${current ? ' active' : ''}`;
  const inner = href === null || current
    ? h('span', { class: 'page-link', 'aria-current': current ? 'page' : null }, [text])
    : h('a', { class: 'page-link', href, 'aria-label': aria }, [text]);
  return h('li', { class: className }, [inner]);
};

/**
 * Dynamic content components (plan 07-B), twin of their Bootstrap 5 views. `_state`, `_pages` and `_filter` are
 * what the server's TreeExpander adds; on the canvas they come from the query preview (canvas/dynamic-preview.ts).
 */
export const DYNAMIC_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>> = {
  query: (p) => h('div', { class: cls('cms-query', p.class), 'data-cms-query': str(p.id), 'data-cms-state': p._state === undefined ? 'error' : str(p._state), 'aria-live': 'polite' }, [SLOT]),
  query_state(p) {
    const show = oneOf(p.show, ['empty', 'results', 'error']);
    return h('div', { class: cls(`cms-query-${show}`, p.class), role: show === 'error' ? 'status' : null }, [SLOT]);
  },
  pagination(p) {
    const pages = record(p._pages);
    if (pages === null) return null;
    const href = (value: unknown): string | null => (typeof value === 'string' ? value : null);
    const links = (Array.isArray(pages.links) ? pages.links : []) as Link[];
    return h('nav', { 'aria-label': nonEmpty(p.label, 'Pages') }, [h('ul', { class: cls('pagination', p.class) }, [
      pageItem(href(pages.prev), nonEmpty(p.prev, '«'), false, 'Previous'),
      ...links.map((l) => pageItem(String(l.href ?? ''), String(l.label ?? ''), l.current === true)),
      pageItem(href(pages.next), nonEmpty(p.next, '»'), false, 'Next'),
    ])]);
  },
  query_filter(p) {
    const filter = record(p._filter);
    if (filter === null) return null;
    const name = str(filter.name);
    const id = `cms-filter-${name.replace(/[^a-z0-9_]/g, '')}`;
    const value = String(filter.value ?? '');
    const hidden = Object.entries(record(filter.hidden) ?? {}).map(([k, v]) => h('input', { type: 'hidden', name: k, value: String(v) }));
    const options = (Array.isArray(filter.options) ? filter.options : []) as { value?: unknown; label?: unknown }[];
    const control = filter.kind === 'select'
      ? h('select', { id, name, class: 'form-select' }, [emptyOption(typeof p.all === 'string' ? p.all : '—'),
        ...options.map((o) => h('option', { value: String(o.value ?? ''), selected: String(o.value ?? '') === value }, [String(o.label ?? '')]))])
      : h('input', { id, type: 'search', name, class: 'form-control', value, placeholder: typeof p.placeholder === 'string' ? p.placeholder : null });
    return h('form', { class: cls('cms-query-filter d-flex gap-2 align-items-end', p.class), method: 'get' }, [
      ...hidden,
      h('div', {}, [h('label', { class: 'form-label', for: id }, [nonEmpty(p.label, name)]), control]),
      h('button', { type: 'submit', class: 'btn btn-outline-primary' }, [nonEmpty(p.button, 'OK')]),
    ]);
  },
};
