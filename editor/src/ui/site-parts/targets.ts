import type { SitePartTarget } from '../../core';

export type TargetType = SitePartTarget['type'];

export const TARGET_TYPES: readonly TargetType[] = ['site', 'home', 'pages', 'path_prefix', 'layouts', 'routes', 'sources'];
/** Targets that need a page: not offered for the 404 part. */
export const PAGE_TARGETS: readonly TargetType[] = ['home', 'pages', 'layouts'];

/** A target of a new type, keeping what can be kept. */
export const targetOf = (type: TargetType): SitePartTarget => {
  switch (type) {
    case 'pages': case 'layouts': case 'sources': return { type, ids: [] };
    case 'routes': return { type, names: [] };
    case 'path_prefix': return { type, value: '/' };
    default: return { type };
  }
};

/** Comma-separated text as a clean list. */
export const list = (text: string): string[] => text.split(',').map((v) => v.trim()).filter((v) => v !== '');
