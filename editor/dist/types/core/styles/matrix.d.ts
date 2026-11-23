/**
 * Mirror of schemas/style-properties-v1.json (the source of truth, read as is by the PHP compiler).
 * tests/styles/matrix.test.ts fails when they differ.
 */
export interface PropertySpec {
    readonly name: string;
    readonly css: string;
    readonly kind: 'keyword' | 'number' | 'length' | 'tracks' | 'gridColumn' | 'token' | 'lineHeight' | 'color';
    readonly parts?: number;
    readonly auto?: boolean;
    readonly negative?: boolean;
    readonly min?: number;
    readonly max?: number;
    readonly tokenType?: string;
}
export declare const STYLE_MATRIX: {
    version: number;
    states: string[];
    tokenTypes: string[];
    keywords: Record<string, readonly string[]>;
    properties: readonly PropertySpec[];
    limits: {
        tokens: number;
        classes: number;
        declarations: number;
        valueLength: number;
        breakpoints: number;
        minWidth: number;
        magnitude: number;
    };
};
export declare const PROPERTY_BY_NAME: ReadonlyMap<string, PropertySpec>;
