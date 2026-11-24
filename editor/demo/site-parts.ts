import { EditorError } from '../src/core';
import type { SitePartImpact, SitePartRules, SitePartSummary } from '../src/core';

const PAGES = [{ id: 'home', path: '/', layoutId: null, isHome: true }, { id: 'courses', path: '/cursos', layoutId: null, isHome: false },
  { id: 'blog', path: '/blog', layoutId: null, isHome: false }];

const applies = (rules: SitePartRules, page: (typeof PAGES)[number]): boolean => rules.include.some((t) =>
  t.type === 'site' || (t.type === 'home' && page.isHome) || (t.type === 'pages' && t.ids.includes(page.id))
  || (t.type === 'path_prefix' && (page.path === t.value || page.path.startsWith(`${t.value}/`))));

/** In-browser stand-in for the site parts API (plan 06-C): one other published header to tie with. */
export class SitePartsStore {
  readonly parts: SitePartSummary[] = [
    { id: 'other-header', kind: 'header', name: 'Other header', status: 'published', rules: { include: [{ type: 'pages', ids: ['blog'] }] },
      publishedRules: { include: [{ type: 'pages', ids: ['blog'] }] }, version: 1 },
  ];
  published: string[] = [];

  constructor(id: string) {
    this.parts.unshift({ id, kind: 'header', name: 'Main header', status: 'draft', rules: { include: [{ type: 'site' }] }, publishedRules: null, version: 1 });
  }

  catalog() {
    return { parts: structuredClone(this.parts), routes: { portal: 'Student portal' }, pages: PAGES };
  }

  save(id: string, rules: SitePartRules, version: number): { version: number } {
    const part = this.find(id);
    if (part.version !== version) throw new EditorError('REVISION_CONFLICT', 'stale', { currentRevision: String(part.version) });
    const bad = rules.include.findIndex((t) => t.type === 'path_prefix' && !t.value.startsWith('/'));
    if (bad >= 0) throw new EditorError('VALIDATION_FAILED', 'invalid', { [`include.${bad}.value`]: 'INVALID_VALUE', apiCode: 'VALIDATION_FAILED' });
    Object.assign(part, { rules: structuredClone(rules), version: version + 1 });
    return { version: part.version };
  }

  /** Same kind, same priority, both apply to a page with the same kind of match: a tie (rough stand-in). */
  impact(ids: readonly string[]): SitePartImpact {
    const proposed = this.parts.map((p) => ({ ...p, rules: ids.includes(p.id) ? p.rules : p.publishedRules })).filter((p) => p.rules);
    const conflicts = PAGES.flatMap((page) => {
      const top = proposed.filter((p) => applies(p.rules!, page)).map((p) => ({ p, score: p.rules!.include.some((t) => t.type === 'pages') ? 2 : 1 }));
      const best = Math.max(...top.map((x) => x.score), 0);
      const tied = top.filter((x) => x.score === best && (x.p.rules!.priority ?? 0) === Math.max(...top.map((y) => y.p.rules!.priority ?? 0)));
      return tied.length > 1 ? [{ context: { path: page.path }, parts: { header: tied.map((x) => x.p.id) } }] : [];
    });
    return { total: PAGES.length, changes: PAGES.map((page) => ({ context: { path: page.path }, before: { parts: { header: null } },
      after: { parts: { header: ids[0] ?? null } } })), conflicts };
  }

  publish(ids: readonly string[]): void {
    if (this.impact(ids).conflicts.length > 0) throw new EditorError('SITE_PART_CONFLICT', 'tie', { apiCode: 'SITE_PART_CONFLICT' });
    for (const id of ids) Object.assign(this.find(id), { status: 'published', publishedRules: structuredClone(this.find(id).rules) });
    this.published.push(...ids);
  }

  applies(id: string, pageId: string | null): boolean {
    const page = PAGES.find((p) => p.id === pageId);
    return page !== undefined && applies(this.find(id).rules, page);
  }

  private find(id: string): SitePartSummary & { rules: SitePartRules } {
    const part = this.parts.find((p) => p.id === id);
    if (!part) throw new EditorError('NODE_NOT_FOUND', 'gone');
    return part as SitePartSummary & { rules: SitePartRules };
  }
}
