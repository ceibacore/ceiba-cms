import type { TransformName } from './bindings';
export declare const stripTags: (value: unknown) => string;
export declare const applyTransform: (name: TransformName, value: unknown, args: Readonly<Record<string, unknown>>, locale: string) => unknown;
