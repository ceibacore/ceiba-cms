import { toDocument } from '../document/normalize';
import { EditorError } from '../errors';
import type { SaveReason } from '../transport/types';
import { assertSize } from '../validate/limits';
import type { SessionCore } from './core';
import { loadSession } from './load';

/**
 * Saves the working tree as revision base + 1. Edits made while saving stay dirty for the next save.
 * Conflict and network errors keep the draft in memory; the session moves to `conflict` or `offline`.
 */
export const saveSession = async (core: SessionCore, reason: SaveReason): Promise<number | null> => {
  if (core.status === 'loading' || core.status === 'load-error') {
    throw new EditorError('INVALID_DOCUMENT', 'Nothing loaded to save');
  }
  if (core.status === 'saving') throw new EditorError('SAVE_IN_PROGRESS', 'A save is already running');
  if (core.status === 'conflict') {
    throw new EditorError('REVISION_CONFLICT', 'Resolve the conflict before saving', {
      currentRevision: String(core.conflictRevision ?? ''),
    });
  }
  if (!core.dirty) {
    if (reason === 'autosave') return null;
    throw new EditorError('NOTHING_TO_SAVE', 'There are no changes to save');
  }
  const tree = core.tree;
  const document = toDocument(tree, core.meta, core.baseRevision + 1);
  assertSize(core.options.limits, JSON.stringify(document));

  const previous = core.status;
  core.setStatus('saving');
  core.events.emit('save-start', { reason, baseRevision: core.baseRevision });
  try {
    const { revision } = await core.options.transport.save(document, core.baseRevision, reason);
    core.markSaved(tree, revision);
    core.lastError = null;
    core.setStatus(core.dirty ? 'dirty' : 'ready');
    core.events.emit('save-success', { revision });
    return revision;
  } catch (cause) {
    const error = cause instanceof EditorError ? cause : new EditorError('SERVER', String(cause));
    core.lastError = error;
    if (error.code === 'REVISION_CONFLICT') {
      const current = Number(error.details.currentRevision);
      core.conflictRevision = Number.isInteger(current) && current > 0 ? current : null;
      core.setStatus('conflict');
      core.events.emit('conflict', { baseRevision: core.baseRevision, currentRevision: core.conflictRevision });
    } else {
      core.setStatus(error.code === 'NETWORK' ? 'offline' : previous === 'offline' ? 'dirty' : previous);
      core.events.emit('save-error', { error });
    }
    throw error;
  }
};

/**
 * Explicit conflict resolution (plan 03: never automatic).
 * - keep-mine: rebases on the server's current revision and saves the local tree over it.
 * - take-theirs: drops local changes and history, and reloads the server draft.
 */
export const resolveConflict = async (core: SessionCore, choice: 'keep-mine' | 'take-theirs'): Promise<void> => {
  if (core.status !== 'conflict') return;
  if (choice === 'take-theirs') {
    await loadSession(core);
    return;
  }
  const current = core.conflictRevision ?? (await core.options.transport.load(core.options.pageId)).revision;
  core.baseRevision = current;
  core.conflictRevision = null;
  core.setStatus('dirty');
  await saveSession(core, 'edit');
};
