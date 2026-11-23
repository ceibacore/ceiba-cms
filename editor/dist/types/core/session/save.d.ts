import type { SaveReason } from '../transport/types';
import type { SessionCore } from './core';
/**
 * Saves the working tree as revision base + 1. Edits made while saving stay dirty for the next save.
 * Conflict and network errors keep the draft in memory; the session moves to `conflict` or `offline`.
 */
export declare const saveSession: (core: SessionCore, reason: SaveReason) => Promise<number | null>;
/**
 * Explicit conflict resolution (plan 03: never automatic).
 * - keep-mine: rebases on the server's current revision and saves the local tree over it.
 * - take-theirs: drops local changes and history, and reloads the server draft.
 */
export declare const resolveConflict: (core: SessionCore, choice: "keep-mine" | "take-theirs") => Promise<void>;
