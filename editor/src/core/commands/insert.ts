import { assertNewContent } from '../catalogue/placement';
import { attachChecked } from './attach';
import type { CommandHandler } from './types';

/** Inserts new content: known types only, fresh ids for the whole subtree. */
export const insert: CommandHandler<'insert'> = (state, command, context) => {
  assertNewContent(context.catalogue, command.node);
  const attached = attachChecked(state, command.node, command.parent, command.index, context, 'fresh');
  return { state: attached.state, inverse: { kind: 'remove', id: attached.id }, focus: attached.id };
};

/** Puts a removed subtree back with its ids and data untouched (unknown types included). */
export const restore: CommandHandler<'restore'> = (state, command, context) => {
  const attached = attachChecked(state, command.node, command.parent, command.index, context, 'keep');
  return { state: attached.state, inverse: { kind: 'remove', id: attached.id }, focus: attached.id };
};
