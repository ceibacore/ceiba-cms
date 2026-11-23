import type { CommandHandler } from './types';
/** Inserts new content: known types only, fresh ids for the whole subtree. */
export declare const insert: CommandHandler<'insert'>;
/** Puts a removed subtree back with its ids and data untouched (unknown types included). */
export declare const restore: CommandHandler<'restore'>;
