import type { SitePartCatalog, SitePartImpact, SitePartMethods, SitePartPreview } from './site-part-types';

type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;

/** Site part methods of the reference HTTP transport ({base}/site-parts…, plan 06-C). */
export const sitePartMethods = (base: string, request: Request): Required<SitePartMethods> => {
  const json = (method: string, body: unknown, headers: Record<string, string> = {}): RequestInit =>
    ({ method, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
  return {
    async listSiteParts() {
      return (await request(`${base}/site-parts`)) as unknown as SitePartCatalog;
    },
    async saveSitePartRules(id, rules, version) {
      const data = await request(`${base}/site-parts/${encodeURIComponent(id)}/rules`, json('PUT', rules, { 'If-Match': `"${version}"` }));
      return { version: Number(data.version) };
    },
    async sitePartImpact(ids, offset = 0) {
      return (await request(`${base}/site-parts/impact`, json('POST', { ids, offset, limit: 50 }))) as unknown as SitePartImpact;
    },
    async previewSitePart(id, revision, pageId) {
      const query = new URLSearchParams({ revision: String(revision), ...(pageId ? { page: pageId } : {}) });
      return (await request(`${base}/site-parts/${encodeURIComponent(id)}/preview?${query}`)) as unknown as SitePartPreview;
    },
    async publishSiteParts(changes, key) {
      const data = await request(`${base}/site-parts/publish`, json('POST', { changes }, { 'Idempotency-Key': key }));
      return (data.revisions ?? {}) as Record<string, string>;
    },
  };
};
