import type { PageDocument, RawNode } from '../../src/core';

export const node = (type: string, id?: string, extra: Partial<RawNode> = {}, children: RawNode[] = []): RawNode => ({
  ...(id ? { id } : {}), type, ...extra, children,
});

/** A page with layout, text, an unknown widget (from an extension) and an extension field on a node. */
export const sampleDocument = (): PageDocument => ({
  schemaVersion: 1,
  documentId: 'page-1',
  revision: 3,
  root: [
    node('container', 'c1', { props: { fluid: false }, 'x-analytics': { section: 'hero' } }, [
      node('h1', 'h', { props: { content: 'Hello' } }),
      node('p', 'p1', { props: { content: 'Intro' }, name: 'Intro' }),
      node('carousel-pro', 'w1', { props: { speed: 300 } }),
    ]),
    node('div', 'd1', {}, [node('button', 'b1', { props: { targetId: 'd1', text: 'Go' } })]),
  ],
  settings: { theme: 'light' },
  resources: ['media-1'],
});
