import type { ComponentDescriptorDto, HtmlTagRuleDto } from '../catalogue/types';
import { parseDocument } from '../document/normalize';
import { EditorError } from '../errors';
import { errorFromResponse, networkError } from './errors';
import { designMethods } from './http-design';
import type { RawNode } from '../document/types';
import type { TemplateSummary, Transport } from './types';

export interface HttpTransportOptions {
  /** Prefix of the editor API, e.g. "/api/builder/v1" or "https://cms.test/api/builder/v1". */
  readonly baseUrl: string;
  /** HTML tag rules; the module serves them at /api/pagebuilder/rules. Without it only components are known. */
  readonly rulesUrl?: string;
  /** Host headers for each request (CSRF token…). Called per request, never stored by the editor. */
  readonly headers?: () => Record<string, string>;
  readonly fetch?: typeof fetch;
}

/** Reference transport for the module's own HTTP adapter (/api/builder/v1). */
export const createHttpTransport = (options: HttpTransportOptions): Transport => {
  const send = options.fetch ?? globalThis.fetch.bind(globalThis);
  const base = options.baseUrl.replace(/\/+$/, '');
  const page = (id: string): string => `${base}/pages/${encodeURIComponent(id)}`;

  const request = async (url: string, init: RequestInit = {}): Promise<Record<string, unknown>> => {
    let response: Response;
    try {
      response = await send(url, {
        ...init,
        credentials: 'same-origin',
        headers: { Accept: 'application/json', ...options.headers?.(), ...(init.headers as Record<string, string>) },
      });
    } catch (cause) {
      throw networkError(cause);
    }
    const body: unknown = await response.json().catch(() => null);
    if (!response.ok) throw errorFromResponse(response.status, body);
    const data = (body as { data?: unknown } | null)?.data;
    if (typeof data !== 'object' || data === null) {
      throw new EditorError('SERVER', 'Unexpected response', { status: String(response.status) });
    }
    return data as Record<string, unknown>;
  };

  return {
    ...designMethods(base, request),
    async load(pageId) {
      const data = await request(`${page(pageId)}/draft`);
      return { revision: Number(data.revision), document: parseDocument(data.snapshot) };
    },
    async save(document, baseRevision, reason) {
      const query = reason === 'autosave' ? '?reason=autosave' : '';
      const data = await request(`${page(document.documentId)}/draft${query}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'If-Match': `"${baseRevision}"` },
        body: JSON.stringify(document),
      });
      return { revision: Number(data.revision) };
    },
    async preview(pageId, revision) {
      const data = await request(`${page(pageId)}/revisions/${revision}`);
      return parseDocument(data.snapshot);
    },
    async listComponents() {
      const data = await request(`${base}/components`);
      return (data.components ?? []) as ComponentDescriptorDto[];
    },
    async capabilities() {
      const data = await request(`${base}/capabilities`);
      const permissions = Array.isArray(data.effectivePermissions) ? data.effectivePermissions.map(String) : [];
      return { permissions, features: (data.features ?? {}) as Record<string, boolean> };
    },
    async status(pageId) {
      const data = await request(`${page(pageId)}/status`);
      const published = data.publishedRevision;
      return {
        revision: Number(data.revision),
        publishedRevision: typeof published === 'number' ? published : null,
        hasUnpublishedChanges: data.hasUnpublishedChanges === true,
      };
    },
    async publish(pageId, revision, idempotencyKey) {
      const data = await request(`${page(pageId)}/publish-revision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({ revision }),
      });
      return { revision: Number(data.revision) };
    },
    async render(pageId, revision) {
      const data = await request(`${page(pageId)}/revisions/${revision}/render`);
      return { html: typeof data.html === 'string' ? data.html : '', css: typeof data.css === 'string' ? data.css : '' };
    },
    async listTemplates() {
      const data = await request(`${base}/templates`);
      return (Array.isArray(data.templates) ? data.templates : []) as TemplateSummary[];
    },
    async saveTemplate(template) {
      const data = await request(`${base}/templates`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(template),
      });
      return data.template as TemplateSummary;
    },
    async importHtml(html) {
      const data = await request(`${base}/import-html`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ html }),
      });
      return {
        nodes: (Array.isArray(data.nodes) ? data.nodes : []) as RawNode[],
        warnings: Array.isArray(data.warnings) ? data.warnings.map(String) : [],
      };
    },
    async listElementRules() {
      if (!options.rulesUrl) return [];
      const data = await request(options.rulesUrl);
      return Object.values((data.html_tags ?? {}) as Record<string, HtmlTagRuleDto>);
    },
  };
};
