<script lang="ts">
  import type { DataField, QueryForm } from '../../core';
  import type { Translate } from '../i18n';

  /** Filters, sort and visitor URL parameters of a query block: typed rows from the source's public fields. */
  let { form, fields, t, uid }: { form: QueryForm; fields: readonly DataField[]; t: Translate; uid: string } = $props();
  const ops = (name: string): readonly string[] => fields.find((f) => f.name === name)?.operators ?? [];
  const sortable = $derived(fields.filter((f) => f.sortable));
  const filterable = $derived(fields.filter((f) => f.operators.length > 0));
  const options = (name: string): readonly string[] => fields.find((f) => f.name === name)?.options ?? [];
</script>

<fieldset>
  <legend>{t('data.filters')}</legend>
  {#each form.filters as row, i (i)}
    <div class="row">
      <select aria-label={t('data.field')} bind:value={row.field} id={`${uid}-f${i}`}>
        {#each filterable as f (f.name)}<option value={f.name}>{f.label}</option>{/each}
      </select>
      <select aria-label={t('data.operator')} bind:value={row.op}>{#each ops(row.field) as op (op)}<option value={op}>{op}</option>{/each}</select>
      {#if !['is_null', 'not_null'].includes(row.op)}
        {#if options(row.field).length > 0 && row.op !== 'in'}
          <select aria-label={t('data.value')} bind:value={row.value}>{#each options(row.field) as o (o)}<option value={o}>{o}</option>{/each}</select>
        {:else}
          <input aria-label={t('data.value')} bind:value={row.value} />
        {/if}
      {/if}
      <button type="button" onclick={() => form.filters.splice(i, 1)}>{t('data.remove')}</button>
    </div>
  {/each}
  <button type="button" disabled={filterable.length === 0}
    onclick={() => form.filters.push({ field: filterable[0]!.name, op: filterable[0]!.operators[0]!, value: '' })}>{t('data.add')}</button>
</fieldset>

<fieldset>
  <legend>{t('data.sort')}</legend>
  {#each form.sort as row, i (i)}
    <div class="row">
      <select aria-label={t('data.field')} bind:value={row.field}>{#each sortable as f (f.name)}<option value={f.name}>{f.label}</option>{/each}</select>
      <select aria-label={t('data.sort')} bind:value={row.direction}><option value="asc">{t('data.asc')}</option><option value="desc">{t('data.desc')}</option></select>
      <button type="button" onclick={() => form.sort.splice(i, 1)}>{t('data.remove')}</button>
    </div>
  {/each}
  {#if form.sort.length < 3}
    <button type="button" disabled={sortable.length === 0} onclick={() => form.sort.push({ field: sortable[0]!.name, direction: 'asc' })}>{t('data.add')}</button>
  {/if}
</fieldset>

<fieldset>
  <legend>{t('data.urlParams')}</legend>
  {#each form.urlParams as row, i (i)}
    <div class="row">
      <input aria-label={t('data.param')} bind:value={row.param} size="8" />
      <select aria-label={t('data.operator')} bind:value={row.target}><option value="search">{t('data.search')}</option><option value="filter">{t('data.filter')}</option></select>
      {#if row.target === 'filter'}
        <select aria-label={t('data.field')} bind:value={row.field}>{#each filterable as f (f.name)}<option value={f.name}>{f.label}</option>{/each}</select>
        <select aria-label={t('data.operator')} bind:value={row.op}>{#each ops(row.field) as op (op)}<option value={op}>{op}</option>{/each}</select>
      {/if}
      <button type="button" onclick={() => form.urlParams.splice(i, 1)}>{t('data.remove')}</button>
    </div>
  {/each}
  <button type="button" onclick={() => form.urlParams.push({ param: '', target: 'search', field: filterable[0]?.name ?? '', op: 'eq' })}>{t('data.add')}</button>
</fieldset>

<style>
  fieldset { border: 1px solid var(--cpb-border); border-radius: 6px; padding: .4rem .5rem; margin: 0 0 .6rem; }
  legend { font-size: .75rem; font-weight: 700; padding: 0 .25rem; }
  .row { display: flex; flex-wrap: wrap; gap: .25rem; margin-bottom: .35rem; }
  select, input, button { font: inherit; font-size: .8rem; padding: .2rem .35rem; border: 1px solid var(--cpb-border); border-radius: 5px; background: var(--cpb-surface); color: inherit; }
  input { min-width: 0; flex: 1 1 5rem; }
</style>
