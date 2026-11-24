<script lang="ts">
  import type { AssetRef } from '../../core';
  import { isAssetRef } from '../../core';
  import type { EditorStore } from '../model/store.svelte';

  /** Images of a gallery (plan 05-B): add from the library, caption, per-use alt, reorder and remove. */
  interface Item { image: AssetRef; caption?: string }
  let { store, value, id, label, onChange }: {
    store: EditorStore; value: unknown; id: string; label: string; onChange: (next: Item[] | null) => void;
  } = $props();
  const t = $derived(store.t);
  const items = $derived((Array.isArray(value) ? value : [])
    .filter((i): i is Item => typeof i === 'object' && i !== null && isAssetRef((i as { image?: unknown }).image)));

  function commit(next: Item[]): void {
    onChange(next.length === 0 ? null : next);
  }

  function update(index: number, patch: Partial<Item>): void {
    commit(items.map((item, i) => {
      if (i !== index) return item;
      const next = { ...item, ...patch };
      if (next.caption === '') delete next.caption;
      return next;
    }));
  }

  function move(index: number, by: number): void {
    const next = [...items];
    const [item] = next.splice(index, 1);
    next.splice(index + by, 0, item!);
    commit(next);
  }

  const add = (): void => store.media.pick(null, (ref) => commit([...items, { image: { asset: ref.asset } }]));
</script>

<fieldset class="gallery" aria-describedby={items.length === 0 ? `${id}-empty` : undefined}>
  <legend>{label}</legend>
  {#each items as item, index (index)}
    {@const media = store.media.resolved[item.image.asset]}
    {@const n = index + 1}
    <div class="item" role="group" aria-label={t('gallery.item', { n })}>
      {#if media}<img src={media.url} alt="" />{:else}<span class="missing">{t('media.missing')}</span>{/if}
      <div class="fields">
        <label for={`${id}-${index}-caption`}>{t('gallery.caption')}</label>
        <input id={`${id}-${index}-caption`} type="text" value={item.caption ?? ''}
          onchange={(e) => update(index, { caption: e.currentTarget.value.trim() })} />
        <label for={`${id}-${index}-alt`}>{t('media.useAlt')}</label>
        <input id={`${id}-${index}-alt`} type="text" value={item.image.alt ?? ''} placeholder={media?.alt ?? ''}
          onchange={(e) => update(index, { image: e.currentTarget.value.trim() === '' ? { asset: item.image.asset }
            : { asset: item.image.asset, alt: e.currentTarget.value } })} />
        <div class="actions">
          <button type="button" aria-label={t('gallery.up', { n })} disabled={index === 0} onclick={() => move(index, -1)}>↑</button>
          <button type="button" aria-label={t('gallery.down', { n })} disabled={index === items.length - 1} onclick={() => move(index, 1)}>↓</button>
          <button type="button" aria-label={t('gallery.remove', { n })} onclick={() => commit(items.filter((_, i) => i !== index))}>×</button>
        </div>
      </div>
    </div>
  {:else}
    <p class="empty" id={`${id}-empty`}>{t('gallery.empty')}</p>
  {/each}
  <button type="button" {id} onclick={add}>{t('gallery.add')}</button>
</fieldset>

<style>
  .gallery { border: 1px solid var(--cpb-border); border-radius: 6px; padding: .4rem .5rem; margin: 0 0 .75rem; display: grid; gap: .5rem; }
  legend { font-size: .8rem; font-weight: 600; }
  .item { display: grid; grid-template-columns: 48px 1fr; gap: .4rem; }
  img, .missing { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; border: 1px solid var(--cpb-border); font-size: .6rem; }
  .fields { display: grid; gap: .15rem; }
  label { font-size: .7rem; font-weight: 600; }
  .actions { display: flex; gap: .25rem; }
  input, button { font: inherit; font-size: .8rem; padding: .25rem .45rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  button { cursor: pointer; justify-self: start; }
  button:disabled { opacity: .4; }
  .empty { margin: 0; font-size: .8rem; color: var(--cpb-muted); }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
