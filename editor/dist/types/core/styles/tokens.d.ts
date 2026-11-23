import type { DesignToken, StyleDiagnostic } from './types';
export interface ResolvedToken {
    readonly type: string;
    /** var(--cms-t-…) reference used by declarations. */
    readonly ref: string;
}
/** CSS custom property of a token: dots become underscores (ids never contain "_", so names never collide). */
export declare const tokenVariable: (id: string) => string;
/** Literal value of a token of a type, normalized; null when invalid. */
export declare const tokenLiteral: (type: string, raw: string) => string | null;
/**
 * Validates the tokens of a design: ids, types, literal values, aliases ({token}), type agreement and cycles.
 * Returns the usable tokens and the :root rule declaring them (sorted by id).
 */
export declare const resolveTokens: (tokens: Readonly<Record<string, DesignToken>>, diagnostics: StyleDiagnostic[]) => {
    table: Map<string, ResolvedToken>;
    root: string;
};
