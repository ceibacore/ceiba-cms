/**
 * Loop of a node (ceiba-cms LoopConfig: source "module:<slug>" or "host:<name>" from the data source registry,
 * variable, key, limit, offset, filters, sort) as the fields of the inspector, and back. Free URLs are not sources
 * (plan 07, D-3). Kept pure so it can be tested without a browser.
 */
export interface LoopForm {
    sourceType: 'none' | 'query' | 'module' | 'host';
    module: string;
    host: string;
    variable: string;
    key: string;
    limit: string;
    offset: string;
    sortColumn: string;
    sortDirection: 'ASC' | 'DESC';
    /** One "key=value" per line. */
    filters: string;
}
export declare const loopToForm: (loop: unknown) => LoopForm;
export type LoopResult = {
    loop: Record<string, unknown> | null;
} | {
    error: 'loop.source' | 'loop.number' | 'loop.variable';
};
/** The loop to store, null to remove it, or the error key of the first invalid field. */
export declare const formToLoop: (form: LoopForm) => LoopResult;
