import type { DesignDocument } from '../styles/types';
import type { DesignState, DesignUsage, Transport } from './types';

type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;

/** Site design methods of the reference HTTP transport ({base}/design…, plan 04). */
export const designMethods = (base: string, request: Request): Pick<Transport,
  'loadDesign' | 'saveDesign' | 'publishDesign' | 'designUsages'> => ({
  async loadDesign(): Promise<DesignState> {
    const data = await request(`${base}/design`);
    const published = data.publishedRevision;
    return {
      revision: Number(data.revision),
      publishedRevision: typeof published === 'number' ? published : null,
      design: data.design as DesignDocument,
    };
  },
  async saveDesign(design, baseRevision) {
    const data = await request(`${base}/design`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json', 'If-Match': `"${baseRevision}"` }, body: JSON.stringify(design),
    });
    return { revision: Number(data.revision) };
  },
  async publishDesign(revision) {
    const data = await request(`${base}/design/publish`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ revision }),
    });
    return { revision: Number(data.revision) };
  },
  async designUsages(kind, id) {
    const data = await request(`${base}/design/usages?${kind}=${encodeURIComponent(id)}`);
    return (Array.isArray(data.pages) ? data.pages : []) as DesignUsage[];
  },
});
