<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import { CANVAS_SANDBOX } from '../canvas/frame';
  import ContentContext from './ContentContext.svelte';

  /** The saved revision of the part drawn in a page (or the 404) as if published, without scripts (plan 06-C). */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  const part = $derived(store.part!);
  const notFound = $derived(part.part?.kind === 'not_found');
  const kind = $derived(part.part?.kind);
  const content = $derived(kind === 'single' || kind === 'archive' || kind === 'search' ? kind : null);
  let context = $state('');
  const escape = (css: string): string => css.replace(/<\/style/gi, '<\\/style');
  const srcdoc = $derived(part.preview ? `<!doctype html><html><head><meta charset="utf-8"><style>${escape(part.preview.css)}</style></head><body>${part.preview.html}</body></html>` : '');
</script>

<div class="preview">
  <label for={`${uid}-part-context`}>{t('parts.preview')}</label>
  <div class="row">
    {#if content}
      <ContentContext {store} {uid} kind={content} bind:value={context} />
    {:else}
      <select id={`${uid}-part-context`} bind:value={context}>
        {#if notFound}<option value="">{t('parts.preview404')}</option>{/if}
        {#each part.pages as page (page.id)}<option value={page.id}>{page.path}</option>{/each}
      </select>
    {/if}
    <button type="button" disabled={part.busy || (!notFound && context === '')}
      onclick={() => void part.showPreview(context === '' ? null : context)}>{t('parts.previewShow')}</button>
  </div>
  {#if part.preview}
    {#if !part.preview.applies}<p class="note" role="status">{t('parts.notApplied')}</p>{/if}
    <iframe title={t('parts.previewFrame')} sandbox={CANVAS_SANDBOX} {srcdoc}></iframe>
  {/if}
</div>

<style>
  .preview { display: grid; gap: .3rem; border-top: 1px solid var(--cpb-border); padding-top: .5rem; }
  label { font-size: .8rem; font-weight: 600; }
  .row { display: flex; gap: .25rem; }
  select, button { font: inherit; font-size: .8rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; min-width: 0; }
  select { flex: 1; }
  button { cursor: pointer; }
  .note { margin: 0; font-size: .75rem; color: var(--cpb-danger); }
  iframe { width: 100%; height: 260px; border: 1px solid var(--cpb-border); border-radius: 6px; background: #fff; }
</style>
