import type { VNode } from './vnode';
import { h, SLOT } from './vnode';
import { cls, int, phpTrim, str } from './values';

type Props = Record<string, unknown>;

const titleOr = (value: unknown, fallback: string): string => phpTrim(str(value)) || fallback;
const label = (p: Props, key: string, fallback: string): string => {
  const value = phpTrim(str(p[key]));
  return value === '' ? fallback : value.replace(/\|/g, '');
};

/**
 * Tabs, accordion and carousel (plan 05-C), twin of their Bootstrap 5 views. The canvas shows the markup without
 * JavaScript (every panel readable), which is what the behaviors/ scripts start from on the public page.
 */
export const INTERACTIVE_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>> = {
  tabs: (p) => h('div', { class: cls('cms-tabs', p.class), 'data-cms-tabs': '1', 'data-cms-label': phpTrim(str(p.label)) }, [SLOT]),
  tab_panel: (p) => h('section', { class: cls('cms-tab-panel', p.class) }, [h('h3', { class: 'cms-tab-title' }, [titleOr(p.title, 'Tab')]), SLOT]),
  disclosures: (p) => h('div', { class: cls('cms-accordion', p.class), 'data-cms-single': (p.single ?? true) ? '1' : '' }, [SLOT]),
  disclosure: (p) => h('details', { class: cls('cms-accordion-item', p.class), open: Boolean(p.open) && p.open !== '0' }, [
    h('summary', { class: 'cms-accordion-title' }, [titleOr(p.title, 'Item')]),
    h('div', { class: 'cms-accordion-body' }, [SLOT]),
  ]),
  slideshow(p) {
    const interval = p.autoplay && p.autoplay !== '0' ? int(p.interval, 6, 3, 15) * 1000 : 0;
    const labels = [label(p, 'previousLabel', 'Previous'), label(p, 'nextLabel', 'Next'), label(p, 'pauseLabel', 'Pause'), label(p, 'playLabel', 'Play')];
    return h('div', { class: cls('cms-carousel', p.class), role: 'region', 'aria-label': label(p, 'label', 'Carousel'),
      'data-cms-carousel': String(interval), 'data-cms-labels': labels.join('|') }, [h('div', { class: 'cms-carousel-track' }, [SLOT])]);
  },
  slide: (p) => h('div', { class: cls('cms-carousel-slide', p.class) }, [SLOT]),
};
