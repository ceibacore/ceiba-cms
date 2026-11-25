import type { TreeState } from '../tree/state';
import type { DataPreview, DataSourceSchema } from '../transport/data-source-types';
type Props = Record<string, unknown>;
/**
 * What the canvas shows of dynamic content (plan 07-C), as props to merge per node: the query block's state, the
 * template item filled with the preview's first item (bindings and {{ var.field }}), and what pagination and filters
 * draw. Like TreeExpander.php, but the template is drawn once (it stays selectable and editable).
 */
export declare const previewProps: (tree: TreeState, previews: Readonly<Record<string, DataPreview>>, schemas: Readonly<Record<string, DataSourceSchema>>, locale?: string) => Record<string, Props>;
export {};
