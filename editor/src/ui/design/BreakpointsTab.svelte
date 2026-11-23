<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import { withBreakpoints } from './ops';

  /** Breakpoints of the site (mobile-first min-widths, ascending); the compiler refuses unordered or repeated ones. */
  let { store }: { store: EditorStore } = $props();
  const t = $derived(store.t);

  function setWidth(id: string, raw: string): void {
    const minWidth = Number(raw);
    if (!Number.isInteger(minWidth)) return;
    store.designSession.update(withBreakpoints(store.design, store.design.breakpoints.map((b) => (b.id === id ? { ...b, minWidth } : b))));
  }
</script>

<ul>
  {#each store.design.breakpoints as bp (bp.id)}
    <li>
      <code>{bp.id}</code>
      <label>{t('design.minWidth')}
        <input type="number" min="1" max="4000" value={bp.minWidth} onchange={(e) => setWidth(bp.id, e.currentTarget.value)} />
      </label>
    </li>
  {/each}
</ul>

<style>
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .35rem; }
  li { display: flex; align-items: center; gap: .5rem; font-size: .8rem; }
  label { display: flex; align-items: center; gap: .35rem; }
  input { width: 6rem; font: inherit; font-size: .8rem; padding: .2rem .35rem; border: 1px solid var(--cpb-border); border-radius: 5px; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
