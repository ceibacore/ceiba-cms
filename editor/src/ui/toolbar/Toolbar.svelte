<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';

  let { store, serverView, onServerView }: {
    store: EditorStore; serverView: boolean; onServerView: (() => void) | null;
  } = $props();
  const t = $derived(store.t);
  const publication = $derived(
    store.publishedRevision === null ? t('publication.none')
      : store.unpublished ? t('publication.pending', { revision: store.publishedRevision })
        : t('publication.current'),
  );
</script>

<div class="toolbar" role="toolbar" aria-label={t('editor.label')}>
  <button type="button" onclick={() => store.undo()} disabled={!store.canUndo} aria-keyshortcuts="Control+Z">
    {t('toolbar.undo')}
  </button>
  <button type="button" onclick={() => store.redo()} disabled={!store.canRedo} aria-keyshortcuts="Control+Shift+Z">
    {t('toolbar.redo')}
  </button>
  <button type="button" onclick={() => store.save()} aria-keyshortcuts="Control+S"
    disabled={!store.dirty || store.status === 'saving' || store.status === 'conflict'}>
    {t('toolbar.save')}
  </button>
  {#if store.canPublish}
    <!-- A site part publishes its document and rules together (plan 06-C). -->
    <button type="button" class="primary" onclick={() => (store.part ? store.part.publish() : store.publish())}
      disabled={store.publishing || store.status !== 'ready' || !(store.unpublished || store.part?.rulesUnpublished)}>
      {store.publishing ? t('toolbar.publishing') : t('toolbar.publish')}
    </button>
  {/if}
  {#if store.part}
    <button type="button" aria-pressed={store.part.open} onclick={() => { store.part!.open = !store.part!.open; }}>{t('parts.open')}</button>
  {/if}
  {#if store.designAvailable}
    <button type="button" aria-pressed={store.designOpen} onclick={() => { store.designOpen = !store.designOpen; }}>{t('design.open')}</button>
  {/if}
  {#if onServerView}
    <button type="button" aria-pressed={serverView} onclick={onServerView}>{t('toolbar.serverView')}</button>
  {/if}
  <span class="status" data-status={store.status}>{t(`status.${store.status}`)}</span>
  {#if store.revision > 0}
    <span class="revision">{t('toolbar.revision', { revision: store.revision })} · <span data-publication>{publication}</span></span>
  {/if}
</div>

<style>
  .toolbar { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; padding: .5rem .75rem; border-bottom: 1px solid var(--cpb-border); }
  button { font: inherit; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button:disabled { opacity: .5; cursor: not-allowed; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button[aria-pressed='true'] { background: var(--cpb-accent-soft); border-color: var(--cpb-accent); }
  button:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 2px; }
  .status { margin-left: auto; font-size: .875rem; }
  .status[data-status='conflict'], .status[data-status='offline'], .status[data-status='load-error'] { color: var(--cpb-danger); font-weight: 600; }
  .revision { font-size: .75rem; color: var(--cpb-muted); }
</style>
