import type { DataSourceSchema } from '../transport/data-source-types';
/**
 * Props of a `query` block (plan 07-B, QueryNodeConfig.php) as inspector fields, and back. Pure so it can be tested
 * without a browser; the server validates again (QueryValidator) and the preview shows its refusals.
 */
export interface QueryFilterRow {
    field: string;
    op: string;
    value: string;
}
export interface QuerySortRow {
    field: string;
    direction: 'asc' | 'desc';
}
export interface QueryUrlParamRow {
    param: string;
    target: 'search' | 'filter';
    field: string;
    op: string;
}
export interface QueryForm {
    id: string;
    source: string;
    pageSize: string;
    pagination: boolean;
    pageParam: string;
    filters: QueryFilterRow[];
    sort: QuerySortRow[];
    urlParams: QueryUrlParamRow[];
}
export type QueryFormError = 'query.id' | 'query.source' | 'query.pageSize' | 'query.field' | 'query.operator' | 'query.param';
export declare const queryToForm: (props: unknown) => QueryForm;
/** The props to store, or the first problem. With a schema, fields and operators are checked against it too. */
export declare const formToQuery: (form: QueryForm, schema: DataSourceSchema | null) => {
    props: Record<string, unknown>;
} | {
    error: QueryFormError;
    index?: number;
};
