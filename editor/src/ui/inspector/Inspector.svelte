<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import type { NodeStyles } from '../../core';
  import ClassPicker from '../styles/ClassPicker.svelte';
  import StylesPanel from '../styles/StylesPanel.svelte';
  import Advanced from './advanced/Advanced.svelte';
  import Field from './Field.svelte';
  import { fieldsFor } from './fields';

  let { store, uid, canTemplates = false, onRemoved, onSaveTemplate }: {
    store: EditorStore; uid: string; canTemplates?: boolean; onRemoved: () => void; onSaveTemplate: () => void;
  } = $props();
  const t = $derived(store.t);
  const node = $derived(store.selection ? store.tree.nodes[store.selection] : undefined);
  const rule = $derived(node ? store.catalogue?.get(node.type) : undefined);
  const fields = $derived(rule ? fieldsFor(rule) : []);
  const values = $derived.by(() => {
    const value = node?.fields.props;
    return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  });

  function setProp(key: string, value: unknown): void {
    if (!node) return;
    if (value === null || value === '') store.run({ kind: 'updateProps', id: node.id, set: {}, unset: [key] });
    else store.run({ kind: 'updateProps', id: node.id, set: { [key]: value } });
  }

  /** The structure label lives in `label`: the server picks the component view by `name`, so it is never touched here. */
  function rename(value: string): void {
    if (!node) return;
    const name = typeof node.fields.name === 'string' ? node.fields.name : null;
    store.run({ kind: 'rename', id: node.id, name, label: value.trim() === '' ? null : value });
  }

  function setStyles(next: NodeStyles | null): void {
    if (!node) return;
    store.run(next === null ? { kind: 'updateFields', id: node.id, set: {}, unset: ['styles'] }
      : { kind: 'updateFields', id: node.id, set: { styles: next } });
  }

  function remove(): void {
    if (node && store.run({ kind: 'remove', id: node.id }, ['announce.removed'])) onRemoved();
  }
</script>

<section class="inspector" aria-labelledby={`${uid}-inspector-title`}>
  <h2 id={`${uid}-inspector-title`}>{t('inspector.title')}</h2>
  {#if !node}
    <p class="hint">{t('inspector.none')}</p>
  {:else}
    {#key node.id}
      <p class="type">{rule?.label ?? node.type}</p>
      <div class="field">
        <label for={`${uid}-name`}>{t('inspector.name')}</label>
        <input id={`${uid}-name`} type="text" value={typeof node.fields.label === 'string' ? node.fields.label : ''}
          oninput={(e) => rename(e.currentTarget.value)} />
      </div>
      {#if !rule}
        <p class="locked" role="note">{t('inspector.locked')}</p>
      {:else}
        {#each fields as field (field.key)}
          <Field {field} {t} id={`${uid}-prop-${field.key}`} value={values[field.key]}
            onChange={(value) => setProp(field.key, value)} />
        {/each}
      {/if}
      {#if rule}
        <StylesPanel {store} {uid} styles={node.fields.styles as NodeStyles | undefined} onSet={(next) => setStyles(next)}>
          <ClassPicker {store} {node} {uid} />
        </StylesPanel>
        <Advanced {store} {node} {uid} />
      {/if}
      <div class="actions">
        <button type="button" onclick={() => node && store.run({ kind: 'duplicate', id: node.id })}>{t('inspector.duplicate')}</button>
        {#if canTemplates}<button type="button" onclick={onSaveTemplate}>{t('inspector.saveTemplate')}</button>{/if}
        <button type="button" class="danger" onclick={remove}>{t('inspector.remove')}</button>
      </div>
    {/key}
  {/if}
</section>

<style>
  .inspector { padding: .5rem .75rem; overflow: auto; border-left: 1px solid var(--cpb-border); }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; margin: 0 0 .5rem; color: var(--cpb-muted); }
  .hint, .locked { font-size: .85rem; color: var(--cpb-muted); }
  .locked { color: var(--cpb-danger); }
  .type { font-weight: 700; margin: 0 0 .75rem; }
  .field { display: grid; gap: .25rem; margin-bottom: .75rem; }
  label { font-size: .8rem; font-weight: 600; }
  input { font: inherit; font-size: .875rem; padding: .35rem .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  .actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
  button { font: inherit; font-size: .8rem; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button.danger { color: var(--cpb-danger); }
  button:focus-visible, input:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
