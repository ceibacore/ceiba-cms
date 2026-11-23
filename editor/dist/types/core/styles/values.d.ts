import type { PropertySpec } from './matrix';
/** Trims and collapses whitespace; null when the text is too long or carries anything that could escape CSS. */
export declare const normalize: (raw: string) => string | null;
/** Numbers as both compilers print them: integers as is, others with up to 4 decimals. */
export declare const formatNumber: (n: number) => string;
export declare const lengthPart: (part: string, auto?: boolean, negative?: boolean) => string | null;
export declare const length: (value: string, spec: Pick<PropertySpec, "parts" | "auto" | "negative">) => string | null;
export declare const color: (value: string) => string | null;
export declare const tracks: (value: string) => string | null;
export declare const inRange: (n: number, spec: Pick<PropertySpec, "min" | "max">) => string | null;
/** A literal value of a property (token references are handled by the caller). */
export declare const literal: (spec: PropertySpec, raw: string | number) => string | null;
/** Token type a property accepts in a {token} reference, or null. */
export declare const acceptedTokenType: (spec: PropertySpec) => string | null;
