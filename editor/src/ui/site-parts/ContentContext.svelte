<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';

  /**
   * Where a record, listing or search part is previewed (plan 07-D): a source, a sample record or the search words.
   * The value is the preview context the module reads: content|record|<source>|<slug>, content|archive|<source>,
   * content|search||<words>.
   */
  let { store, uid, kind, value = $bindable('') }: { store: EditorStore; uid: string; kind: 'single' | 'archive' | 'search'; value?: string } = $props();
  const t = $derived(store.t);
  let source = $state('');
  let record = $state('');
  let words = $state('');
  let records = $state<readonly { slug: string; label: string }[]>([]);

  $effect(() => { void store.data.loadSources(); });
  $effect(() => {
    const id = source;
    records = [];
    record = '';
    if (kind === 'single' && id !== '' && store.session.transport.dataSourceRecords) {
      void store.session.transport.dataSourceRecords(id, '').then((list) => { if (source === id) records = list; }).catch(() => { records = []; });
    }
  });
  $effect(() => {
    value = kind === 'search' ? `content|search||${words.replaceAll('|', ' ')}`
      : source === '' ? '' : kind === 'archive' ? `content|archive|${source}` : record === '' ? '' : `content|record|${source}|${record}`;
  });
</script>

{#if kind === 'search'}
  <input id={`${uid}-part-words`} aria-label={t('parts.previewWords')} placeholder={t('parts.previewWords')} bind:value={words} />
{:else}
  <select id={`${uid}-part-source`} aria-label={t('parts.previewSource')} bind:value={source}>
    <option value="">{t('data.chooseSource')}</option>
    {#each store.data.sources ?? [] as s (s.id)}<option value={s.id}>{s.label}</option>{/each}
  </select>
  {#if kind === 'single'}
    <select id={`${uid}-part-record`} aria-label={t('parts.previewRecord')} bind:value={record} disabled={records.length === 0}>
      <option value="">{t('parts.previewRecord')}</option>
      {#each records as r (r.slug)}<option value={r.slug}>{r.label}</option>{/each}
    </select>
  {/if}
{/if}

<style>
  select, input { font: inherit; font-size: .8rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; min-width: 0; flex: 1; }
</style>
