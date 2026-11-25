/** Data sources of the site (plan 07-C), as the module's registry describes them (DataSourceDescriptor). */
export type DataFieldType = 'text' | 'richtext' | 'number' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'image' | 'url' | 'select' | 'relation' | 'id';

export interface DataField {
  readonly name: string;
  readonly type: DataFieldType;
  readonly label: string;
  readonly nullable: boolean;
  readonly searchable: boolean;
  readonly sortable: boolean;
  readonly operators: readonly string[];
  readonly options: readonly string[];
  readonly relation: string | null;
}

export interface DataSourceSummary {
  readonly id: string;
  readonly label: string;
  readonly capabilities: readonly string[];
}

export interface DataSourceSchema extends DataSourceSummary {
  readonly max_page_size: number;
  readonly slug_field: string | null;
  readonly fields: readonly DataField[];
}

/** What a query block would show to a visitor (the preview never uses the editor's permissions). */
export interface DataPreview {
  readonly state: 'results' | 'empty' | 'error';
  readonly items: readonly Record<string, unknown>[];
  readonly pagination: { readonly page: number; readonly page_size: number; readonly total: number | null; readonly pages: number | null; readonly has_more: boolean };
}

export interface DataSourceMethods {
  /** Optional (07-C): without them the editor offers no query blocks. */
  listDataSources?(): Promise<readonly DataSourceSummary[]>;
  dataSourceSchema?(id: string): Promise<DataSourceSchema>;
  dataSourceRecords?(id: string, search: string): Promise<readonly { slug: string; label: string }[]>;
  /** VALIDATION_FAILED (details.code: QUERY_FIELD, QUERY_OPERATOR…) for an invalid query. */
  previewQuery?(query: Record<string, unknown>, params?: Record<string, string>): Promise<DataPreview>;
}
