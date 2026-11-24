import { EditorError } from '../src/core';
import type { DesignDocument, MediaItem, MediaPage, MediaUsages, PageDocument, UploadOptions } from '../src/core';

const SIGNATURES: [string, number[]][] = [
  ['image/jpeg', [0xff, 0xd8, 0xff]], ['image/png', [0x89, 0x50, 0x4e, 0x47]], ['image/gif', [0x47, 0x49, 0x46, 0x38]],
];

/** Type by content, like the server (a .jpg that is text, or an SVG, is refused). */
const detect = async (file: File): Promise<string | null> => {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  for (const [mime, signature] of SIGNATURES) if (signature.every((b, i) => bytes[i] === b)) return mime;
  const text = String.fromCharCode(...bytes);
  return text.startsWith('RIFF') && text.slice(8, 12) === 'WEBP' ? 'image/webp' : null;
};

/** In-browser stand-in for the media library (plan 05-A): upload, variants by width, alt, usages, delete. */
export class MediaStore {
  readonly items: MediaItem[] = [];
  readonly settings = { widths: [480, 960, 1600], quality: 82, webp: true, maxBytes: 15 * 1048576, accept: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] };
  private next = 1;

  async upload(file: File, options: UploadOptions): Promise<MediaItem> {
    const mime = await detect(file);
    if (mime === null) throw new EditorError('VALIDATION_FAILED', 'type', { file: 'TYPE' });
    const bitmap = await createImageBitmap(file).catch(() => null);
    const width = bitmap?.width ?? 1200;
    const height = bitmap?.height ?? 800;
    const id = `m${this.next++}`;
    const ext = options.webp ? 'webp' : mime.split('/')[1];
    const widths = [...options.widths.filter((w) => w < width), width];
    const url = (w: number): string => `/demo-media/${id}-${w}.${ext}`;
    const item: MediaItem = {
      id, url: url(width), width, height, alt: options.alt.trim(), filename: file.name, mime, size: file.size,
      srcset: widths.length > 1 ? widths.map((w) => `${url(w)} ${w}w`).join(', ') : '',
      thumbnail: URL.createObjectURL(file), originalWidth: width, originalHeight: height,
    };
    this.items.unshift(item);
    return item;
  }

  list(search: string, page: number): MediaPage {
    const found = this.items.filter((i) => `${i.filename} ${i.alt}`.toLowerCase().includes(search.toLowerCase()));
    return { items: found.slice((page - 1) * 40, page * 40), total: found.length, page, pageSize: 40 };
  }

  describe(id: string, alt: string): MediaItem {
    const index = this.items.findIndex((i) => i.id === id);
    if (index < 0) throw new EditorError('NODE_NOT_FOUND', 'gone');
    this.items[index] = { ...this.items[index]!, alt: alt.trim() };
    return this.items[index]!;
  }

  usages(id: string, page: PageDocument, design: DesignDocument): MediaUsages {
    const needle = `"asset":"${id}"`;
    return { pages: JSON.stringify(page.root).includes(needle) ? [{ pageId: page.documentId, title: page.documentId }] : [],
      design: JSON.stringify(design.classes).includes(needle) };
  }

  remove(id: string, usages: MediaUsages): void {
    if (usages.pages.length > 0 || usages.design) throw new EditorError('MEDIA_IN_USE', 'used');
    const index = this.items.findIndex((i) => i.id === id);
    if (index >= 0) this.items.splice(index, 1);
  }
}
