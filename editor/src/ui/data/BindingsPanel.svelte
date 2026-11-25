<script lang="ts">
  import type { Binding, NodeRecord, TransformName } from '../../core';
  import { bindableProps, readBindings, TRANSFORMS, withBinding } from '../../core';
  import type { EditorStore } from '../model/store.svelte';

  /** Fields of each result shown in this node's props (plan 07-C, D-4): only inside a query block. */
  let { store, node, uid }: { store: EditorStore; node: NodeRecord; uid: string } = $props();
  const t = $derived(store.t);

  const query = $derived.by(() => {
    for (let id = node.parent; id !== null; id = store.tree.nodes[id]?.parent ?? null) {
      const parent = store.tree.nodes[id];
      if (parent?.type === 'query') return (parent.fields.props ?? {}) as Record<string, unknown>;
    }
    return null;
  });
  const source = $derived(typeof query?.source === 'string' ? query.source : '');
  const schema = $derived(store.data.schemas[source] ?? null);
  const rule = $derived(store.catalogue?.get(node.type));
  const bindable = $derived(rule ? bindableProps(rule.editorControls) : []);
  const bindings = $derived(readBindings(node.fields.bindings));

  $effect(() => { if (source !== '') void store.data.schema(source); });

  type Change = { field?: string; transform?: TransformName | undefined; fallback?: string | undefined };

  function set(prop: string, change: Change): void {
    const merged: Record<string, unknown> = { ...(bindings[prop] ?? { field: '' }), ...change };
    for (const key of Object.keys(merged)) if (merged[key] === undefined) delete merged[key];
    const next = withBinding(node.fields.bindings, prop, merged as unknown as Binding);
    store.run(next === null ? { kind: 'updateFields', id: node.id, set: {}, unset: ['bindings'] }
      : { kind: 'updateFields', id: node.id, set: { bindings: next } });
  }
</script>

{#if query && schema && bindable.length > 0}
  <section class="bindings" aria-labelledby={`${uid}-bind-title`}>
    <h3 id={`${uid}-bind-title`}>{t('data.bindings')}</h3>
    <p class="hint">{t('data.bindingsHint')}</p>
    {#each bindable as prop (prop)}
      {@const b = bindings[prop]}
      <div class="prop">
        <label for={`${uid}-bind-${prop}`}>{prop}</label>
        <select id={`${uid}-bind-${prop}`} value={b?.field ?? ''} onchange={(e) => set(prop, { field: e.currentTarget.value })}>
          <option value="">{t('data.noBinding')}</option>
          {#each schema.fields as f (f.name)}<option value={f.name}>{f.label}</option>{/each}
          <option value="_url">{t('data.recordUrl')}</option>
        </select>
        {#if b}
          <select aria-label={t('data.transform')} value={b.transform ?? ''}
            onchange={(e) => set(prop, { transform: (e.currentTarget.value || undefined) as TransformName | undefined })}>
            <option value="">{t('data.noTransform')}</option>
            {#each TRANSFORMS as name (name)}<option value={name}>{name}</option>{/each}
          </select>
          <input aria-label={t('data.fallback')} placeholder={t('data.fallback')} value={b.fallback ?? ''}
            onchange={(e) => set(prop, { fallback: e.currentTarget.value || undefined })} />
        {/if}
      </div>
    {/each}
  </section>
{/if}

<style>
  .bindings { border-top: 1px solid var(--cpb-border); padding-top: .5rem; margin-top: .5rem; }
  h3 { font-size: .8rem; margin: 0 0 .25rem; }
  .hint { font-size: .75rem; color: var(--cpb-muted); margin: 0 0 .5rem; }
  .prop { display: grid; gap: .25rem; margin-bottom: .6rem; }
  label { font-size: .8rem; font-weight: 600; }
  select, input { font: inherit; font-size: .85rem; padding: .3rem .45rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
</style>
