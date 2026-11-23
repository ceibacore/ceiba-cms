import type { SessionCore } from './core';
/** Publishing needs the transport, the permission (when the server reports permissions) and the feature. */
export declare const canPublish: (core: SessionCore) => boolean;
/**
 * Publishes the revision the editor stands on. Unsaved changes are never published silently: the caller saves
 * first. The server keeps the last word on permissions; a refusal here is only to avoid a useless request.
 */
export declare const publishSession: (core: SessionCore) => Promise<number>;
