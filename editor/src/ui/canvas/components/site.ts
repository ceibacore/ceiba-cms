import type { VNode } from './vnode';
import { h } from './vnode';
import { cls, img, int, phpTrim, str, url } from './values';

type Props = Record<string, unknown>;

const textOr = (value: unknown, fallback: string): string => phpTrim(str(value)) || fallback;

/**
 * Site header and footer components (plan 06 D-6), twin of their Bootstrap 5 views. The menu's links come from the
 * host on the public page; the canvas draws the same empty landmark and labels it (canvas/render.ts).
 */
export const SITE_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>> = {
  site_title: (p) => h('a', { href: url(p.href ?? '/') || '/', class: cls('cms-site-title navbar-brand', p.class) }, [textOr(p.text, 'Site')]),
  site_logo(p) {
    const name = textOr(p.name, 'Home');
    const height = int(p.height, 40, 16, 200);
    const image = img({ image: p.image, alt: name, srcset: p.srcset }, 'image', 'd-block', `${height}px`);
    const logo = image === null ? name : { ...image, attrs: [['style', `height:${height}px;width:auto`] as const, ...image.attrs] };
    return h('a', { href: url(p.href ?? '/') || '/', class: cls('cms-site-logo navbar-brand', p.class) }, [logo]);
  },
  search_form(p) {
    const label = textOr(p.label, 'Search');
    return h('form', { class: cls('cms-search d-flex gap-2', p.class), role: 'search', action: url(p.action ?? '/buscar') || '/buscar', method: 'get' }, [
      h('label', { class: 'visually-hidden', for: 'cms-search-q' }, [label]),
      h('input', { id: 'cms-search-q', class: 'form-control', type: 'search', name: 'q', placeholder: phpTrim(str(p.placeholder)) }),
      h('button', { type: 'submit', class: 'btn btn-outline-primary' }, [textOr(p.button, label)]),
    ]);
  },
  site_menu(p) {
    const slug = typeof p.slug === 'string' && /^[a-z0-9_-]{1,100}$/i.test(p.slug) ? p.slug : '';
    return h('nav', { class: cls('cms-site-menu', p.class), 'aria-label': textOr(p.label, 'Main'), 'data-cms-menu': slug });
  },
};
