import type { TreeState } from '../tree/state';
import { applyCommand } from './apply';
import type { Command, CommandContext, CommandResult } from './types';

export type { Command, CommandContext, CommandResult } from './types';
export { applyCommand } from './apply';
export { REFERENCE_PROPS } from './references';

/** Factory: the commands bound to a catalogue, limits and id generator. */
export const createCommands = (context: CommandContext) => ({
  context,
  apply: (state: TreeState, command: Command): CommandResult => applyCommand(state, command, context),
});

export type Commands = ReturnType<typeof createCommands>;
