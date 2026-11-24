import type { MediaItem, MediaSettings, Transport, UploadOptions } from '../../core';
import { EditorError } from '../../core';
import type { EditorStore } from '../model/store.svelte';

/** State of the media dialog (plan 05-A): search pages, selection, upload, alt text and deletion. */
export class MediaBrowser {
  items = $state.raw<MediaItem[]>([]);
  total = $state(0);
  search = $state('');
  loading = $state(false);
  busy = $state(false);
  selected = $state.raw<MediaItem | null>(null);
  error = $state('');
  private page = 1;
  private readonly transport: Transport;

  constructor(private readonly store: EditorStore) {
    this.transport = store.session.transport;
  }

  get hasMore(): boolean {
    return this.items.length < this.total;
  }

  async load(more = false): Promise<void> {
    if (!this.transport.listMedia) return;
    this.loading = true;
    this.error = '';
    try {
      const page = await this.transport.listMedia(this.search.trim(), more ? this.page + 1 : 1);
      this.page = page.page;
      this.total = page.total;
      this.items = more ? [...this.items, ...page.items] : [...page.items];
    } catch (error) {
      this.fail(error);
    } finally {
      this.loading = false;
    }
  }

  select(item: MediaItem | null): void {
    this.selected = item;
    this.error = '';
  }

  /** Client checks (type, size) before sending; the server checks the content again. */
  check(file: File, settings: MediaSettings | null): string | null {
    const t = this.store.t;
    if (settings && !settings.accept.includes(file.type)) return t('media.typeError');
    if (settings && file.size > settings.maxBytes) return t('media.sizeError', { size: Math.round(settings.maxBytes / 1048576) });
    return null;
  }

  async upload(file: File, options: UploadOptions): Promise<MediaItem | null> {
    if (!this.transport.uploadMedia) return null;
    return this.act(async () => {
      const item = await this.transport.uploadMedia!(file, options);
      this.items = [item, ...this.items];
      this.total++;
      this.select(item);
      this.store.media.remember(item);
      this.store.announce('media.uploaded', { name: item.filename });
      return item;
    });
  }

  async describe(alt: string): Promise<void> {
    const current = this.selected;
    if (!current || !this.transport.describeMedia) return;
    await this.act(async () => {
      const item = await this.transport.describeMedia!(current.id, alt);
      this.items = this.items.map((i) => (i.id === item.id ? item : i));
      this.select(item);
      this.store.media.remember(item);
      this.store.announce('media.altSaved');
    });
  }

  /** Deletes the selected file; when it is used, says where (pages, site design). */
  async remove(): Promise<void> {
    const current = this.selected;
    if (!current || !this.transport.deleteMedia) return;
    await this.act(async () => {
      try {
        await this.transport.deleteMedia!(current.id);
      } catch (error) {
        if (error instanceof EditorError && error.code === 'MEDIA_IN_USE' && this.transport.mediaUsages) {
          const usages = await this.transport.mediaUsages(current.id);
          const where = [...usages.pages.map((p) => `«${p.title || p.pageId}»`), ...(usages.design ? [this.store.t('media.design')] : [])];
          this.error = this.store.t('media.usedIn', { where: where.join(', ') });
          return;
        }
        throw error;
      }
      this.items = this.items.filter((i) => i.id !== current.id);
      this.total--;
      this.select(null);
      this.store.media.forget(current.id);
      this.store.announce('media.deleted');
    });
  }

  private async act<T>(action: () => Promise<T>): Promise<T | null> {
    this.busy = true;
    this.error = '';
    try {
      return await action();
    } catch (error) {
      this.fail(error);
      return null;
    } finally {
      this.busy = false;
    }
  }

  private fail(error: unknown): void {
    const t = this.store.t;
    if (error instanceof EditorError && error.code === 'VALIDATION_FAILED' && error.details.file === 'TYPE') this.error = t('media.typeError');
    else this.error = t(`error.${error instanceof EditorError ? error.code : 'SERVER'}` as Parameters<typeof t>[0]);
  }
}
