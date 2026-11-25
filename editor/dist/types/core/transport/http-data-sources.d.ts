import type { DataSourceMethods } from './data-source-types';
type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;
/** Data source methods of the reference HTTP transport ({base}/data-sources…, plan 07-C). */
export declare const dataSourceMethods: (base: string, request: Request) => Required<DataSourceMethods>;
export {};
