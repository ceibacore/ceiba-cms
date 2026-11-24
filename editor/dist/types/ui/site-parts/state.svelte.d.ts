import type { SitePartImpact, SitePartPreview, SitePartRules, SitePartSummary, Transport } from '../../core';
import type { EditorStore } from '../model/store.svelte';
/**
 * The site part being edited (plan 06-C): its draft rules (saved over their version), impact, in-context preview
 * and publication of document + rules together through the site parts API.
 */
export declare class SitePartState {
    readonly transport: Transport;
    readonly id: string;
    open: boolean;
    part: SitePartSummary | null;
    rules: SitePartRules;
    version: number;
    dirty: boolean;
    routes: Record<string, string>;
    pages: readonly {
        readonly id: string;
        readonly path: string;
        readonly layoutId: string | null;
        readonly isHome: boolean;
    }[];
    impact: SitePartImpact | null;
    preview: SitePartPreview | null;
    error: string;
    /** Path of the rule the server refused (include.0.ids.1), to mark the field. */
    errorPath: string;
    busy: boolean;
    store: EditorStore | null;
    constructor(transport: Transport, id: string);
    /** The published rules differ from the draft ones. */
    get rulesUnpublished(): boolean;
    load(): Promise<void>;
    setRules(rules: SitePartRules): void;
    saveRules(): Promise<boolean>;
    loadImpact(): Promise<void>;
    showPreview(pageId: string | null): Promise<void>;
    /** The session's publish goes here: the saved revision of the document with the current rules. */
    publishDocument(revision: number, key: string): Promise<{
        revision: number;
    }>;
    /** Publishes: through the session when the document changed (it calls publishDocument), else only the rules. */
    publish(): Promise<void>;
    private act;
}
/** A transport whose page publication publishes the site part (document + rules) as one set. */
export declare const sitePartTransport: (transport: Transport, part: SitePartState) => Transport;
