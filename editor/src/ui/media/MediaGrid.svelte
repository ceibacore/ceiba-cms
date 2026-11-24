<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import type { MediaBrowser } from './browser.svelte';

  /** Search, the images of the library as a group of toggle buttons, and the details of the selected one. */
  let { store, browser, uid }: { store: EditorStore; browser: MediaBrowser; uid: string } = $props();
  const t = $derived(store.t);
  const selected = $derived(browser.selected);
  let alt = $state('');
  $effect(() => { alt = selected?.alt ?? ''; });
  let timer: ReturnType<typeof setTimeout> | undefined;

  function searchSoon(): void {
    clearTimeout(timer);
    timer = setTimeout(() => void browser.load(), 250);
  }
</script>

<div class="library">
  <label for={`${uid}-search`}>{t('media.search')}</label>
  <input id={`${uid}-search`} type="search" bind:value={browser.search} oninput={searchSoon} />
  <div class="grid" role="group" aria-label={t('media.library')} aria-busy={browser.loading}>
    {#each browser.items as item (item.id)}
      <button type="button" class="tile" aria-pressed={selected?.id === item.id} onclick={() => browser.select(item)}
        title={item.filename}>
        <img src={item.thumbnail} alt={item.alt} loading="lazy" />
        <span>{item.filename}</span>
      </button>
    {:else}
      {#if !browser.loading}<p class="empty">{t('media.empty')}</p>{/if}
    {/each}
  </div>
  {#if browser.hasMore}
    <button type="button" class="more" disabled={browser.loading} onclick={() => void browser.load(true)}>{t('media.more')}</button>
  {/if}
  {#if selected}
    <div class="details" aria-live="polite">
      <p><strong>{t('media.selected', { name: selected.filename })}</strong>
        {#if selected.originalWidth && selected.originalHeight}
          · {t('media.dimensions', { width: selected.originalWidth, height: selected.originalHeight })}{/if}</p>
      <label for={`${uid}-alt`}>{t('media.alt')}</label>
      <p class="help" id={`${uid}-alt-help`}>{t('media.altHelp')}</p>
      <div class="row">
        <input id={`${uid}-alt`} type="text" bind:value={alt} aria-describedby={`${uid}-alt-help`} />
        <button type="button" disabled={browser.busy || alt === selected.alt} onclick={() => void browser.describe(alt)}>{t('media.saveAlt')}</button>
      </div>
      <button type="button" class="danger" disabled={browser.busy} onclick={() => void browser.remove()}>{t('media.delete')}</button>
    </div>
  {/if}
  {#if browser.error}<p class="error" role="alert">{browser.error}</p>{/if}
</div>

<style>
  .library { display: grid; gap: .35rem; align-content: start; min-width: 0; }
  label { font-size: .8rem; font-weight: 600; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: .4rem; max-height: 320px; overflow: auto; padding: 2px; }
  .tile { display: grid; gap: .2rem; padding: .25rem; border: 2px solid var(--cpb-border); border-radius: 8px; background: var(--cpb-surface); cursor: pointer; font: inherit; font-size: .65rem; }
  .tile[aria-pressed='true'] { border-color: var(--cpb-accent); background: var(--cpb-accent-soft); }
  .tile img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 4px; }
  .tile span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .details { display: grid; gap: .3rem; border-top: 1px solid var(--cpb-border); padding-top: .4rem; font-size: .8rem; }
  .details p { margin: 0; }
  .help { color: var(--cpb-muted); font-size: .75rem; }
  .row { display: flex; gap: .3rem; }
  input, button { font: inherit; font-size: .8rem; padding: .3rem .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  .row input { flex: 1; min-width: 0; }
  button { cursor: pointer; }
  .more, .danger { justify-self: start; }
  .danger { color: var(--cpb-danger); }
  .empty { font-size: .8rem; color: var(--cpb-muted); }
  .error { color: var(--cpb-danger); font-size: .75rem; margin: 0; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
