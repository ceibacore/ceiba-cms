<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';

  /** Width of the canvas: base (phones) or a breakpoint of the site; the style controls edit the same target. */
  let { store }: { store: EditorStore } = $props();
  const t = $derived(store.t);
</script>

<div class="viewport" role="radiogroup" aria-label={t('viewport.label')}>
  <button type="button" role="radio" aria-checked={store.viewport === null} onclick={() => { store.viewport = null; }}>
    {t('viewport.base')}
  </button>
  {#each store.design.breakpoints as bp (bp.id)}
    <button type="button" role="radio" aria-checked={store.viewport === bp.id} onclick={() => { store.viewport = bp.id; }}>
      {bp.id} · {bp.minWidth}px
    </button>
  {/each}
</div>

<style>
  .viewport { display: flex; flex-wrap: wrap; gap: .25rem; margin-bottom: .5rem; }
  button { font: inherit; font-size: .75rem; padding: .2rem .5rem; border: 1px solid var(--cpb-border); border-radius: 999px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button[aria-checked='true'] { background: var(--cpb-accent-soft); border-color: var(--cpb-accent); font-weight: 600; }
  button:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
