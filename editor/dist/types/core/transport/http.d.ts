import type { Transport } from './types';
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
export declare const createHttpTransport: (options: HttpTransportOptions) => Transport;
