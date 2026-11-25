import { describe, expect, it } from 'vitest';
import { createHttpTransport } from '../../src/core';

type Call = { url: string; init: RequestInit };

const fakeFetch = (status: number, body: unknown, calls: Call[] = []): typeof fetch =>
  (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
  }) as typeof fetch;

describe('HTTP data source methods (plan 07-C)', () => {
  it('list, describe, sample and preview through the builder API', async () => {
    const calls: Call[] = [];
    const data = { sources: [{ id: 'module:courses', label: 'Cursos', capabilities: [] }], source: { id: 'module:courses', fields: [] },
      records: [{ slug: 'php', label: 'PHP' }], state: 'results', items: [{ title: 'PHP' }] };
    const t = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(200, { success: true, data }, calls) });
    expect(await t.listDataSources!()).toEqual(data.sources);
    expect((await t.dataSourceSchema!('module:courses')).id).toBe('module:courses');
    expect(await t.dataSourceRecords!('module:courses', 'p h')).toEqual(data.records);
    expect((await t.previewQuery!({ id: 'q', source: 'module:courses' }, { q: 'php' })).items).toEqual([{ title: 'PHP' }]);
    expect(calls.map((c) => [c.init.method ?? 'GET', c.url])).toEqual([
      ['GET', '/b/data-sources'], ['GET', '/b/data-sources/module%3Acourses/schema'],
      ['GET', '/b/data-sources/module%3Acourses/records?search=p+h'], ['POST', '/b/data-sources/preview'],
    ]);
    expect(JSON.parse(String(calls[3]!.init.body))).toEqual({ query: { id: 'q', source: 'module:courses' }, params: { q: 'php' } });
  });

  it('turn refusals into editor errors with the query code', async () => {
    const t = createHttpTransport({ baseUrl: '/b', fetch: fakeFetch(422, { success: false, error: { code: 'VALIDATION_FAILED', message: 'x',
      fieldErrors: { 'filters.0.field': 'QUERY_FIELD' } } }) });
    await expect(t.previewQuery!({ id: 'q', source: 'module:courses' })).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });
});
