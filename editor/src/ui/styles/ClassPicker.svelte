<script lang="ts">
  import type { NodeRecord, NodeStyles } from '../../core';
  import { setClasses } from '../../core';
  import type { EditorStore } from '../model/store.svelte';

  /** Site classes of a node, in the order they apply (later ones win). */
  let { store, node, uid }: { store: EditorStore; node: NodeRecord; uid: string } = $props();
  const t = $derived(store.t);
  const styles = $derived(node.fields.styles as NodeStyles | undefined);
  const applied = $derived(styles?.classes ?? []);
  const available = $derived(Object.entries(store.design.classes).filter(([id]) => !applied.includes(id)));

  function apply(classes: readonly string[]): void {
    const next = setClasses(styles, classes);
    store.run(next === null ? { kind: 'updateFields', id: node.id, set: {}, unset: ['styles'] }
      : { kind: 'updateFields', id: node.id, set: { styles: next } });
  }
</script>

{#if Object.keys(store.design.classes).length > 0}
  <div class="classes">
    <label for={`${uid}-add-class`}>{t('styles.classes')}</label>
    <ul>
      {#each applied as id (id)}
        <li>{store.design.classes[id]?.name ?? id}
          <button type="button" aria-label={t('styles.removeClass', { name: store.design.classes[id]?.name ?? id })}
            onclick={() => apply(applied.filter((c) => c !== id))}>×</button></li>
      {/each}
    </ul>
    {#if available.length > 0}
      <select id={`${uid}-add-class`} value="" onchange={(e) => { if (e.currentTarget.value) apply([...applied, e.currentTarget.value]); }}>
        <option value="">{t('styles.addClass')}</option>
        {#each available as [id, cls] (id)}<option value={id}>{cls.name ?? id}</option>{/each}
      </select>
    {/if}
  </div>
{/if}

<style>
  .classes { margin: .5rem 0; display: grid; gap: .25rem; }
  label { font-size: .75rem; font-weight: 600; }
  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .25rem; }
  li { font-size: .75rem; padding: .1rem .2rem .1rem .5rem; border-radius: 999px; background: var(--cpb-accent-soft); display: flex; align-items: center; gap: .25rem; }
  button { font: inherit; border: none; background: none; cursor: pointer; padding: 0 .25rem; }
  select { font: inherit; font-size: .8rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
