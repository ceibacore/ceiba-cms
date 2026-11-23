import type { Catalogue } from '../catalogue/types';
import type { Commands } from '../commands';
import type { DocumentMeta } from '../document/normalize';
import type { EditorError } from '../errors';
import type { HistoryState } from '../history/history';
import type { EditorCapabilities } from '../transport/types';
import type { TreeState } from '../tree/state';
import { Emitter } from './events';
import type { ResolvedOptions } from './options';
import type { SessionEvents, SessionStatus } from './status';
/** Mutable state of a session plus the helpers that keep events in sync. Only the session and its helpers use it. */
export declare class SessionCore {
    readonly options: ResolvedOptions;
    readonly events: Emitter<SessionEvents>;
    status: SessionStatus;
    tree: TreeState;
    /** Tree as the server has it (last load or successful save). */
    savedTree: TreeState;
    meta: DocumentMeta;
    baseRevision: number;
    history: HistoryState;
    selection: string | null;
    catalogue: Catalogue;
    commands: Commands | null;
    lastError: EditorError | null;
    conflictRevision: number | null;
    /** Negotiated permissions and features; null when the transport does not report them. */
    capabilities: EditorCapabilities | null;
    /** Revision on the public site; null when never published or unknown. */
    publishedRevision: number | null;
    publishing: boolean;
    constructor(options: ResolvedOptions);
    get dirty(): boolean;
    setStatus(status: SessionStatus): void;
    /** Replaces the tree and keeps status, dirty flag and selection coherent. */
    commitTree(tree: TreeState, selection: string | null): void;
    /** Marks the current tree as the one stored on the server. */
    markSaved(tree: TreeState, revision: number): void;
    select(id: string | null): void;
    setHistory(history: HistoryState): void;
}
