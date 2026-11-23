<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';

  let { store }: { store: EditorStore } = $props();
  const t = $derived(store.t);
</script>

<div class="toolbar" role="toolbar" aria-label={t('editor.label')}>
  <button type="button" onclick={() => store.undo()} disabled={!store.canUndo} aria-keyshortcuts="Control+Z">
    {t('toolbar.undo')}
  </button>
  <button type="button" onclick={() => store.redo()} disabled={!store.canRedo} aria-keyshortcuts="Control+Shift+Z">
    {t('toolbar.redo')}
  </button>
  <button type="button" class="primary" onclick={() => store.save()}
    disabled={!store.dirty || store.status === 'saving' || store.status === 'conflict'}>
    {t('toolbar.save')}
  </button>
  <span class="status" data-status={store.status}>{t(`status.${store.status}`)}</span>
  {#if store.revision > 0}<span class="revision">{t('toolbar.revision', { revision: store.revision })}</span>{/if}
</div>

<style>
  .toolbar { display: flex; gap: .5rem; align-items: center; padding: .5rem .75rem; border-bottom: 1px solid var(--cpb-border); }
  button { font: inherit; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button:disabled { opacity: .5; cursor: not-allowed; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 2px; }
  .status { margin-left: auto; font-size: .875rem; }
  .status[data-status='conflict'], .status[data-status='offline'], .status[data-status='load-error'] { color: var(--cpb-danger); font-weight: 600; }
  .revision { font-size: .75rem; color: var(--cpb-muted); }
</style>
