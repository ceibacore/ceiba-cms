<script lang="ts">
  import { untrack } from 'svelte';
  import type { NodeRecord } from '../../../core';
  import type { MessageKey } from '../../i18n';
  import type { EditorStore } from '../../model/store.svelte';
  import { formToLoop, loopToForm } from './loop';

  /** Dynamic content of a node (loop) and its render condition; applied as one undoable command. */
  let { store, node, uid }: { store: EditorStore; node: NodeRecord; uid: string } = $props();
  const t = $derived(store.t);
  // Initial values only: the inspector recreates this component when the selection changes ({#key node.id}).
  const form = $state(untrack(() => loopToForm(node.fields.loop)));
  let condition = $state(untrack(() => (typeof node.fields.condition === 'string' ? node.fields.condition : '')));
  let error = $state<string | null>(null);
  const id = (name: string): string => `${uid}-adv-${name}`;

  function apply(): void {
    const result = formToLoop(form);
    if ('error' in result) {
      error = t(result.error as MessageKey);
      return;
    }
    error = null;
    const set: Record<string, unknown> = {};
    const unset: string[] = [];
    if (result.loop) set.loop = result.loop; else unset.push('loop');
    if (condition.trim() !== '') set.condition = condition.trim(); else unset.push('condition');
    store.run({ kind: 'updateFields', id: node.id, set, unset });
  }
</script>

<details class="advanced">
  <summary>{t('advanced.title')}</summary>
  <div class="field">
    <label for={id('source')}>{t('advanced.source')}</label>
    <select id={id('source')} bind:value={form.sourceType}>
      <option value="none">{t('advanced.none')}</option>
      <option value="module">{t('advanced.module')}</option>
      <option value="host">{t('advanced.host')}</option>
    </select>
  </div>
  {#if form.sourceType === 'module'}
    <div class="field"><label for={id('module')}>{t('advanced.moduleSlug')}</label><input id={id('module')} bind:value={form.module} /></div>
  {:else if form.sourceType === 'host'}
    <div class="field"><label for={id('host')}>{t('advanced.hostSource')}</label><input id={id('host')} bind:value={form.host} /></div>
  {/if}
  {#if form.sourceType !== 'none'}
    <div class="grid">
      <div class="field"><label for={id('variable')}>{t('advanced.variable')}</label><input id={id('variable')} bind:value={form.variable} /></div>
      <div class="field"><label for={id('key')}>{t('advanced.key')}</label><input id={id('key')} bind:value={form.key} /></div>
      <div class="field"><label for={id('limit')}>{t('advanced.limit')}</label><input id={id('limit')} inputmode="numeric" bind:value={form.limit} /></div>
      <div class="field"><label for={id('offset')}>{t('advanced.offset')}</label><input id={id('offset')} inputmode="numeric" bind:value={form.offset} /></div>
      <div class="field"><label for={id('sort')}>{t('advanced.sort')}</label><input id={id('sort')} bind:value={form.sortColumn} /></div>
      <div class="field">
        <label for={id('direction')}>{t('advanced.direction')}</label>
        <select id={id('direction')} bind:value={form.sortDirection}><option value="ASC">ASC</option><option value="DESC">DESC</option></select>
      </div>
    </div>
    <div class="field"><label for={id('filters')}>{t('advanced.filters')}</label><textarea id={id('filters')} rows="3" bind:value={form.filters}></textarea></div>
  {/if}
  <div class="field"><label for={id('condition')}>{t('advanced.condition')}</label><input id={id('condition')} bind:value={condition} /></div>
  {#if error}<p class="error" role="alert">{error}</p>{/if}
  <button type="button" onclick={apply}>{t('advanced.apply')}</button>
</details>

<style>
  .advanced { margin-top: 1rem; border-top: 1px solid var(--cpb-border); padding-top: .5rem; }
  summary { cursor: pointer; font-size: .8rem; font-weight: 700; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 .5rem; }
  .field { display: grid; gap: .25rem; margin: .5rem 0; }
  label { font-size: .75rem; font-weight: 600; }
  input, select, textarea { font: inherit; font-size: .8rem; padding: .3rem .45rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  .error { color: var(--cpb-danger); font-size: .75rem; margin: 0; }
  button { font: inherit; font-size: .8rem; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
