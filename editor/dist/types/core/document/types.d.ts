/**
 * Page document v1 as stored by ceiba-cms (schemas/page-document-v1.schema.json).
 * Nodes keep every field the editor does not know (additionalProperties: true).
 */
export interface RawNode {
    id?: string;
    _id?: string;
    type: string;
    name?: string | null;
    label?: string | null;
    props?: Record<string, unknown> | [];
    bindings?: Record<string, unknown> | null | [];
    loop?: Record<string, unknown> | null | [];
    condition?: unknown;
    children?: RawNode[];
    [extension: string]: unknown;
}
export interface PageDocument {
    schemaVersion: 1;
    documentId: string;
    revision: number;
    root: RawNode[];
    settings: Record<string, unknown>;
    resources: string[];
}
export declare const SCHEMA_VERSION = 1;
