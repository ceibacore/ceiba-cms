import type { SessionCore } from './core';
/** Loads catalogue and working revision. On failure the session stays in load-error with the cause. */
export declare const loadSession: (core: SessionCore) => Promise<void>;
