import type { Command, CommandContext } from '../commands/types';
import type { PageDocument } from '../document/types';
import { EditorError } from '../errors';
import type { TreeState } from '../tree/state';
import type { SaveReason } from '../transport/types';
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
    load(): Promise<void>;
    /** Applies a command. On error the tree is unchanged and the EditorError is thrown. */
    dispatch(command: Command): void;
    undo(): void;
    redo(): void;
    select(id: string | null): void;
    save(reason?: SaveReason): Promise<number | null>;
    resolveConflict(choice: 'keep-mine' | 'take-theirs'): Promise<void>;
    /** The document as it would be saved now (for the server preview or export). */
    toDocument(): PageDocument;
    /** Releases listeners; the host calls it when unmounting the editor. */
    destroy(): void;
    private editable;
}
