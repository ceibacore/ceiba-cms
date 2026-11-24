import { describe, expect, it } from 'vitest';
import { createHttpTransport } from '../../src/core';

type Call = { url: string; init: RequestInit };

const fakeFetch = (status: number, body: unknown, calls: Call[] = []): typeof fetch =>
  (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch;

describe('HTTP site part methods (plan 06-C)', () => {
  it('send rules with If-Match, impact and preview queries, and publications with an Idempotency-Key', async () => {
    const calls: Call[] = [];
    const t = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true, data: { version: 3, revisions: { h: 'r' } } }, calls) });
    await t.listSiteParts!();
    expect(await t.saveSitePartRules!('h', { include: [{ type: 'site' }] }, 2)).toEqual({ version: 3 });
    await t.sitePartImpact!(['h']);
    await t.previewSitePart!('h', 4, 'p 1');
    await t.previewSitePart!('h', 4, null);
    expect(await t.publishSiteParts!([{ id: 'h', revision: 4, rulesVersion: 3 }], 'k-1')).toEqual({ h: 'r' });
    expect(calls.map((c) => [c.init.method ?? 'GET', c.url])).toEqual([
      ['GET', '/b/site-parts'], ['PUT', '/b/site-parts/h/rules'], ['POST', '/b/site-parts/impact'],
      ['GET', '/b/site-parts/h/preview?revision=4&page=p+1'], ['GET', '/b/site-parts/h/preview?revision=4'], ['POST', '/b/site-parts/publish'],
    ]);
    expect((calls[1]!.init.headers as Record<string, string>)['If-Match']).toBe('"2"');
    expect((calls[5]!.init.headers as Record<string, string>)['Idempotency-Key']).toBe('k-1');
    expect(JSON.parse(String(calls[2]!.init.body))).toEqual({ ids: ['h'], offset: 0, limit: 50 });
  });

  it('a tie answers SITE_PART_CONFLICT', async () => {
    const t = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(409, { success: false, error: { code: 'SITE_PART_CONFLICT' } }) });
    await expect(t.publishSiteParts!([{ id: 'h', revision: 1, rulesVersion: 1 }], 'k')).rejects.toMatchObject({ code: 'SITE_PART_CONFLICT' });
  });
});
