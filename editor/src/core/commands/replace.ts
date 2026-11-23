import { assertNewContent } from '../catalogue/placement';
import { getNode, indexInParent } from '../tree/queries';
import { toRaw } from '../tree/subtree';
import { attachChecked } from './attach';
import { remove } from './remove';
import type { CommandHandler } from './types';

/**
 * Replaces a node (and its subtree) with other content, e.g. a paste or a template. New content must be known;
 * the inverse puts the original back with its ids.
 */
export const replace: CommandHandler<'replace'> = (state, command, context) => {
  const node = getNode(state, command.id);
  const index = indexInParent(state, command.id);
  const original = toRaw(state, command.id);
  if (!command.keepIds) assertNewContent(context.catalogue, command.node);
  const removed = remove(state, { kind: 'remove', id: command.id }, context).state;
  const attached = attachChecked(removed, command.node, node.parent, index, context, command.keepIds ? 'keep' : 'fresh');
  return {
    state: attached.state,
    inverse: { kind: 'replace', id: attached.id, node: original, keepIds: true },
    focus: attached.id,
  };
};
