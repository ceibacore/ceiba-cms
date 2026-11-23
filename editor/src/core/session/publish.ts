import { EditorError } from '../errors';
import type { SessionCore } from './core';

/** Publishing needs the transport, the permission (when the server reports permissions) and the feature. */
export const canPublish = (core: SessionCore): boolean => {
  if (!core.options.transport.publish) return false;
  const capabilities = core.capabilities;
  if (!capabilities) return true;
  return capabilities.features.revisionPublish ?? capabilities.permissions.includes('pages.publish');
};

const newKey = (): string => {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Publishes the revision the editor stands on. Unsaved changes are never published silently: the caller saves
 * first. The server keeps the last word on permissions; a refusal here is only to avoid a useless request.
 */
export const publishSession = async (core: SessionCore): Promise<number> => {
  const publish = core.options.transport.publish;
  if (!publish || !canPublish(core)) throw new EditorError('AUTHORIZATION_DENIED', 'Publishing is not allowed here');
  if (core.status !== 'ready' || core.dirty) {
    throw new EditorError('NOTHING_TO_PUBLISH', 'Save the changes before publishing', { status: core.status });
  }
  if (core.publishedRevision === core.baseRevision) {
    throw new EditorError('NOTHING_TO_PUBLISH', 'This revision is already published');
  }
  if (core.publishing) throw new EditorError('SAVE_IN_PROGRESS', 'Publishing is already running');
  const revision = core.baseRevision;
  core.publishing = true;
  core.events.emit('publish-start', { revision });
  try {
    await publish(core.options.pageId, revision, newKey());
    core.publishedRevision = revision;
    core.events.emit('publish-success', { revision });
    return revision;
  } catch (cause) {
    const error = cause instanceof EditorError ? cause : new EditorError('SERVER', String(cause));
    core.lastError = error;
    core.events.emit('publish-error', { error });
    throw error;
  } finally {
    core.publishing = false;
  }
};
