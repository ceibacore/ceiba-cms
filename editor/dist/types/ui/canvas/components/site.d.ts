import type { VNode } from './vnode';
type Props = Record<string, unknown>;
/**
 * Site header and footer components (plan 06 D-6), twin of their Bootstrap 5 views. The menu's links come from the
 * host on the public page; the canvas draws the same empty landmark and labels it (canvas/render.ts).
 */
export declare const SITE_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>>;
export {};
