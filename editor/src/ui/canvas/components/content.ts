import { parseVideo } from '../../../core';
import type { VNode } from './vnode';
import { INTERACTIVE_VIEWS } from './interactive';
import { h, SLOT } from './vnode';
import { backgroundImage, cls, img, int, lines, oneOf, phpTrim, str, text, url } from './values';

type Props = Record<string, unknown>;

/** Markup of the module's components, twin of Frameworks/Bootstrap5/views (fixtures/components holds both). */
export const COMPONENT_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>> = {
  ...INTERACTIVE_VIEWS,
  image(p) {
    const classes = [p.fluid ?? true ? 'img-fluid' : '', p.rounded ? 'rounded' : '', phpTrim(str(p.class))].filter((c) => c !== '');
    const sizes = phpTrim(str(p.sizes));
    return img(p, 'src', classes.join(' '), sizes !== '' ? sizes : '100vw');
  },
  divider(p) {
    const style = oneOf(p.style, ['solid', 'dashed', 'dotted']);
    return h('hr', { class: cls(`cms-divider my-${int(p.spacing, 4, 0, 5)}`, p.class), style: style === 'solid' ? '' : `border-top-style:${style}` });
  },
  spacer: (p) => h('div', { class: cls('cms-spacer', p.class), style: `height:${int(p.size, 32, 4, 400)}px`, 'aria-hidden': 'true' }),
  list(p) {
    const items = (Array.isArray(p.items) ? p.items : []).filter((i): i is string => typeof i === 'string').slice(0, 100);
    const variant = oneOf(p.variant, ['default', 'unstyled', 'inline']);
    const className = cls(`cms-list${variant === 'default' ? '' : ` list-${variant}`}`, p.class);
    return h(p.ordered ? 'ol' : 'ul', { class: className },
      items.map((item) => h('li', { class: variant === 'inline' ? 'list-inline-item' : '' }, [item])));
  },
  quote(p) {
    const cite = phpTrim(str(p.cite));
    return h('figure', { class: cls('cms-quote', p.class) }, [
      h('blockquote', { class: 'blockquote' }, [h('p', {}, lines(p.text))]),
      cite === '' ? null : h('figcaption', { class: 'blockquote-footer' }, [cite]),
    ]);
  },
  card(p) {
    const title = phpTrim(str(p.title));
    const body = phpTrim(str(p.text));
    const label = phpTrim(str(p.linkLabel));
    const href = url(p.linkUrl);
    return h('div', { class: cls('card', p.class) }, [
      img(p, 'image', 'card-img-top', '(min-width: 768px) 33vw, 100vw'),
      h('div', { class: 'card-body' }, [
        title === '' ? null : h('h3', { class: 'card-title h5' }, [title]),
        body === '' ? null : h('p', { class: 'card-text' }, lines(body)),
        SLOT,
        label === '' || href === '' ? null : h('a', { href, class: 'btn btn-primary' }, [label]),
      ]),
    ]);
  },
  gallery(p) {
    const columns = Number(oneOf(text(p.columns ?? '3'), ['3', '2', '4']));
    const sizes = `(min-width: 768px) ${Math.floor(100 / columns)}vw, 50vw`;
    const items = (Array.isArray(p.items) ? p.items : []).filter((i): i is Props => typeof i === 'object' && i !== null && !Array.isArray(i)).slice(0, 60);
    return h('div', { class: cls('cms-gallery row g-3', p.class) }, items.map((item) => {
      const image = img(item, 'image', 'img-fluid rounded', sizes);
      const caption = phpTrim(str(item.caption));
      return image === null ? null : h('figure', { class: `col-6 col-md-${12 / columns} m-0` }, [
        image, caption === '' ? null : h('figcaption', { class: 'small text-muted mt-1' }, [caption]),
      ]);
    }));
  },
  video(p) {
    const video = parseVideo(p.url);
    if (!video) return null;
    const title = phpTrim(str(p.title)) || 'Video';
    const play = phpTrim(str(p.playLabel)) || 'Play video';
    return h('figure', { class: cls('cms-video', p.class) }, [
      h('div', { class: 'ratio ratio-16x9 cms-video-frame', 'data-cms-video': video.embed, 'data-cms-video-title': title,
        style: backgroundImage(p.poster) }, [
        h('button', { type: 'button', class: 'cms-video-play btn btn-dark' }, [play, h('span', { class: 'visually-hidden' }, [`: ${title}`])]),
      ]),
      h('figcaption', { class: 'small mt-1' }, [h('a', { href: video.watch, rel: 'noopener', target: '_blank' }, [title])]),
    ]);
  },
};
