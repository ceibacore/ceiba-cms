<script lang="ts">
  import type { NodeStyles } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import StylesPanel from '../styles/StylesPanel.svelte';
  import { CLASS_ID, withClass, withClassStyles, withoutClass } from './ops';

  /** Site classes: create, rename, edit their styles (same controls as a node) and delete when unused. */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  const classes = $derived(Object.entries(store.design.classes));
  let editing = $state<string | null>(null);
  let newId = $state('');
  let newName = $state('');
  let message = $state<string | null>(null);

  function add(): void {
    if (!CLASS_ID.test(newId) || newId in store.design.classes) { message = t('design.badId'); return; }
    message = null;
    store.designSession.update(withClass(store.design, newId, newName.trim() || newId));
    editing = newId;
    newId = '';
    newName = '';
  }

  async function remove(id: string): Promise<void> {
    const pages = (await store.session.transport.designUsages?.('class', id).catch(() => [])) ?? [];
    if (pages.length > 0) { message = t('design.inUse', { name: id, where: pages.map((p) => p.title).join(', ') }); return; }
    message = null;
    if (editing === id) editing = null;
    store.designSession.update(withoutClass(store.design, id));
  }
</script>

<ul>
  {#each classes as [id, cls] (id)}
    <li>
      <input aria-label={`${t('design.name')} · ${id}`} value={cls.name ?? id}
        onchange={(e) => store.designSession.update(withClass(store.design, id, e.currentTarget.value))} />
      <code>.{id}</code>
      <button type="button" aria-pressed={editing === id} aria-label={t('design.edit', { name: cls.name ?? id })}
        onclick={() => { editing = editing === id ? null : id; }}>✎</button>
      <button type="button" aria-label={t('design.delete', { name: cls.name ?? id })} onclick={() => remove(id)}>×</button>
    </li>
  {/each}
</ul>
<div class="add">
  <input aria-label={t('design.id')} placeholder="card" bind:value={newId} />
  <input aria-label={t('design.name')} placeholder="Card" bind:value={newName} />
  <button type="button" onclick={add}>{t('design.add')}</button>
</div>
{#if message}<p class="message" role="alert">{message}</p>{/if}
{#if editing && store.design.classes[editing]}
  {@const id = editing}
  <StylesPanel {store} uid={`${uid}-class`} styles={store.design.classes[id]?.styles as NodeStyles | undefined}
    title={t('design.classStyles', { name: store.design.classes[id]?.name ?? id })}
    onSet={(next) => store.designSession.update(withClassStyles(store.design, id, next))} />
{/if}

<style>
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .25rem; }
  li { display: grid; grid-template-columns: 1fr auto auto auto; gap: .25rem; align-items: center; font-size: .78rem; }
  input { font: inherit; font-size: .78rem; padding: .2rem .35rem; border: 1px solid var(--cpb-border); border-radius: 5px; min-width: 0; }
  .add { display: grid; grid-template-columns: 1fr 1fr auto; gap: .25rem; margin-top: .5rem; }
  button { font: inherit; font-size: .78rem; padding: .2rem .5rem; border: 1px solid var(--cpb-border); border-radius: 5px; background: var(--cpb-surface); cursor: pointer; }
  button[aria-pressed='true'] { background: var(--cpb-accent-soft); }
  .message { color: var(--cpb-danger); font-size: .75rem; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
