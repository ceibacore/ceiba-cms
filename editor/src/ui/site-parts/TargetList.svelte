<script lang="ts">
  import type { SitePartTarget } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import type { TargetType } from './targets';
  import { list, PAGE_TARGETS, TARGET_TYPES, targetOf } from './targets';

  /** One list of rule targets (include or exclude) with a typed editor for each (plan 06 D-4). */
  let { store, targets, id, legend, notFound, onChange }: {
    store: EditorStore; targets: readonly SitePartTarget[]; id: string; legend: string; notFound: boolean;
    onChange: (next: SitePartTarget[]) => void;
  } = $props();
  const t = $derived(store.t);
  const part = $derived(store.part!);
  const types = $derived(TARGET_TYPES.filter((type) => !notFound || !PAGE_TARGETS.includes(type)));
  const invalid = (index: number): boolean => part.errorPath.startsWith(`${id.split('-').pop()}.${index}`);

  const replace = (index: number, target: SitePartTarget): void => onChange(targets.map((t0, i) => (i === index ? target : t0)));
  const selected = (event: Event): string[] => Array.from((event.currentTarget as HTMLSelectElement).selectedOptions, (o) => o.value);
</script>

<fieldset class="targets">
  <legend>{legend}</legend>
  {#each targets as target, index (index)}
    {@const n = index + 1}
    <div class="target" aria-invalid={invalid(index)}>
      <select aria-label={t('parts.type', { n })} value={target.type}
        onchange={(e) => replace(index, targetOf(e.currentTarget.value as TargetType))}>
        {#each types as type (type)}<option value={type}>{t(`parts.target.${type}`)}</option>{/each}
      </select>
      {#if target.type === 'pages'}
        <select multiple aria-label={t('parts.value', { n })} onchange={(e) => replace(index, { type: 'pages', ids: selected(e) })}>
          {#each part.pages as page (page.id)}<option value={page.id} selected={target.ids.includes(page.id)}>{page.path}</option>{/each}
        </select>
      {:else if target.type === 'routes'}
        <select multiple aria-label={t('parts.value', { n })} onchange={(e) => replace(index, { type: 'routes', names: selected(e) })}>
          {#each Object.entries(part.routes) as [name, label] (name)}<option value={name} selected={target.names.includes(name)}>{label}</option>{/each}
        </select>
      {:else if target.type === 'layouts'}
        <input aria-label={t('parts.value', { n })} value={target.ids.join(', ')}
          onchange={(e) => replace(index, { type: 'layouts', ids: list(e.currentTarget.value) })} />
      {:else if target.type === 'path_prefix'}
        <input aria-label={t('parts.value', { n })} value={target.value} placeholder="/cursos"
          onchange={(e) => replace(index, { type: 'path_prefix', value: e.currentTarget.value.trim() })} />
      {/if}
      <button type="button" aria-label={t('parts.remove', { n })} onclick={() => onChange(targets.filter((_, i) => i !== index))}>×</button>
    </div>
  {/each}
  <button type="button" class="add" onclick={() => onChange([...targets, targetOf(notFound ? 'path_prefix' : 'pages')])}>{t('parts.add')}</button>
</fieldset>

<style>
  .targets { border: 1px solid var(--cpb-border); border-radius: 6px; padding: .4rem .5rem; margin: 0 0 .6rem; display: grid; gap: .35rem; }
  legend { font-size: .8rem; font-weight: 600; }
  .target { display: grid; grid-template-columns: 1fr 1fr auto; gap: .25rem; align-items: start; }
  .target[aria-invalid='true'] { outline: 2px solid var(--cpb-danger); border-radius: 6px; }
  select, input, button { font: inherit; font-size: .78rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; min-width: 0; }
  select[multiple] { min-height: 4.5rem; }
  button { cursor: pointer; }
  .add { justify-self: start; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
