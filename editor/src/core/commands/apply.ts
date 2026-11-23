import type { TreeState } from '../tree/state';
import { duplicate } from './duplicate';
import { insert, restore } from './insert';
import { move } from './move';
import { remove } from './remove';
import { rename } from './rename';
import { replace } from './replace';
import type { Command, CommandContext, CommandHandler, CommandResult } from './types';
import { updateProps } from './update-props';

const handlers: { [K in Command['kind']]: CommandHandler<K> } = {
  insert, restore, remove, move, duplicate, updateProps, rename, replace,
};

/** Runs a command. It either returns a new state or throws an EditorError leaving the given state untouched. */
export const applyCommand = (state: TreeState, command: Command, context: CommandContext): CommandResult => {
  const handler = handlers[command.kind] as CommandHandler<typeof command.kind>;
  return handler(state, command as never, context);
};
