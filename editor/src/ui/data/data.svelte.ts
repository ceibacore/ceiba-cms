import type { DataPreview, DataSourceSchema, DataSourceSummary, TreeState, Transport } from '../../core';
import { EditorError } from '../../core';

/**
 * Data sources of the editor (plan 07-C): the catalogue, the schemas asked so far and the preview of each query
 * block (by its id), asked again only when the block's props change. The host reads with a visitor's permissions.
 */
export class DataState {
  sources = $state.raw<readonly DataSourceSummary[] | null>(null);
  schemas = $state.raw<Record<string, DataSourceSchema>>({});
  previews = $state.raw<Record<string, DataPreview>>({});
  /** Error code of the last preview of a block (VALIDATION_FAILED → the field code when the host gives it). */
  errors = $state.raw<Record<string, string>>({});
  private readonly asked = new Map<string, string>();
  private readonly askedSchemas = new Set<string>();

  constructor(private readonly transport: Transport) {}

  get available(): boolean {
    return typeof this.transport.listDataSources === 'function';
  }

  async loadSources(): Promise<void> {
    if (this.sources !== null || !this.transport.listDataSources) return;
    try {
      this.sources = await this.transport.listDataSources();
    } catch {
      this.sources = [];
    }
  }

  async schema(id: string): Promise<DataSourceSchema | null> {
    if (this.schemas[id]) return this.schemas[id]!;
    if (id === '' || this.askedSchemas.has(id) || !this.transport.dataSourceSchema) return null;
    this.askedSchemas.add(id);
    try {
      const schema = await this.transport.dataSourceSchema(id);
      this.schemas = { ...this.schemas, [id]: schema };
      return schema;
    } catch {
      this.askedSchemas.delete(id);
      return null;
    }
  }

  /** Previews every query block of the tree whose props changed since the last time (and their schemas). */
  ensure(tree: TreeState): void {
    if (!this.transport.previewQuery) return;
    for (const node of Object.values(tree.nodes)) {
      if (node.type !== 'query') continue;
      const props = (node.fields.props ?? {}) as Record<string, unknown>;
      const id = typeof props.id === 'string' ? props.id : '';
      const key = JSON.stringify(props);
      if (id === '' || typeof props.source !== 'string' || props.source === '' || this.asked.get(id) === key) continue;
      this.asked.set(id, key);
      void this.schema(props.source);
      void this.preview(id, props);
    }
  }

  private async preview(id: string, props: Record<string, unknown>): Promise<void> {
    try {
      const result = await this.transport.previewQuery!(props);
      this.previews = { ...this.previews, [id]: result };
      const { [id]: _, ...rest } = this.errors;
      this.errors = rest;
    } catch (error) {
      // details holds the field errors (path → QUERY_* code) next to requestId, apiCode and status.
      const details = error instanceof EditorError ? error.details : {};
      const fieldCode = Object.entries(details).find(([key]) => !['requestId', 'apiCode', 'status'].includes(key))?.[1];
      const code = fieldCode ?? details.apiCode ?? (error instanceof EditorError ? error.code : 'SERVER');
      this.errors = { ...this.errors, [id]: String(code) };
      this.previews = { ...this.previews, [id]: { state: 'error', items: [], pagination: { page: 1, page_size: 0, total: 0, pages: 0, has_more: false } } };
    }
  }
}
