import type { DesignUsage } from './types';

/** A node value pointing at a file of the media library (plan 05 D-1); alt is per use ("" = decorative). */
export interface AssetRef {
  readonly asset: string;
  readonly alt?: string;
}

/** A file as the page draws it: URL resolved by the host, size, srcset of the variants. */
export interface ResolvedMedia {
  readonly id: string;
  readonly url: string;
  readonly width: number | null;
  readonly height: number | null;
  readonly alt: string;
  readonly srcset: string;
}

export interface MediaItem extends ResolvedMedia {
  readonly thumbnail: string;
  readonly filename: string;
  readonly mime: string;
  readonly size: number;
  readonly originalWidth: number | null;
  readonly originalHeight: number | null;
}

export interface MediaPage {
  readonly items: readonly MediaItem[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
}

/** Image options of the site (plan 05 D-4): recommended widths (checked on upload), WebP default, limits. */
export interface MediaSettings {
  readonly widths: readonly number[];
  readonly quality: number;
  readonly webp: boolean;
  readonly maxBytes: number;
  readonly accept: readonly string[];
}

/** What the uploader chose in the dialog. */
export interface UploadOptions {
  readonly alt: string;
  readonly widths: readonly number[];
  readonly optimize: boolean;
  readonly webp: boolean;
}

export interface MediaUsages {
  readonly pages: readonly DesignUsage[];
  /** Layouts whose footer shows the file (hosts without layouts send none). */
  readonly layouts?: readonly { readonly layoutId: string; readonly name: string }[];
  readonly design: boolean;
}

/** Optional media methods of a transport (plan 05-A); without listMedia the editor has no media dialog. */
export interface MediaMethods {
  listMedia?(search: string, page: number): Promise<MediaPage>;
  uploadMedia?(file: File, options: UploadOptions): Promise<MediaItem>;
  resolveMedia?(ids: readonly string[]): Promise<Record<string, ResolvedMedia>>;
  mediaSettings?(): Promise<MediaSettings>;
  describeMedia?(id: string, alt: string): Promise<MediaItem>;
  mediaUsages?(id: string): Promise<MediaUsages>;
  /** MEDIA_IN_USE while a page or the site design still uses it. */
  deleteMedia?(id: string): Promise<void>;
}
