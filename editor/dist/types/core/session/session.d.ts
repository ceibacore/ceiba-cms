import type { Command, CommandContext } from '../commands/types';
import type { PageDocument } from '../document/types';
import { EditorError } from '../errors';
import type { TreeState } from '../tree/state';
import type { EditorCapabilities, SaveReason, Transport } from '../transport/types';
import type { SessionOptions } from './options';
import type { SessionStatus } from './status';
/**
 * Master class of the editor core: one page being edited. The UI calls it and listens to `events`;
 * two sessions never share state.
 */
export declare class EditorSession {
    private readonly core;
    constructor(options: SessionOptions);
    get events(): import("./events").Emitter<import("./status").SessionEvents>;
    get status(): SessionStatus;
    get tree(): TreeState;
    get selection(): string | null;
    get baseRevision(): number;
    get dirty(): boolean;
    get catalogue(): import("..").Catalogue;
    get lastError(): EditorError | null;
    get canUndo(): boolean;
    get canRedo(): boolean;
    /** Catalogue, limits and ids of the loaded page, to try a command without applying it (drop targets). */
    get commandContext(): CommandContext | null;
    get capabilities(): EditorCapabilities | null;
    get publishedRevision(): number | null;
    get canPublish(): boolean;
    get publishing(): boolean;
    get conflictRevision(): number | null;
    get pageId(): string;
    get transport(): Transport;
    load(): Promise<void>;
    /**
     * Applies a command. On error the tree is unchanged and the EditorError is thrown.
     * The tree is committed before history-change fires, so listeners (autosave) see the new dirty state.
     */
    dispatch(command: Command): void;
    undo(): void;
    redo(): void;
    select(id: string | null): void;
    save(reason?: SaveReason): Promise<number | null>;
    /** Publishes the saved revision the editor stands on (save first). */
    publish(): Promise<number>;
    resolveConflict(choice: 'keep-mine' | 'take-theirs'): Promise<void>;
    /** The document as it would be saved now (for the server preview or export). */
    toDocument(): PageDocument;
    /** Releases listeners; the host calls it when unmounting the editor. */
    destroy(): void;
    private editable;
}
