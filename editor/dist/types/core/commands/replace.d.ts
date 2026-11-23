import type { CommandHandler } from './types';
/**
 * Replaces a node (and its subtree) with other content, e.g. a paste or a template. New content must be known;
 * the inverse puts the original back with its ids.
 */
export declare const replace: CommandHandler<'replace'>;
