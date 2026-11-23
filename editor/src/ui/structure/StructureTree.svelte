<script lang="ts">
  import { tick } from 'svelte';
  import { flatten } from '../model/flatten';
  import type { EditorStore } from '../model/store.svelte';
  import { treeAction } from './keyboard';

  let { store, onEdit }: { store: EditorStore; onEdit: (id: string) => boolean } = $props();
  const t = $derived(store.t);
  const items = $derived(flatten(store.tree));
  let list: HTMLElement | undefined = $state();

  const labelOf = (id: string): string => {
    const node = store.tree.nodes[id];
    if (!node) return id;
    const name = typeof node.fields.label === 'string' && node.fields.label !== '' ? node.fields.label : null;
    const rule = store.catalogue?.get(node.type);
    return name ? `${name} (${rule?.label ?? node.type})` : rule?.label ?? node.type;
  };

  /** Moves keyboard focus to the item of a node (after insert, move or selection by keys). */
  export async function focusItem(id: string | null): Promise<void> {
    await tick();
    const target = id ? list?.querySelector<HTMLElement>(`[data-node-id="${CSS.escape(id)}"]`) : null;
    (target ?? list)?.focus();
  }

  async function onkeydown(event: KeyboardEvent): Promise<void> {
    if ((event.key === 'F2' || event.key === 'Enter') && store.selection && !event.altKey) {
      if (onEdit(store.selection)) event.preventDefault();
      return;
    }
    const action = treeAction(store.tree, store.selection, event);
    if (!action) return;
    event.preventDefault();
    if (action.type === 'select') store.select(action.id);
    else if (action.type === 'undo') store.undo();
    else if (action.type === 'redo') store.redo();
    else {
      const kind = action.command.kind;
      store.run(action.command, kind === 'remove' ? ['announce.removed'] : kind === 'move' ? ['announce.moved'] : undefined);
    }
    await focusItem(store.selection);
  }
</script>

<section class="structure" aria-labelledby="cpb-structure-title">
  <h2 id="cpb-structure-title">{t('structure.title')}</h2>
  <p class="help" id="cpb-structure-help">{t('structure.help')}</p>
  {#if items.length === 0}
    <p class="empty">{t('structure.empty')}</p>
  {:else}
    <ul role="tree" aria-labelledby="cpb-structure-title" aria-describedby="cpb-structure-help" bind:this={list}
      tabindex={store.selection ? -1 : 0} {onkeydown}>
      {#each items as item (item.id)}
        <li role="treeitem" aria-level={item.depth} aria-setsize={item.siblings} aria-posinset={item.index + 1}
          aria-selected={store.selection === item.id} tabindex={store.selection === item.id ? 0 : -1}
          data-node-id={item.id} style:padding-left={`${(item.depth - 1) * 14 + 6}px`}
          onclick={() => store.select(item.id)} onfocus={() => store.selection !== item.id && store.select(item.id)}
          onkeydown={() => {}}>
          {labelOf(item.id)}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .structure { padding: .5rem .75rem; overflow: auto; border-top: 1px solid var(--cpb-border); }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; margin: 0; color: var(--cpb-muted); }
  .help, .empty { font-size: .75rem; color: var(--cpb-muted); margin: .25rem 0 .5rem; }
  ul { list-style: none; margin: 0; padding: 0; outline: none; }
  li { font-size: .85rem; padding: .25rem .375rem; border-radius: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  li[aria-selected='true'] { background: var(--cpb-accent-soft); color: var(--cpb-accent-strong); font-weight: 600; }
  li:focus-visible, ul:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: -2px; }
</style>
