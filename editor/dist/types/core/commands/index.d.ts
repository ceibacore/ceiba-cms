import type { TreeState } from '../tree/state';
import type { Command, CommandContext, CommandResult } from './types';
export type { Command, CommandContext, CommandResult } from './types';
export { applyCommand } from './apply';
export { REFERENCE_PROPS } from './references';
/** Factory: the commands bound to a catalogue, limits and id generator. */
export declare const createCommands: (context: CommandContext) => {
    context: CommandContext;
    apply: (state: TreeState, command: Command) => CommandResult;
};
export type Commands = ReturnType<typeof createCommands>;
