import type { MediaItem, MediaMethods, MediaPage, MediaSettings, MediaUsages, ResolvedMedia } from './media-types';

type Request = (url: string, init?: RequestInit) => Promise<Record<string, unknown>>;

/** Media library methods of the reference HTTP transport ({base}/media…, plan 05-A). */
export const mediaMethods = (base: string, request: Request): Required<MediaMethods> => {
  const one = (id: string): string => `${base}/media/${encodeURIComponent(id)}`;
  return {
    async listMedia(search, page) {
      const query = new URLSearchParams({ search, page: String(page) });
      return (await request(`${base}/media?${query}`)) as unknown as MediaPage;
    },
    async uploadMedia(file, options) {
      const form = new FormData();
      form.append('file', file);
      form.append('alt', options.alt);
      form.append('widths', options.widths.join(','));
      form.append('optimize', options.optimize ? '1' : '0');
      form.append('webp', options.webp ? '1' : '0');
      return (await request(`${base}/media`, { method: 'POST', body: form })) as unknown as MediaItem;
    },
    async resolveMedia(ids) {
      if (ids.length === 0) return {};
      const data = await request(`${base}/media/resolve?ids=${ids.map(encodeURIComponent).join(',')}`);
      const media = data.media;
      return (typeof media === 'object' && media !== null && !Array.isArray(media) ? media : {}) as Record<string, ResolvedMedia>;
    },
    async mediaSettings() {
      return (await request(`${base}/media/settings`)) as unknown as MediaSettings;
    },
    async describeMedia(id, alt) {
      return (await request(one(id), {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alt }),
      })) as unknown as MediaItem;
    },
    async mediaUsages(id) {
      const data = await request(`${one(id)}/usages`);
      return { pages: Array.isArray(data.pages) ? data.pages : [], layouts: Array.isArray(data.layouts) ? data.layouts : [],
        design: data.design === true } as MediaUsages;
    },
    async deleteMedia(id) {
      await request(one(id), { method: 'DELETE' });
    },
  };
};
