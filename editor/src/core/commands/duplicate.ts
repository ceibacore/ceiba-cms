import { getNode, indexInParent } from '../tree/queries';
import { toRaw } from '../tree/subtree';
import { attachChecked } from './attach';
import { rewriteReferences } from './references';
import type { CommandHandler } from './types';

/** Copies a node right after itself: new ids everywhere and internal references pointing into the copy. */
export const duplicate: CommandHandler<'duplicate'> = (state, command, context) => {
  const node = getNode(state, command.id);
  const attached = attachChecked(state, toRaw(state, command.id), node.parent, indexInParent(state, command.id) + 1,
    context, 'fresh');
  const next = rewriteReferences(attached.state, attached.id, attached.renamed);
  return { state: next, inverse: { kind: 'remove', id: attached.id }, focus: attached.id };
};
