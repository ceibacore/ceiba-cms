import type { AssetRef, MediaSettings, ResolvedMedia, Transport } from '../../core';
/** What opened the media dialog and where the chosen file goes. */
export interface PickRequest {
    readonly current: AssetRef | null;
    readonly onPick: (ref: AssetRef) => void;
}
/**
 * Media of the editor (plan 05-A): URLs of the assets the page uses (asked to the host in batches and kept), the
 * site image options, and the request that opens the media dialog. Hosts without listMedia get no dialog.
 */
export declare class MediaState {
    private readonly transport;
    resolved: Record<string, ResolvedMedia>;
    settings: MediaSettings | null;
    request: PickRequest | null;
    private readonly asked;
    constructor(transport: Transport);
    get available(): boolean;
    /** Resolves ids not asked yet; unknown ids are asked once (they draw as an empty image). */
    ensure(ids: readonly string[]): Promise<void>;
    /** A file just uploaded, chosen or described: its URL is known without asking again. */
    remember(media: ResolvedMedia): void;
    forget(id: string): void;
    loadSettings(): Promise<MediaSettings | null>;
    pick(current: AssetRef | null, onPick: (ref: AssetRef) => void): void;
    close(): void;
    /** URL map for the style compiler (only resolved assets). */
    get assetUrls(): Record<string, string>;
}
