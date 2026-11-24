import type { VNode } from './vnode';
/** Value rules of the Bootstrap5\Html helper (PHP), so the canvas draws what the server draws. */
export declare const phpTrim: (value: string) => string;
export declare const str: (value: unknown) => string;
export declare const text: (value: unknown) => string;
export declare const int: (value: unknown, fallback: number, min: number, max: number) => number;
export declare const oneOf: (value: unknown, allowed: readonly string[]) => string;
/** Text with its line breaks as <br>. */
export declare const lines: (value: unknown) => (VNode | string)[];
export declare const cls: (base: string, extra: unknown) => string;
export declare const url: (value: unknown) => string;
/** <img> of a resolved image slot, or null without a usable source (alt always written, "" = decorative). */
export declare const img: (item: Record<string, unknown>, slot: string, className: string, sizes?: string) => VNode | null;
export declare const backgroundImage: (value: unknown) => string;
