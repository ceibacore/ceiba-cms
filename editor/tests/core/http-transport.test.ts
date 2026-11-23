import { describe, expect, it } from 'vitest';
import { createHttpTransport } from '../../src/core';
import { sampleDocument } from '../support/documents';

type Call = { url: string; init: RequestInit };

const fakeFetch = (status: number, body: unknown, calls: Call[] = []): typeof fetch =>
  (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch;

describe('HTTP transport (module /api/builder/v1)', () => {
  it('saves with If-Match, the reason and the host headers, without storing them', async () => {
    const calls: Call[] = [];
    let token = 't-1';
    const transport = createHttpTransport({
      baseUrl: '/api/builder/v1/', headers: () => ({ 'X-CSRF-TOKEN': token }),
      fetch: fakeFetch(200, { success: true, data: { revision: 4, etag: '"4"' } }, calls),
    });
    expect(await transport.save({ ...sampleDocument(), revision: 4 }, 3, 'autosave')).toEqual({ revision: 4 });
    token = 't-2';
    await transport.save({ ...sampleDocument(), revision: 5 }, 4, 'edit');
    expect(calls.map((c) => [c.init.method, c.url])).toEqual([
      ['PUT', '/api/builder/v1/pages/page-1/draft?reason=autosave'], ['PUT', '/api/builder/v1/pages/page-1/draft'],
    ]);
    const headers = calls.map((c) => c.init.headers as Record<string, string>);
    expect(headers.map((h) => [h['If-Match'], h['X-CSRF-TOKEN']])).toEqual([['"3"', 't-1'], ['"4"', 't-2']]);
    expect(calls[0]?.init.credentials).toBe('same-origin');
  });

  it('maps API errors to stable codes and keeps only codes, field errors and the request id', async () => {
    const conflict = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(412, { success: false, error: {
      code: 'REVISION_CONFLICT', message: 'Draft revision has changed', fieldErrors: { currentRevision: '7' }, requestId: 'r-9',
    } }) });
    await expect(conflict.save(sampleDocument(), 3, 'edit')).rejects.toMatchObject({
      code: 'REVISION_CONFLICT', details: { currentRevision: '7', requestId: 'r-9', status: '412' },
    });
    for (const [status, code] of [[403, 'AUTHORIZATION_DENIED'], [422, 'VALIDATION_FAILED'], [500, 'SERVER']] as const) {
      const transport = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(status, { error: { code: 'X' } }) });
      await expect(transport.load('page-1')).rejects.toMatchObject({ code });
    }
    const html = createHttpTransport({ baseUrl: '/b', fetch: (async () => new Response('<html>', { status: 502 })) as typeof fetch });
    await expect(html.load('page-1')).rejects.toMatchObject({ code: 'SERVER', message: 'HTTP 502' });
  });

  it('reports network failures and malformed answers', async () => {
    const offline = createHttpTransport({ baseUrl: '/b', fetch: (async () => { throw new TypeError('Failed to fetch'); }) as typeof fetch });
    await expect(offline.load('page-1')).rejects.toMatchObject({ code: 'NETWORK' });
    const empty = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true }) });
    await expect(empty.listComponents()).rejects.toMatchObject({ code: 'SERVER' });
    const bad = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { data: { revision: 1, snapshot: { schemaVersion: 9 } } }) });
    await expect(bad.load('page-1')).rejects.toMatchObject({ code: 'INVALID_DOCUMENT' });
  });

  it('works without HTML rules and encodes page ids', async () => {
    const calls: Call[] = [];
    const transport = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { data: { revision: 1, snapshot: sampleDocument() } }, calls) });
    expect(await transport.listElementRules()).toEqual([]);
    await transport.load('a/b?c');
    expect(calls.map((c) => c.url)).toEqual(['/b/pages/a%2Fb%3Fc/draft']);
  });

  it('publishes with an idempotency key and reads status, capabilities and the server render', async () => {
    const calls: Call[] = [];
    const reply = (data: unknown) => createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true, data }, calls) });
    expect(await reply({ revision: 4, revisionId: 'r' }).publish?.('page-1', 4, 'key-1')).toEqual({ revision: 4 });
    expect(await reply({ revision: 5, publishedRevision: 4, hasUnpublishedChanges: true }).status?.('page-1'))
      .toEqual({ revision: 5, publishedRevision: 4, hasUnpublishedChanges: true });
    expect(await reply({ revision: 5, publishedRevision: null, hasUnpublishedChanges: true }).status?.('page-1'))
      .toMatchObject({ publishedRevision: null });
    expect(await reply({ effectivePermissions: ['pages.read'], features: { autosave: true } }).capabilities?.())
      .toEqual({ permissions: ['pages.read'], features: { autosave: true } });
    expect(await reply({ revision: 2, html: '<h1>x</h1>' }).render?.('page-1', 2)).toBe('<h1>x</h1>');
    expect(calls.map((c) => [c.init.method ?? 'GET', c.url])).toEqual([
      ['POST', '/b/pages/page-1/publish-revision'], ['GET', '/b/pages/page-1/status'], ['GET', '/b/pages/page-1/status'],
      ['GET', '/b/capabilities'], ['GET', '/b/pages/page-1/revisions/2/render'],
    ]);
    expect((calls[0]?.init.headers as Record<string, string>)['Idempotency-Key']).toBe('key-1');
    expect(calls[0]?.init.body).toBe('{"revision":4}');
  });

  it('maps the public content drift refusal of a publication', async () => {
    const transport = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(409, { error: { code: 'PUBLIC_CONTENT_DRIFT' } }) });
    await expect(transport.publish?.('page-1', 2, 'k')).rejects.toMatchObject({ code: 'PUBLIC_CONTENT_DRIFT' });
  });

  it('lists and saves templates and imports HTML through the server', async () => {
    const calls: Call[] = [];
    const reply = (data: unknown) => createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true, data }, calls) });
    const template = { id: 't1', name: 'Hero', category: 'general', nodes: [{ type: 'div', children: [] }] };
    expect(await reply({ templates: [template] }).listTemplates?.()).toEqual([template]);
    expect(await reply({ template }).saveTemplate?.({ name: 'Hero', category: 'general', nodes: [] })).toEqual(template);
    expect(await reply({ nodes: [{ type: 'p' }], warnings: ['w'] }).importHtml?.('<p>x</p>'))
      .toEqual({ nodes: [{ type: 'p' }], warnings: ['w'] });
    expect(calls.map((c) => [c.init.method ?? 'GET', c.url, c.init.body ?? null])).toEqual([
      ['GET', '/b/templates', null],
      ['POST', '/b/templates', '{"name":"Hero","category":"general","nodes":[]}'],
      ['POST', '/b/import-html', '{"html":"<p>x</p>"}'],
    ]);
  });
});

