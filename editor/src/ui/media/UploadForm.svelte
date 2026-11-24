<script lang="ts">
  import type { MediaSettings } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import type { MediaBrowser } from './browser.svelte';

  /** Upload with the site's recommended widths checked; the uploader decides widths, optimize and WebP (plan 05 D-4). */
  let { store, browser, settings, uid }: {
    store: EditorStore; browser: MediaBrowser; settings: MediaSettings | null; uid: string;
  } = $props();
  const t = $derived(store.t);
  let input: HTMLInputElement | undefined = $state();
  let alt = $state('');
  let widths = $state<number[]>([]);
  let optimize = $state(true);
  let webp = $state(true);
  let problem = $state('');
  $effect(() => {
    if (settings) {
      widths = [...settings.widths];
      webp = settings.webp;
    }
  });

  function toggle(width: number, on: boolean): void {
    widths = on ? [...widths, width].sort((a, b) => a - b) : widths.filter((w) => w !== width);
  }

  async function send(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    const file = input?.files?.[0];
    if (!file) return;
    browser.error = '';
    problem = browser.check(file, settings) ?? '';
    if (problem !== '') return;
    if (await browser.upload(file, { alt, widths, optimize, webp })) {
      alt = '';
      if (input) input.value = '';
    }
  }
</script>

<form class="upload" onsubmit={send} aria-labelledby={`${uid}-upload-title`}>
  <h3 id={`${uid}-upload-title`}>{t('media.upload')}</h3>
  <label for={`${uid}-file`}>{t('media.file')}</label>
  <input id={`${uid}-file`} type="file" bind:this={input} accept={(settings?.accept ?? ['image/*']).join(',')}
    aria-describedby={problem ? `${uid}-file-error` : undefined} onchange={() => { problem = ''; }} />
  {#if problem}<p class="error" id={`${uid}-file-error`} role="alert">{problem}</p>{/if}
  <label for={`${uid}-upload-alt`}>{t('media.alt')}</label>
  <input id={`${uid}-upload-alt`} type="text" bind:value={alt} />
  {#if settings}
    <fieldset>
      <legend>{t('media.sizes')}</legend>
      {#each settings.widths as width (width)}
        <label class="check"><input type="checkbox" checked={widths.includes(width)}
          onchange={(e) => toggle(width, e.currentTarget.checked)} /> {t('media.recommended', { width })}</label>
      {/each}
    </fieldset>
  {/if}
  <label class="check"><input type="checkbox" bind:checked={optimize} /> {t('media.optimize')}</label>
  <label class="check"><input type="checkbox" bind:checked={webp} /> {t('media.webp')}</label>
  <button type="submit" disabled={browser.busy}>{browser.busy ? t('media.uploading') : t('media.upload')}</button>
</form>

<style>
  .upload { display: grid; gap: .3rem; padding: .5rem; border: 1px solid var(--cpb-border); border-radius: 8px; }
  h3 { font-size: .85rem; margin: 0; }
  label { font-size: .8rem; font-weight: 600; }
  .check { font-weight: 400; display: flex; gap: .35rem; align-items: center; }
  fieldset { border: 1px solid var(--cpb-border); border-radius: 6px; padding: .25rem .5rem; margin: 0; }
  legend { font-size: .8rem; font-weight: 600; }
  input[type='text'], button { font: inherit; font-size: .8rem; padding: .3rem .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  button { cursor: pointer; justify-self: start; }
  .error { color: var(--cpb-danger); font-size: .75rem; margin: 0; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
