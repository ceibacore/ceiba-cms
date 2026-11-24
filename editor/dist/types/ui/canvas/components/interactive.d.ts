import type { VNode } from './vnode';
type Props = Record<string, unknown>;
/**
 * Tabs, accordion and carousel (plan 05-C), twin of their Bootstrap 5 views. The canvas shows the markup without
 * JavaScript (every panel readable), which is what the behaviors/ scripts start from on the public page.
 */
export declare const INTERACTIVE_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>>;
export {};
