import type { TreeState } from '../tree/state';
import type { Command, CommandContext, CommandResult } from './types';
/** Runs a command. It either returns a new state or throws an EditorError leaving the given state untouched. */
export declare const applyCommand: (state: TreeState, command: Command, context: CommandContext) => CommandResult;
