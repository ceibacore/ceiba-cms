import type { MediaItem, MediaSettings, UploadOptions } from '../../core';
import type { EditorStore } from '../model/store.svelte';
/** State of the media dialog (plan 05-A): search pages, selection, upload, alt text and deletion. */
export declare class MediaBrowser {
    private readonly store;
    items: MediaItem[];
    total: number;
    search: string;
    loading: boolean;
    busy: boolean;
    selected: MediaItem | null;
    error: string;
    private page;
    private readonly transport;
    constructor(store: EditorStore);
    get hasMore(): boolean;
    load(more?: boolean): Promise<void>;
    select(item: MediaItem | null): void;
    /** Client checks (type, size) before sending; the server checks the content again. */
    check(file: File, settings: MediaSettings | null): string | null;
    upload(file: File, options: UploadOptions): Promise<MediaItem | null>;
    describe(alt: string): Promise<void>;
    /** Deletes the selected file; when it is used, says where (pages, site design). */
    remove(): Promise<void>;
    private act;
    private fail;
}
