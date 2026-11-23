import type { CommandHandler } from './types';
/** Changes the name and label shown in the structure navigator. null removes them. Allowed on unknown types too. */
export declare const rename: CommandHandler<'rename'>;
