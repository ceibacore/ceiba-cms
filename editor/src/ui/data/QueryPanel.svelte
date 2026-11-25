<script lang="ts">
  import { untrack } from 'svelte';
  import type { DataSourceSchema, NodeRecord } from '../../core';
  import { formToQuery, queryToForm } from '../../core';
  import type { MessageKey } from '../i18n';
  import type { EditorStore } from '../model/store.svelte';
  import QueryRows from './QueryRows.svelte';

  /** A query block (plan 07-C): source, typed filters, order, size, pages and visitor parameters; one undoable command. */
  let { store, node, uid }: { store: EditorStore; node: NodeRecord; uid: string } = $props();
  const t = $derived(store.t);
  const form = $state(untrack(() => queryToForm(node.fields.props)));
  const schema = $derived<DataSourceSchema | null>(store.data.schemas[form.source] ?? null);
  let error = $state<string | null>(null);
  const id = (name: string): string => `${uid}-q-${name}`;
  const current = $derived((node.fields.props ?? {}) as Record<string, unknown>);
  const preview = $derived(store.data.previews[String(current.id ?? '')]);
  const previewError = $derived(store.data.errors[String(current.id ?? '')]);

  $effect(() => { void store.data.loadSources(); });
  $effect(() => {
    const source = form.source;
    if (source !== '') void store.data.schema(source);
  });

  function apply(): void {
    const result = formToQuery(form, schema);
    if ('error' in result) {
      error = t(result.error as MessageKey, { row: (result.index ?? 0) + 1 });
      return;
    }
    error = null;
    store.run({ kind: 'updateProps', id: node.id, set: { ...current, ...result.props } });
  }
</script>

<section class="query" aria-labelledby={id('title')}>
  <h3 id={id('title')}>{t('data.title')}</h3>
  {#if !store.data.available || (store.data.sources !== null && store.data.sources.length === 0)}
    <p class="hint">{t('data.unavailable')}</p>
  {:else}
    <div class="field"><label for={id('id')}>{t('data.id')}</label><input id={id('id')} bind:value={form.id} /></div>
    <div class="field">
      <label for={id('source')}>{t('data.source')}</label>
      <select id={id('source')} bind:value={form.source}>
        <option value="">{t('data.chooseSource')}</option>
        <option value="@current">{t('data.currentSource')}</option>
        {#each store.data.sources ?? [] as source (source.id)}<option value={source.id}>{source.label}</option>{/each}
      </select>
    </div>
    <div class="field"><label for={id('size')}>{t('data.pageSize')}</label><input id={id('size')} inputmode="numeric" bind:value={form.pageSize} /></div>
    <label class="check"><input type="checkbox" bind:checked={form.pagination} /> {t('data.pagination')}</label>
    {#if form.pagination}
      <div class="field"><label for={id('page')}>{t('data.pageParam')}</label><input id={id('page')} bind:value={form.pageParam} /></div>
    {/if}
    {#if schema}<QueryRows {form} fields={schema.fields} {t} {uid} />{/if}
    {#if error}<p class="error" role="alert">{error}</p>{/if}
    <button type="button" onclick={apply}>{t('data.apply')}</button>
    <p class="status" role="status">
      {#if previewError}{t('data.previewError', { code: previewError })}
      {:else if preview?.state === 'empty'}{t('data.previewEmpty')}
      {:else if preview}{t('data.preview', { count: preview.pagination.total ?? preview.items.length })}{/if}
    </p>
  {/if}
</section>

<style>
  .query { border-top: 1px solid var(--cpb-border); padding-top: .5rem; margin-top: .5rem; }
  h3 { font-size: .8rem; margin: 0 0 .5rem; }
  .field { display: grid; gap: .25rem; margin-bottom: .6rem; }
  label { font-size: .8rem; font-weight: 600; }
  .check { display: flex; gap: .35rem; align-items: center; margin-bottom: .6rem; }
  input, select, button { font: inherit; font-size: .85rem; padding: .3rem .45rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  .hint, .status { font-size: .8rem; color: var(--cpb-muted); }
  .error { font-size: .8rem; color: var(--cpb-danger); }
</style>
