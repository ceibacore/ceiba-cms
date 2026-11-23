import { getNode, indexInParent, subtreeIds } from '../tree/queries';
import { childrenOf, withChildren, withoutNodes } from '../tree/state';
import { toRaw } from '../tree/subtree';
import type { CommandHandler } from './types';

/** Removes a node and its descendants. Focus goes to the next sibling, else the previous one, else the parent. */
export const remove: CommandHandler<'remove'> = (state, command) => {
  const node = getNode(state, command.id);
  const index = indexInParent(state, command.id);
  const siblings = childrenOf(state, node.parent).filter((id) => id !== command.id);
  const raw = toRaw(state, command.id);
  const next = withoutNodes(withChildren(state, node.parent, siblings), subtreeIds(state, command.id));
  const focus = siblings[index] ?? siblings[index - 1] ?? node.parent;
  return { state: next, inverse: { kind: 'restore', parent: node.parent, index, node: raw }, focus };
};
