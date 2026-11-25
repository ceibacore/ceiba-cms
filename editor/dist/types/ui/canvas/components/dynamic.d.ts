import type { VNode } from './vnode';
type Props = Record<string, unknown>;
/**
 * Dynamic content components (plan 07-B), twin of their Bootstrap 5 views. `_state`, `_pages` and `_filter` are
 * what the server's TreeExpander adds; on the canvas they come from the query preview (canvas/dynamic-preview.ts).
 */
export declare const DYNAMIC_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>>;
export {};
