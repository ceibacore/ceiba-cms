import { Emitter } from '../session/events';
import type { DesignDocument, StyleDiagnostic } from '../styles/types';
import type { Transport } from '../transport/types';
export type DesignEvents = {
    'change': {
        dirty: boolean;
    };
    'saved': {
        revision: number;
    };
    'published': {
        revision: number;
    };
};
export declare const defaultDesign: () => DesignDocument;
/**
 * The site design while editing (plan 04-C/D): loaded from the host, changed locally (the canvas shows it at
 * once), saved as a draft with If-Match and published explicitly. A design with diagnostics is never sent.
 */
export declare class SiteDesignSession {
    private readonly transport;
    readonly events: Emitter<DesignEvents>;
    design: DesignDocument;
    saved: DesignDocument;
    revision: number;
    publishedRevision: number | null;
    available: boolean;
    constructor(transport: Transport);
    get dirty(): boolean;
    get editable(): boolean;
    get diagnostics(): readonly StyleDiagnostic[];
    load(): Promise<void>;
    /** Local change: nothing is stored until save(). */
    update(design: DesignDocument): void;
    save(): Promise<number>;
    publish(): Promise<number>;
    /** Drops local changes and reloads the server design (after a conflict). */
    reload(): Promise<void>;
}
