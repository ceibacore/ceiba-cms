import { assertPlacement } from '../catalogue/placement';
import { fail } from '../errors';
import { depthOf, getNode, heightOf, indexInParent, isSelfOrDescendant } from '../tree/queries';
import { childrenOf, insertAt, withChildren, withNode } from '../tree/state';
import { assertDepth } from '../validate/limits';
import type { CommandHandler } from './types';

/**
 * Moves a node to a parent (null = root) at an index of the target list as it is *before* the move.
 * Moving into itself or a descendant fails without touching the state.
 */
export const move: CommandHandler<'move'> = (state, command, context) => {
  const node = getNode(state, command.id);
  if (command.parent !== null) getNode(state, command.parent);
  if (command.parent !== null && isSelfOrDescendant(state, command.id, command.parent)) {
    fail('CYCLE', 'A node cannot be moved inside itself', { id: command.id });
  }
  assertDepth(context.limits, depthOf(state, command.parent) + heightOf(state, command.id));
  if (command.parent !== node.parent) {
    assertPlacement(state, context.catalogue, node.type, command.parent);
  }
  const from = indexInParent(state, command.id);
  const without = withChildren(state, node.parent, childrenOf(state, node.parent).filter((id) => id !== command.id));
  const sameParent = command.parent === node.parent;
  const target = sameParent && command.index > from ? command.index - 1 : command.index;
  const placed = withChildren(without, command.parent, insertAt(childrenOf(without, command.parent), target, command.id));
  const moved = withNode(placed, { ...getNode(placed, command.id), parent: command.parent });
  const back = sameParent && from > target ? from + 1 : from;
  return { state: moved, inverse: { kind: 'move', id: command.id, parent: node.parent, index: back }, focus: command.id };
};
