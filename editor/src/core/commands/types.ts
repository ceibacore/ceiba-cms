import type { Catalogue } from '../catalogue/types';
import type { RawNode } from '../document/types';
import type { IdFactory } from '../tree/ids';
import type { TreeState } from '../tree/state';
import type { Limits } from '../validate/limits';

/** Commands of the editor (plan 03). Each one carries node ids and its own preconditions. */
export type Command =
  | { readonly kind: 'insert'; readonly parent: string | null; readonly index: number; readonly node: RawNode }
  /** Internal: puts back a removed subtree with its ids (inverse of remove). */
  | { readonly kind: 'restore'; readonly parent: string | null; readonly index: number; readonly node: RawNode }
  | { readonly kind: 'remove'; readonly id: string }
  | { readonly kind: 'move'; readonly id: string; readonly parent: string | null; readonly index: number }
  | { readonly kind: 'duplicate'; readonly id: string }
  | { readonly kind: 'updateProps'; readonly id: string; readonly set: Readonly<Record<string, unknown>>;
      readonly unset?: readonly string[] }
  | { readonly kind: 'rename'; readonly id: string; readonly name: string | null; readonly label: string | null }
  | { readonly kind: 'updateFields'; readonly id: string; readonly set: Readonly<Record<string, unknown>>;
      readonly unset?: readonly string[] }
  | { readonly kind: 'replace'; readonly id: string; readonly node: RawNode; readonly keepIds?: boolean };

export interface CommandContext {
  readonly catalogue: Catalogue;
  readonly limits: Limits;
  readonly ids: IdFactory;
}

export interface CommandResult {
  readonly state: TreeState;
  /** Command that undoes this one on the resulting state. */
  readonly inverse: Command;
  /** Node to select after the command (new node, moved node, or the neighbour of a removed one). */
  readonly focus: string | null;
}

export type CommandHandler<K extends Command['kind']> = (
  state: TreeState,
  command: Extract<Command, { kind: K }>,
  context: CommandContext,
) => CommandResult;
