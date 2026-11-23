import type { Catalogue, Command, EditorSession, SessionStatus, TreeState } from '../../core';
import type { MessageKey, Translate } from '../i18n';
/**
 * Reactive view of an EditorSession for the Svelte components. Every change goes through the session;
 * errors are announced (aria-live) instead of thrown at the UI.
 */
export declare class EditorStore {
    readonly session: EditorSession;
    readonly t: Translate;
    tree: TreeState;
    catalogue: Catalogue | null;
    selection: string | null;
    status: SessionStatus;
    dirty: boolean;
    canUndo: boolean;
    canRedo: boolean;
    revision: number;
    publishedRevision: number | null;
    canPublish: boolean;
    publishing: boolean;
    conflictRevision: number | null;
    /** Polite announcement (results) and assertive one (errors). */
    message: string;
    alert: string;
    private readonly stops;
    constructor(session: EditorSession, t: Translate);
    sync(): void;
    /** Something on the server is not public yet (or local edits are pending). */
    get unpublished(): boolean;
    publish(): Promise<void>;
    resolve(choice: 'keep-mine' | 'take-theirs'): Promise<void>;
    announce(key: MessageKey, params?: Record<string, string | number>): void;
    fail(error: unknown, code?: import("..").EditorErrorCode): void;
    /** Runs a command; returns false (and announces why) when the core refuses it. */
    run(command: Command, announce?: [MessageKey, Record<string, string | number>?]): boolean;
    undo(): void;
    redo(): void;
    select(id: string | null): void;
    save(): Promise<void>;
    destroy(): void;
    private guard;
}
