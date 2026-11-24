import type { Catalogue, Command, DesignDocument, EditorSession, SessionStatus, TreeState } from '../../core';
import { SiteDesignSession } from '../../core';
import type { MessageKey, Translate } from '../i18n';
import { MediaState } from '../media/media.svelte';
import type { SitePartState } from '../site-parts/state.svelte';
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
    /** Site design (plan 04): working copy shown on the canvas, and the width/state the style controls edit. */
    readonly designSession: SiteDesignSession;
    /** Media library (plan 05-A): resolved asset URLs and the media dialog request. */
    readonly media: MediaState;
    /** The site part being edited (plan 06), or null for a page. */
    part: SitePartState | null;
    design: DesignDocument;
    designDirty: boolean;
    /** Breakpoint id the canvas shows and the style controls edit; null = base (smallest screens). */
    viewport: string | null;
    styleState: string | null;
    /** The site design panel replaces the inspector while open (plan 04-D). */
    designOpen: boolean;
    designAvailable: boolean;
    designRevision: number;
    designPublished: number | null;
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
    loadDesign(): Promise<void>;
    /** Saves or publishes the site design; errors (conflict, validation) are announced, never thrown at the UI. */
    designAction(action: 'save' | 'publish' | 'reload'): Promise<void>;
    destroy(): void;
    private guard;
}
