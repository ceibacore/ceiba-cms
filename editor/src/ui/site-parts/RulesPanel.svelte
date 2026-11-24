<script lang="ts">
  import type { SitePartRules } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import PartPreview from './PartPreview.svelte';
  import { list } from './targets';
  import TargetList from './TargetList.svelte';

  /** Where the site part applies (plan 06-C): typed rules, priority, impact, ties and an in-context preview. */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  const part = $derived(store.part!);
  const rules = $derived(part.rules);
  const notFound = $derived(part.part?.kind === 'not_found');
  const set = (patch: Partial<SitePartRules>): void => part.setRules({ ...rules, ...patch });
  const names = (ids: readonly string[]): string => ids.join(', ');
  const show = (parts: Record<string, string | null>): string => Object.entries(parts).map(([kind, id]) => `${kind}: ${id ?? t('parts.nothing')}`).join(' · ');
</script>

<section class="panel" aria-labelledby={`${uid}-parts-title`}>
  <h2 id={`${uid}-parts-title`}>{t('parts.title', { name: part.part?.name ?? '' })}</h2>
  {#if part.part}<p class="kind">{t(`parts.kind.${part.part.kind}`)}{#if part.rulesUnpublished} · {t('parts.unpublishedRules')}{/if}</p>{/if}
  <TargetList {store} id={`${uid}-include`} legend={t('parts.include')} {notFound} targets={rules.include}
    onChange={(include) => set({ include })} />
  <TargetList {store} id={`${uid}-exclude`} legend={t('parts.exclude')} {notFound} targets={rules.exclude ?? []}
    onChange={(exclude) => set({ exclude })} />
  <label for={`${uid}-locales`}>{t('parts.locales')}</label>
  <input id={`${uid}-locales`} value={(rules.locales ?? []).join(', ')} onchange={(e) => set({ locales: list(e.currentTarget.value) })} />
  <label for={`${uid}-session`}>{t('parts.session')}</label>
  <select id={`${uid}-session`} value={rules.session ?? 'any'} aria-describedby={`${uid}-session-help`}
    onchange={(e) => set({ session: e.currentTarget.value as 'any' | 'with' | 'without' })}>
    {#each ['any', 'with', 'without'] as const as value (value)}<option {value}>{t(`parts.session.${value}`)}</option>{/each}
  </select>
  <p class="help" id={`${uid}-session-help`}>{t('parts.sessionHelp')}</p>
  <label for={`${uid}-priority`}>{t('parts.priority')}</label>
  <input id={`${uid}-priority`} type="number" min="-100" max="100" value={rules.priority ?? 0}
    onchange={(e) => set({ priority: Math.trunc(Number(e.currentTarget.value) || 0) })} />
  <div class="actions">
    <button type="button" class="primary" disabled={part.busy || !part.dirty} onclick={() => void part.saveRules()}>{t('parts.save')}</button>
    <button type="button" disabled={part.busy} onclick={() => void part.loadImpact()}>{t('parts.impact')}</button>
  </div>
  {#if part.error}<p class="error" role="alert">{part.error}</p>{/if}
  {#if part.impact}
    <div class="impact" role="status">
      <p>{part.impact.total === 0 ? t('parts.impactNone') : t('parts.impactTotal', { total: part.impact.total })}</p>
      <ul>{#each part.impact.changes as change, i (i)}<li>{t('parts.change', { path: change.context.path, before: show(change.before.parts), after: show(change.after.parts) })}</li>{/each}</ul>
      {#if part.impact.conflicts.length > 0}
        <p class="error">{t('parts.conflicts')}</p>
        <ul>{#each part.impact.conflicts as conflict, i (i)}<li>{t('parts.conflictAt', { path: conflict.context.path,
          parts: Object.values(conflict.parts).map(names).join(' / ') })}</li>{/each}</ul>
      {/if}
    </div>
  {/if}
  <PartPreview {store} {uid} />
</section>

<style>
  .panel { padding: .5rem .75rem; overflow: auto; border-left: 1px solid var(--cpb-border); display: grid; gap: .3rem; align-content: start; }
  h2 { font-size: .85rem; margin: 0; }
  .kind, .help { margin: 0; font-size: .75rem; color: var(--cpb-muted); }
  label { font-size: .8rem; font-weight: 600; }
  input, select, button { font: inherit; font-size: .8rem; padding: .3rem .45rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  .actions { display: flex; gap: .35rem; margin-top: .3rem; }
  button { cursor: pointer; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button:disabled { opacity: .5; }
  .error { color: var(--cpb-danger); font-size: .75rem; margin: 0; }
  .impact { font-size: .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; padding: .3rem .5rem; }
  .impact p { margin: 0 0 .2rem; }
  .impact ul { margin: 0; padding-left: 1rem; max-height: 8rem; overflow: auto; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
