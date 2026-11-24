/** A declaration value: a literal string/number or a reference to a design token. */
export type StyleValue = string | number | {
    readonly token: string;
} | {
    readonly asset: string;
};
export type Declarations = Readonly<Record<string, StyleValue>>;
/** Styles of a node or of a site class (plan 04, mobile-first). */
export interface StyleBlock {
    readonly base?: Declarations;
    /** Applied from the breakpoint's minWidth up, in ascending order. */
    readonly breakpoints?: Readonly<Record<string, Declarations>>;
    /** hover, focus-visible, active (applied on base). */
    readonly states?: Readonly<Record<string, Declarations>>;
}
export interface NodeStyles extends StyleBlock {
    /** Site classes, in the order they apply. */
    readonly classes?: readonly string[];
}
export interface Breakpoint {
    readonly id: string;
    readonly minWidth: number;
}
export interface DesignToken {
    readonly type: string;
    readonly value: string | {
        readonly token: string;
    };
    readonly name?: string;
}
export interface StyleClass {
    readonly name?: string;
    readonly styles: StyleBlock;
}
/** Site design document (tokens, breakpoints, classes). */
export interface DesignDocument {
    readonly schemaVersion?: number;
    readonly breakpoints: readonly Breakpoint[];
    readonly tokens: Readonly<Record<string, DesignToken>>;
    readonly classes: Readonly<Record<string, StyleClass>>;
}
export interface StyledNode {
    readonly id: string;
    readonly styles: NodeStyles;
}
export type StyleDiagnosticCode = 'INVALID_ID' | 'UNKNOWN_PROPERTY' | 'INVALID_VALUE' | 'UNKNOWN_TOKEN' | 'TOKEN_TYPE' | 'TOKEN_CYCLE' | 'UNKNOWN_BREAKPOINT' | 'UNKNOWN_STATE' | 'UNKNOWN_CLASS' | 'INVALID_BREAKPOINTS' | 'LIMIT' | 'UNKNOWN_ASSET';
export interface StyleDiagnostic {
    readonly path: string;
    readonly code: StyleDiagnosticCode;
}
export interface CompiledStyles {
    readonly css: string;
    readonly diagnostics: readonly StyleDiagnostic[];
}
/** Bootstrap 5 breakpoints, the default of a new site (plan 04 D-3). */
export declare const DEFAULT_BREAKPOINTS: readonly Breakpoint[];
