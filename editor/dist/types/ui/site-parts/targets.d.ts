import type { SitePartTarget } from '../../core';
export type TargetType = SitePartTarget['type'];
export declare const TARGET_TYPES: readonly TargetType[];
/** Targets that need a page: not offered for the 404 part. */
export declare const PAGE_TARGETS: readonly TargetType[];
/** A target of a new type, keeping what can be kept. */
export declare const targetOf: (type: TargetType) => SitePartTarget;
/** Comma-separated text as a clean list. */
export declare const list: (text: string) => string[];
