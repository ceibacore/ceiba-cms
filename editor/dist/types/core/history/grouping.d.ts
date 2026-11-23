import type { Command } from '../commands/types';
/**
 * Commands that merge with the previous one when they come in a burst: typing in a field is one undo step,
 * not one per key. Structural commands never merge.
 */
export declare const groupKeyOf: (command: Command) => string | null;
