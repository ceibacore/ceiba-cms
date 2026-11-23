import type { CommandHandler } from './types';
/** Copies a node right after itself: new ids everywhere and internal references pointing into the copy. */
export declare const duplicate: CommandHandler<'duplicate'>;
