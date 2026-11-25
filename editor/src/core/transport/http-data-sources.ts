import type { DataPreview, DataSourceMethods, DataSourceSchema, DataSourceSummary } from './data-source-types';

type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;

/** Data source methods of the reference HTTP transport ({base}/data-sources…, plan 07-C). */
export const dataSourceMethods = (base: string, request: Request): Required<DataSourceMethods> => ({
  async listDataSources() {
    return ((await request(`${base}/data-sources`)).sources ?? []) as DataSourceSummary[];
  },
  async dataSourceSchema(id) {
    return (await request(`${base}/data-sources/${encodeURIComponent(id)}/schema`)).source as DataSourceSchema;
  },
  async dataSourceRecords(id, search) {
    const data = await request(`${base}/data-sources/${encodeURIComponent(id)}/records?${new URLSearchParams({ search })}`);
    return (data.records ?? []) as { slug: string; label: string }[];
  },
  async previewQuery(query, params = {}) {
    const data = await request(`${base}/data-sources/preview`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, params }) });
    return data as unknown as DataPreview;
  },
});
