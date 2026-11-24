<script lang="ts">
  import { untrack } from 'svelte';
  import type { MediaSettings } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import { MediaBrowser } from './browser.svelte';
  import MediaGrid from './MediaGrid.svelte';
  import UploadForm from './UploadForm.svelte';

  /**
   * Media dialog (plan 05-A), opened by store.media.pick(): choose a library image, upload one (it is selected
   * when it arrives), describe it, or delete it when nothing uses it. Escape or Close returns focus to the opener.
   */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  const browser = $derived(new MediaBrowser(store));
  let dialog: HTMLDialogElement | undefined = $state();
  let opener: Element | null = null;
  let settings = $state.raw<MediaSettings | null>(null);
  const request = $derived(store.media.request);

  $effect(() => {
    if (!dialog) return;
    if (request && !dialog.open) {
      opener = (dialog.getRootNode() as Document | ShadowRoot).activeElement;
      dialog.showModal();
      untrack(() => {
        browser.select(null);
        void browser.load();
        void store.media.loadSettings().then((loaded) => { settings = loaded; });
      });
    } else if (!request && dialog.open) {
      dialog.close();
    }
  });

  function use(): void {
    const item = browser.selected;
    if (!item || !request) return;
    store.media.remember(item);
    request.onPick({ asset: item.id });
    store.media.close();
  }
</script>

<dialog bind:this={dialog} aria-labelledby={`${uid}-media-title`}
  onclose={() => { store.media.close(); (opener as HTMLElement | null)?.focus?.(); }}>
  <h2 id={`${uid}-media-title`}>{t('media.title')}</h2>
  <div class="body">
    <MediaGrid {store} {browser} uid={`${uid}-media`} />
    <UploadForm {store} {browser} {settings} uid={`${uid}-media`} />
  </div>
  <div class="actions">
    <button type="button" onclick={() => store.media.close()}>{t('media.close')}</button>
    <button type="button" class="primary" disabled={!browser.selected || browser.busy} onclick={use}>{t('media.use')}</button>
  </div>
</dialog>

<style>
  dialog { border: 1px solid var(--cpb-border); border-radius: 10px; padding: 1rem; width: min(860px, 94vw); color: inherit; font: inherit; }
  dialog::backdrop { background: rgb(15 23 42 / .45); }
  h2 { font-size: 1rem; margin: 0 0 .75rem; }
  .body { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 1rem; }
  .actions { display: flex; justify-content: flex-end; gap: .5rem; margin-top: 1rem; }
  button { font: inherit; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button:disabled { opacity: .5; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
  @media (max-width: 700px) { .body { grid-template-columns: 1fr; } }
</style>
