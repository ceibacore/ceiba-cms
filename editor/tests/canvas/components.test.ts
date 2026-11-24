import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import type { ResolvedMedia } from '../../src/core';
import { parseVideo } from '../../src/core';
import { COMPONENT_CSS, COMPONENT_VIEWS, resolveProps, toHtml } from '../../src/ui/canvas/components';

// Plan 05-B: the canvas draws, byte for byte, the markup of fixtures/components (the Bootstrap 5 views are held to
// the same files in tests/PageBuilder/Components/ComponentFixturesTest.php).
type FixtureNode = { type: string; props: Record<string, unknown>; children?: FixtureNode[] };
type FixtureMedia = Record<string, { url: string; width: number; height: number; alt: string; variants: { url: string; width: number }[] }>;
const root = fileURLToPath(new URL('../../../', import.meta.url));
const fixtures = readdirSync(`${root}fixtures/components`).filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`${root}fixtures/components/${f}`, 'utf8')) as {
    name: string; media: FixtureMedia; cases: { node: FixtureNode; html: string }[];
  });

const resolved = (media: FixtureMedia): Record<string, ResolvedMedia> => Object.fromEntries(Object.entries(media).map(([id, m]) => [id, {
  id, url: m.url, width: m.width, height: m.height, alt: m.alt,
  srcset: m.variants.length > 1 ? m.variants.map((v) => `${v.url} ${v.width}w`).join(', ') : '',
}]));

describe('component markup fixtures', () => {
  const cases = fixtures.flatMap((f) => f.cases.map((c, i) => [`${f.name} #${i + 1}`, f.media, c] as const));
  const render = (node: FixtureNode, media: Record<string, ResolvedMedia>): string => {
    const view = COMPONENT_VIEWS[node.type];
    expect(view, node.type).toBeDefined();
    const vnode = view!(resolveProps(node.props, media));
    return vnode === null ? '' : toHtml(vnode, (node.children ?? []).map((child) => render(child, media)).join(''));
  };
  it.each(cases)('%s', (_name, media, { node, html }) => {
    expect(render(node, resolved(media))).toBe(html);
  });
});

describe('video links (plan 05 D-2)', () => {
  it('accept YouTube and Vimeo forms only', () => {
    for (const url of ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://youtu.be/dQw4w9WgXcQ', 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
      'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', 'https://m.youtube.com/watch?feature=x&v=dQw4w9WgXcQ']) {
      expect(parseVideo(url)?.embed).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0');
    }
    expect(parseVideo('https://player.vimeo.com/video/76979871')?.watch).toBe('https://vimeo.com/76979871');
    for (const url of ['https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'javascript:alert(1)//youtu.be/dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXc', 'https://vimeo.com/abc', 'ftp://youtu.be/dQw4w9WgXcQ', 42]) {
      expect(parseVideo(url)).toBeNull();
    }
  });
});

describe('component CSS', () => {
  it('mirrors behaviors/components.css of the module', () => {
    const css = readFileSync(`${root}src/PageBuilder/Frameworks/Bootstrap5/behaviors/components.css`, 'utf8').trim();
    expect(COMPONENT_CSS).toBe(css);
  });
});
