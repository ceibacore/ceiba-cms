<script lang="ts">
  import { tick } from 'svelte';
  import type { EditorStore } from '../model/store.svelte';

  let { store, uid, onView }: { store: EditorStore; uid: string; onView: ((revision: number) => void) | null } = $props();
  const t = $derived(store.t);
  let box: HTMLElement | undefined = $state();

  // The conflict takes the focus: it needs a decision (plan 03: never resolved automatically).
  $effect(() => {
    if (store.status === 'conflict') void tick().then(() => box?.focus());
  });
</script>

{#if store.status === 'conflict'}
  <div class="conflict" role="alertdialog" aria-modal="false" tabindex="-1" bind:this={box}
    aria-labelledby={`${uid}-conflict-title`} aria-describedby={`${uid}-conflict-body`}>
    <strong id={`${uid}-conflict-title`}>{t('conflict.title')}</strong>
    <p id={`${uid}-conflict-body`}>
      {t('conflict.body', { revision: store.conflictRevision ?? '?', base: store.revision })}
    </p>
    <div class="actions">
      <button type="button" class="primary" onclick={() => store.resolve('keep-mine')}>{t('conflict.keepMine')}</button>
      <button type="button" onclick={() => store.resolve('take-theirs')}>{t('conflict.takeTheirs')}</button>
      {#if onView && store.conflictRevision}
        <button type="button" onclick={() => onView?.(store.conflictRevision as number)}>{t('conflict.view')}</button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .conflict { margin: .5rem .75rem 0; padding: .75rem; border: 2px solid var(--cpb-danger); border-radius: 8px; background: #fef2f2; }
  .conflict:focus-visible { outline: 2px solid var(--cpb-danger); outline-offset: 2px; }
  p { margin: .25rem 0 .5rem; font-size: .875rem; }
  .actions { display: flex; flex-wrap: wrap; gap: .5rem; }
  button { font: inherit; font-size: .85rem; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button.primary { background: var(--cpb-danger); border-color: var(--cpb-danger); color: #fff; }
  button:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 2px; }
</style>
