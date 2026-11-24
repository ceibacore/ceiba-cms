import { describe, expect, it } from 'vitest';
import { collectAssetIds, createHttpTransport, isAssetRef } from '../../src/core';
import type { TreeState } from '../../src/core';

type Call = { url: string; init: RequestInit };

const fakeFetch = (status: number, body: unknown, calls: Call[] = []): typeof fetch =>
  (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch;

describe('asset references (plan 05 D-1)', () => {
  it('are {asset} with an optional per-use alt and a safe id, like MediaReferences.php', () => {
    expect(isAssetRef({ asset: 'm1' })).toBe(true);
    expect(isAssetRef({ asset: 'm1', alt: '' })).toBe(true);
    expect(isAssetRef({ asset: '../x' })).toBe(false);
    expect(isAssetRef({ asset: 'm1', url: 'x' })).toBe(false);
    expect(isAssetRef({ asset: 7 })).toBe(false);
    expect(isAssetRef([{ asset: 'm1' }])).toBe(false);
  });

  it('are collected from props, styles and the design classes, once each', () => {
    const tree = { rootIds: ['a'], nodes: {
      a: { id: 'a', type: 'image', parentId: null, children: ['b'], fields: { props: { src: { asset: 'm1' } } } },
      b: { id: 'b', type: 'section', parentId: 'a', children: [], fields: {
        styles: { breakpoints: { md: { backgroundImage: { asset: 'm2' } } } }, props: { items: [{ image: { asset: 'm1' } }] } } },
    } } as unknown as TreeState;
    const design = { breakpoints: [], tokens: {}, classes: { hero: { styles: { base: { backgroundImage: { asset: 'm3' } } } } } };
    expect(collectAssetIds(tree, design)).toEqual(['m1', 'm2', 'm3']);
  });
});

describe('HTTP media methods', () => {
  it('list, resolve, upload as multipart with the chosen options, describe and delete', async () => {
    const calls: Call[] = [];
    const transport = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true, data: { media: { m1: { id: 'm1' } } } }, calls) });
    await transport.listMedia!('sea & sky', 2);
    expect(await transport.resolveMedia!(['m1', 'm 2'])).toEqual({ m1: { id: 'm1' } });
    expect(await transport.resolveMedia!([])).toEqual({});
    await transport.uploadMedia!(new File(['x'], 'a.png', { type: 'image/png' }), { alt: 'A', widths: [480, 960], optimize: true, webp: false });
    await transport.describeMedia!('m1', 'New');
    await transport.deleteMedia!('m1');
    expect(calls.map((c) => [c.init.method ?? 'GET', c.url])).toEqual([
      ['GET', '/b/media?search=sea+%26+sky&page=2'], ['GET', '/b/media/resolve?ids=m1,m%202'],
      ['POST', '/b/media'], ['PATCH', '/b/media/m1'], ['DELETE', '/b/media/m1'],
    ]);
    const form = calls[2]!.init.body as FormData;
    expect([form.get('alt'), form.get('widths'), form.get('optimize'), form.get('webp')]).toEqual(['A', '480,960', '1', '0']);
    expect((form.get('file') as File).name).toBe('a.png');
    expect(calls[3]!.init.body).toBe('{"alt":"New"}');
  });

  it('a file in use is refused with MEDIA_IN_USE', async () => {
    const transport = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(409, { success: false, error: { code: 'MEDIA_IN_USE' } }) });
    await expect(transport.deleteMedia!('m1')).rejects.toMatchObject({ code: 'MEDIA_IN_USE' });
  });
});
