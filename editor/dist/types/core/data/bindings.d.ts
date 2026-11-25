/**
 * Typed bindings of a node (plan 07, D-4; BindingResolver.php): `bindings: {prop: {from?, field, transform?, args?, fallback?}}`.
 */
export declare const TRANSFORMS: readonly ["date", "number", "currency", "upper", "lower", "truncate", "strip"];
export type TransformName = (typeof TRANSFORMS)[number];
export interface Binding {
    readonly from?: string;
    readonly field: string;
    readonly transform?: TransformName;
    readonly args?: Readonly<Record<string, string | number>>;
    readonly fallback?: string;
}
export declare const readBindings: (value: unknown) => Record<string, Binding>;
/** The bindings with one prop set (a binding) or removed (null); null when nothing is left. */
export declare const withBinding: (current: unknown, prop: string, binding: Binding | null) => Record<string, Binding> | null;
/** Props of a component a binding may fill: its text-like controls (never classes, ids or structure). */
export declare const bindableProps: (controls: Readonly<Record<string, unknown>>) => string[];
