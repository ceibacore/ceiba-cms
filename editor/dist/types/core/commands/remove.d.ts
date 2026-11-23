import type { CommandHandler } from './types';
/** Removes a node and its descendants. Focus goes to the next sibling, else the previous one, else the parent. */
export declare const remove: CommandHandler<'remove'>;
