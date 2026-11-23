import type { ComponentDescriptorDto, HtmlTagRuleDto } from '../catalogue/types';
import type { PageDocument } from '../document/types';
export type SaveReason = 'edit' | 'autosave';
export interface LoadedDraft {
    /** Working revision the editor starts from; saves send If-Match with it. */
    readonly revision: number;
    readonly document: PageDocument;
}
/**
 * What the editor needs from the host (plan 03). Credentials stay inside the adapter: they never reach the
 * document, the session or the events. Errors are EditorError with a stable code.
 */
export interface Transport {
    load(pageId: string): Promise<LoadedDraft>;
    /** Creates revision baseRevision + 1; REVISION_CONFLICT (details.currentRevision) when the base is stale. */
    save(document: PageDocument, baseRevision: number, reason: SaveReason): Promise<{
        revision: number;
    }>;
    /** A stored revision, for the server preview and conflict resolution. */
    preview(pageId: string, revision: number): Promise<PageDocument>;
    listComponents(): Promise<ComponentDescriptorDto[]>;
    listElementRules(): Promise<HtmlTagRuleDto[]>;
    /** Optional (03-D): hosts without them get an editor without publishing or server preview. */
    capabilities?(): Promise<EditorCapabilities>;
    status?(pageId: string): Promise<PublicationStatus>;
    /** Publishes an exact revision; the key makes retries idempotent. */
    publish?(pageId: string, revision: number, idempotencyKey: string): Promise<{
        revision: number;
    }>;
    /** HTML of a stored revision drawn by the server renderer (content only). */
    render?(pageId: string, revision: number): Promise<string>;
}
/** Permissions and features negotiated with the server (GET {prefix}/capabilities). */
export interface EditorCapabilities {
    readonly permissions: readonly string[];
    readonly features: Readonly<Record<string, boolean>>;
}
export interface PublicationStatus {
    readonly revision: number;
    readonly publishedRevision: number | null;
    readonly hasUnpublishedChanges: boolean;
}
