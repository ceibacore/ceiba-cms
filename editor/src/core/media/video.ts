/** A YouTube or Vimeo video (plan 05 D-2), played from its no-cookie / dnt URL only after a click. */
export interface VideoEmbed {
  readonly provider: 'youtube' | 'vimeo';
  readonly id: string;
  readonly embed: string;
  readonly watch: string;
}

const YOUTUBE = /^https?:\/\/(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&#/].*)?$/;
const VIMEO = /^https?:\/\/(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]{6,12})(?:[?#/].*)?$/;

/** Same parser as src/Media/Domain/VideoEmbed.php; null for any other URL. */
export const parseVideo = (url: unknown): VideoEmbed | null => {
  if (typeof url !== 'string' || url.length > 300) return null;
  const value = url.replace(/^[ \t\n\r\0\x0B]+|[ \t\n\r\0\x0B]+$/g, '');
  const youtube = YOUTUBE.exec(value)?.[1];
  if (youtube) {
    return { provider: 'youtube', id: youtube, embed: `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`,
      watch: `https://www.youtube.com/watch?v=${youtube}` };
  }
  const vimeo = VIMEO.exec(value)?.[1];
  return vimeo ? { provider: 'vimeo', id: vimeo, embed: `https://player.vimeo.com/video/${vimeo}?autoplay=1&dnt=1`,
    watch: `https://vimeo.com/${vimeo}` } : null;
};
