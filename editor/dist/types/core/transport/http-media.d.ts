import type { MediaMethods } from './media-types';
type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;
/** Media library methods of the reference HTTP transport ({base}/media…, plan 05-A). */
export declare const mediaMethods: (base: string, request: Request) => Required<MediaMethods>;
export {};
