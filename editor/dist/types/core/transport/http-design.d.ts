import type { Transport } from './types';
type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;
/** Site design methods of the reference HTTP transport ({base}/design…, plan 04). */
export declare const designMethods: (base: string, request: Request) => Pick<Transport, "loadDesign" | "saveDesign" | "publishDesign" | "designUsages">;
export {};
