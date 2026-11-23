<script lang="ts">
  import type { NodeStyles, StyleTarget } from '../../core';
  import { PROPERTY_BY_NAME, STYLE_MATRIX } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import { STYLE_GROUPS } from './groups';
  import StyleField from './StyleField.svelte';

  /**
   * Styles of the selected node (plan 04-C). The width being edited is the canvas width (store.viewport), so what
   * the controls change is what the canvas shows; states apply on base only.
   */
  let { store, styles, uid, title, onSet, children }: {
    store: EditorStore; styles: NodeStyles | undefined; uid: string; title?: string;
    onSet: (next: NodeStyles | null) => void; children?: import('svelte').Snippet;
  } = $props();
  const t = $derived(store.t);
  const target = $derived<StyleTarget>(store.styleState !== null ? { breakpoint: null, state: store.styleState }
    : { breakpoint: store.viewport, state: null });
</script>

<details class="styles" open>
  <summary>{title ?? t('styles.title')}</summary>
  <div class="target">
    <label for={`${uid}-bp`}>{t('styles.target')}</label>
    <select id={`${uid}-bp`} value={store.viewport ?? ''} onchange={(e) => { store.viewport = e.currentTarget.value || null; store.styleState = null; }}>
      <option value="">{t('viewport.base')}</option>
      {#each store.design.breakpoints as bp (bp.id)}<option value={bp.id}>{bp.id} · {bp.minWidth}px</option>{/each}
    </select>
    <label for={`${uid}-state`}>{t('styles.state')}</label>
    <select id={`${uid}-state`} value={store.styleState ?? ''} disabled={store.viewport !== null}
      onchange={(e) => { store.styleState = e.currentTarget.value || null; }}>
      <option value="">{t('styles.normal')}</option>
      {#each STYLE_MATRIX.states as state (state)}<option value={state}>{state}</option>{/each}
    </select>
  </div>
  {@render children?.()}
  {#each STYLE_GROUPS as group (group.key)}
    <details class="group">
      <summary>{t(group.key)}</summary>
      {#each group.properties as name (name)}
        {@const spec = PROPERTY_BY_NAME.get(name)}
        {#if spec}<StyleField {store} {styles} {target} {spec} {onSet} id={`${uid}-style-${name}`} />{/if}
      {/each}
    </details>
  {/each}
</details>

<style>
  .styles { margin-top: 1rem; border-top: 1px solid var(--cpb-border); padding-top: .5rem; }
  summary { cursor: pointer; font-size: .8rem; font-weight: 700; }
  .group { margin: .35rem 0; padding-left: .25rem; }
  .group summary { font-weight: 600; font-size: .78rem; }
  .target { display: grid; grid-template-columns: auto 1fr; gap: .25rem .5rem; align-items: center; margin: .5rem 0; }
  label { font-size: .75rem; font-weight: 600; }
  select { font: inherit; font-size: .8rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
