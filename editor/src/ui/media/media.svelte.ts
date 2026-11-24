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
export class MediaState {
  resolved = $state.raw<Record<string, ResolvedMedia>>({});
  settings = $state.raw<MediaSettings | null>(null);
  request = $state.raw<PickRequest | null>(null);
  private readonly asked = new Set<string>();

  constructor(private readonly transport: Transport) {}

  get available(): boolean {
    return typeof this.transport.listMedia === 'function';
  }

  /** Resolves ids not asked yet; unknown ids are asked once (they draw as an empty image). */
  async ensure(ids: readonly string[]): Promise<void> {
    const missing = ids.filter((id) => !this.asked.has(id));
    if (missing.length === 0 || !this.transport.resolveMedia) return;
    for (const id of missing) this.asked.add(id);
    try {
      const found = await this.transport.resolveMedia(missing);
      if (Object.keys(found).length > 0) this.resolved = { ...this.resolved, ...found };
    } catch {
      for (const id of missing) this.asked.delete(id);
    }
  }

  /** A file just uploaded, chosen or described: its URL is known without asking again. */
  remember(media: ResolvedMedia): void {
    this.asked.add(media.id);
    this.resolved = { ...this.resolved, [media.id]: media };
  }

  forget(id: string): void {
    const { [id]: _gone, ...rest } = this.resolved;
    this.resolved = rest;
  }

  async loadSettings(): Promise<MediaSettings | null> {
    if (this.settings === null && this.transport.mediaSettings) {
      try {
        this.settings = await this.transport.mediaSettings();
      } catch {
        return null;
      }
    }
    return this.settings;
  }

  pick(current: AssetRef | null, onPick: (ref: AssetRef) => void): void {
    this.request = { current, onPick };
  }

  close(): void {
    this.request = null;
  }

  /** URL map for the style compiler (only resolved assets). */
  get assetUrls(): Record<string, string> {
    return Object.fromEntries(Object.entries(this.resolved).map(([id, media]) => [id, media.url]));
  }
}
