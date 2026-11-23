import type { CommandHandler } from './types';
/**
 * Moves a node to a parent (null = root) at an index of the target list as it is *before* the move.
 * Moving into itself or a descendant fails without touching the state.
 */
export declare const move: CommandHandler<'move'>;
