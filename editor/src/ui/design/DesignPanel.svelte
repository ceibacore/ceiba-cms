<script lang="ts">
  import { compileStyles } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import BreakpointsTab from './BreakpointsTab.svelte';
  import ClassesTab from './ClassesTab.svelte';
  import TokensTab from './TokensTab.svelte';

  /** Site design (plan 04-D): tokens, classes and breakpoints; save as a draft and publish to every page. */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  let tab = $state<'tokens' | 'classes' | 'breakpoints'>('tokens');
  const problems = $derived(compileStyles(store.design, []).diagnostics);
  const canPublish = $derived(!store.designDirty && store.designPublished !== store.designRevision && store.designRevision > 0
    && typeof store.session.transport.publishDesign === 'function');
</script>

<section class="design" aria-labelledby={`${uid}-design-title`}>
  <div class="head">
    <h2 id={`${uid}-design-title`}>{t('design.title')}</h2>
    <button type="button" aria-label={t('design.close')} onclick={() => { store.designOpen = false; }}>×</button>
  </div>
  <p class="meta">{t('design.revision', { revision: store.designRevision })} ·
    {store.designPublished === null ? t('design.notPublished') : t('design.publishedAt', { revision: store.designPublished })}</p>
  <p class="help">{t('design.help')}</p>
  <div class="tabs" role="tablist">
    {#each [['tokens', 'design.tokens'], ['classes', 'design.classes'], ['breakpoints', 'design.breakpoints']] as const as [id, key] (id)}
      <button type="button" role="tab" aria-selected={tab === id} aria-controls={`${uid}-design-${id}`} onclick={() => { tab = id; }}>{t(key)}</button>
    {/each}
  </div>
  <div role="tabpanel" id={`${uid}-design-${tab}`}>
    {#if tab === 'tokens'}<TokensTab {store} {uid} />
    {:else if tab === 'classes'}<ClassesTab {store} {uid} />
    {:else}<BreakpointsTab {store} />{/if}
  </div>
  {#if problems.length > 0}
    <div class="problems" role="alert"><p>{t('design.problems')}</p>
      <ul>{#each problems as p (p.path)}<li><code>{p.path}</code> · {p.code}</li>{/each}</ul></div>
  {/if}
  <div class="actions">
    <button type="button" onclick={() => store.designAction('save')} disabled={!store.designDirty || problems.length > 0
      || !store.designSession.editable}>{t('design.save')}</button>
    <button type="button" class="primary" onclick={() => store.designAction('publish')} disabled={!canPublish}>{t('design.publish')}</button>
    {#if store.designDirty}<button type="button" onclick={() => store.designAction('reload')}>{t('design.reload')}</button>{/if}
  </div>
</section>

<style>
  .design { padding: .5rem .75rem; overflow: auto; border-left: 1px solid var(--cpb-border); display: grid; gap: .5rem; align-content: start; }
  .head { display: flex; justify-content: space-between; align-items: center; }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; margin: 0; color: var(--cpb-muted); }
  .meta, .help { margin: 0; font-size: .75rem; color: var(--cpb-muted); }
  .tabs { display: flex; gap: .25rem; }
  .tabs button[aria-selected='true'] { background: var(--cpb-accent-soft); border-color: var(--cpb-accent); }
  .problems { color: var(--cpb-danger); font-size: .75rem; }
  .problems p { margin: 0; }
  .actions { display: flex; flex-wrap: wrap; gap: .35rem; }
  button { font: inherit; font-size: .8rem; padding: .3rem .6rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button:disabled { opacity: .5; cursor: not-allowed; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
