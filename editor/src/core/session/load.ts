import { createCatalogue } from '../catalogue/build';
import { createCommands } from '../commands';
import { fromDocument } from '../document/normalize';
import { EditorError } from '../errors';
import { emptyHistory } from '../history/history';
import type { SessionCore } from './core';

/** Loads catalogue and working revision. On failure the session stays in load-error with the cause. */
export const loadSession = async (core: SessionCore): Promise<void> => {
  const { transport, pageId, ids, limits } = core.options;
  core.setStatus('loading');
  try {
    const [components, rules, draft] = await Promise.all([
      transport.listComponents(), transport.listElementRules(), transport.load(pageId),
    ]);
    core.catalogue = createCatalogue(components, rules);
    core.commands = createCommands({ catalogue: core.catalogue, limits, ids });
    const loaded = fromDocument(draft.document, ids);
    core.meta = loaded.meta;
    core.tree = loaded.tree;
    core.markSaved(loaded.tree, draft.revision);
    core.setHistory(emptyHistory());
    core.conflictRevision = null;
    core.lastError = null;
    core.setStatus('ready');
    core.events.emit('ready', { revision: draft.revision, repairedIds: loaded.repairedIds });
  } catch (error) {
    core.lastError = error instanceof EditorError ? error : new EditorError('SERVER', String(error));
    core.setStatus('load-error');
    throw core.lastError;
  }
};
