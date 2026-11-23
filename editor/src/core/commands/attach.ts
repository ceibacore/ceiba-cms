import { assertPlacement } from '../catalogue/placement';
import { fail } from '../errors';
import type { RawNode } from '../document/types';
import { depthOf, nodeCount } from '../tree/queries';
import type { TreeState } from '../tree/state';
import { childrenOf, insertAt, withChildren } from '../tree/state';
import type { IdMode } from '../tree/subtree';
import { attachRaw, measureRaw } from '../tree/subtree';
import { assertDepth, assertNodeCount } from '../validate/limits';
import type { CommandContext } from './types';

/** Shared by insert, restore, duplicate and replace: checks limits and placement, then attaches the subtree. */
export const attachChecked = (
  state: TreeState,
  raw: RawNode,
  parent: string | null,
  index: number,
  context: CommandContext,
  mode: IdMode,
  removedCount = 0,
): { state: TreeState; id: string; renamed: Map<string, string> } => {
  if (parent !== null && !state.nodes[parent]) {
    fail('NODE_NOT_FOUND', `Node ${parent} does not exist`, { id: parent });
  }
  const size = measureRaw(raw);
  assertNodeCount(context.limits, nodeCount(state) - removedCount + size.count);
  assertDepth(context.limits, depthOf(state, parent) + size.height);
  assertPlacement(state, context.catalogue, raw.type, parent);
  const attached = attachRaw(state, raw, parent, context.ids, mode);
  const placed = withChildren(attached.state, parent, insertAt(childrenOf(attached.state, parent), index, attached.id));
  return { state: placed, id: attached.id, renamed: attached.renamed };
};
