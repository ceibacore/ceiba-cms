import type { VNode } from './vnode';
type Props = Record<string, unknown>;
/** Markup of the module's components, twin of Frameworks/Bootstrap5/views (fixtures/components holds both). */
export declare const COMPONENT_VIEWS: Readonly<Record<string, (p: Props) => VNode | null>>;
export {};
