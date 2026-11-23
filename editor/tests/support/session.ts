import { createCommands, fromDocument, sequentialIds, SERVER_LIMITS, toDocument } from '../../src/core';
import type { Limits, TreeState } from '../../src/core';
import { catalogue } from './catalogue';
import { sampleDocument } from './documents';

/** Commands and the sample tree, with deterministic ids. */
export const setup = (limits: Limits = SERVER_LIMITS) => {
  const ids = sequentialIds('new');
  const commands = createCommands({ catalogue: catalogue(), limits, ids });
  const loaded = fromDocument(sampleDocument(), ids);
  return { commands, tree: loaded.tree, meta: loaded.meta };
};

/** The tree as it would be saved, to compare states structurally. */
export const snapshot = (tree: TreeState) =>
  toDocument(tree, { documentId: 'page-1', settings: {}, resources: [] }, 1).root;
