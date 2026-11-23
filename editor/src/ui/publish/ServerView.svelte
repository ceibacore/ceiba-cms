<script lang="ts">
  import { canvasDocument } from '../canvas/frame';
  import type { EditorStore } from '../model/store.svelte';

  let { store, revision, stylesheets = [], onBack }: {
    store: EditorStore; revision: number; stylesheets?: readonly string[]; onBack: () => void;
  } = $props();
  const t = $derived(store.t);
  let html = $state<string | null>(null);

  /** The page as the public renderer draws it, in a frame that can run nothing (sandbox without permissions). */
  $effect(() => {
    const render = store.session.transport.render;
    const target = revision;
    html = null;
    if (!render) return;
    render.call(store.session.transport, store.session.pageId, target)
      .then((value) => { if (target === revision) html = value; })
      .catch((error: unknown) => store.fail(error));
  });

  const srcdoc = $derived(html === null ? '' : canvasDocument(stylesheets).replace('<body></body>', `<body>${html}</body>`));
</script>

<div class="server">
  <div class="bar">
    <strong>{t('server.title', { revision })}</strong>
    <button type="button" onclick={onBack}>{t('server.back')}</button>
  </div>
  {#if store.dirty}<p class="note">{t('server.dirty')}</p>{/if}
  {#if html === null}
    <p class="note" role="status">{t('server.loading')}</p>
  {:else}
    <iframe title={t('server.frame')} sandbox="" {srcdoc}></iframe>
  {/if}
</div>

<style>
  .server { background: var(--cpb-canvas); padding: .5rem 1rem 1rem; min-height: 0; display: flex; flex-direction: column; gap: .5rem; }
  .bar { display: flex; align-items: center; gap: .75rem; }
  .note { margin: 0; font-size: .8rem; color: var(--cpb-muted); }
  button { margin-left: auto; font: inherit; font-size: .8rem; padding: .3rem .7rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  iframe { flex: 1; width: 100%; min-height: 480px; border: 1px solid var(--cpb-border); border-radius: 8px; background: #fff; }
</style>
