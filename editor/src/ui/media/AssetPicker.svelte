<script lang="ts">
  import type { AssetRef } from '../../core';
  import { isAssetRef } from '../../core';
  import type { EditorStore } from '../model/store.svelte';

  /**
   * A library file chosen for a prop or a style (plan 05-A): preview, choose/replace, remove and, for images on
   * the page, the alternative text of this use ("" = decorative). A URL typed by hand (legacy) is shown as such.
   */
  let { store, value, id, label, withAlt = false, onChange }: {
    store: EditorStore; value: unknown; id: string; label: string; withAlt?: boolean;
    onChange: (next: AssetRef | string | null) => void;
  } = $props();
  const t = $derived(store.t);
  const ref = $derived(isAssetRef(value) ? value : null);
  const media = $derived(ref ? store.media.resolved[ref.asset] : undefined);
  const legacy = $derived(typeof value === 'string' && value !== '' ? value : null);
  const decorative = $derived(ref?.alt === '');

  function choose(): void {
    store.media.pick(ref, (picked) => onChange(ref?.alt !== undefined ? { asset: picked.asset, alt: ref.alt } : { asset: picked.asset }));
  }

  function setAlt(alt: string | undefined): void {
    if (!ref) return;
    onChange(alt === undefined ? { asset: ref.asset } : { asset: ref.asset, alt });
  }
</script>

<div class="picker" role="group" aria-labelledby={`${id}-label`}>
  <span class="label" id={`${id}-label`}>{label}</span>
  <div class="row">
    {#if media}
      <img src={media.url} alt="" class="thumb" />
    {:else if ref}
      <span class="thumb missing">{t('media.missing')}</span>
    {/if}
    {#if legacy}<span class="legacy" title={legacy}>{legacy}</span>{/if}
    <button type="button" {id} onclick={choose}>{ref || legacy ? t('media.replace') : t('media.choose')}</button>
    {#if ref || legacy}
      <button type="button" aria-label={t('media.removeFrom', { field: label })} onclick={() => onChange(null)}>×</button>
    {/if}
  </div>
  {#if ref && withAlt}
    <label class="check"><input type="checkbox" checked={decorative}
      onchange={(e) => setAlt(e.currentTarget.checked ? '' : undefined)} /> {t('media.decorative')}</label>
    {#if !decorative}
      <label for={`${id}-alt`}>{t('media.useAlt')}</label>
      <input id={`${id}-alt`} type="text" value={ref.alt ?? ''} placeholder={media?.alt ?? ''}
        onchange={(e) => setAlt(e.currentTarget.value.trim() === '' ? undefined : e.currentTarget.value)} />
    {/if}
  {/if}
</div>

<style>
  .picker { display: grid; gap: .25rem; margin-bottom: .75rem; }
  .label, label { font-size: .8rem; font-weight: 600; }
  .check { font-weight: 400; display: flex; gap: .35rem; align-items: center; }
  .row { display: flex; gap: .35rem; align-items: center; }
  .thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; border: 1px solid var(--cpb-border); }
  .missing { display: grid; place-items: center; font-size: .6rem; color: var(--cpb-danger); text-align: center; }
  .legacy { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .75rem; color: var(--cpb-muted); }
  button, input[type='text'] { font: inherit; font-size: .8rem; padding: .3rem .6rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  button { cursor: pointer; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
