import type { SitePartMethods } from './site-part-types';
type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;
/** Site part methods of the reference HTTP transport ({base}/site-parts…, plan 06-C). */
export declare const sitePartMethods: (base: string, request: Request) => Required<SitePartMethods>;
export {};
