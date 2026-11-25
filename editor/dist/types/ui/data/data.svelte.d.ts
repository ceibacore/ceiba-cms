import type { DataPreview, DataSourceSchema, DataSourceSummary, TreeState, Transport } from '../../core';
/**
 * Data sources of the editor (plan 07-C): the catalogue, the schemas asked so far and the preview of each query
 * block (by its id), asked again only when the block's props change. The host reads with a visitor's permissions.
 */
export declare class DataState {
    private readonly transport;
    sources: readonly DataSourceSummary[] | null;
    schemas: Record<string, DataSourceSchema>;
    previews: Record<string, DataPreview>;
    /** Error code of the last preview of a block (VALIDATION_FAILED → the field code when the host gives it). */
    errors: Record<string, string>;
    private readonly asked;
    private readonly askedSchemas;
    constructor(transport: Transport);
    get available(): boolean;
    loadSources(): Promise<void>;
    schema(id: string): Promise<DataSourceSchema | null>;
    /** Previews every query block of the tree whose props changed since the last time (and their schemas). */
    ensure(tree: TreeState): void;
    private preview;
}
