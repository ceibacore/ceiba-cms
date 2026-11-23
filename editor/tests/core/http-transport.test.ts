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
});
