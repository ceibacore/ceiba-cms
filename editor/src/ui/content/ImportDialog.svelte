<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import type { ContentActions } from './actions.svelte';
  import Dialog from './Dialog.svelte';

  let { store, content, uid, open = $bindable(false) }: {
    store: EditorStore; content: ContentActions; uid: string; open?: boolean;
  } = $props();
  const t = $derived(store.t);
  let html = $state('');
  let busy = $state(false);

  async function submit(): Promise<void> {
    if (html.trim() === '') return;
    busy = true;
    const warnings = await content.importHtml(html);
    busy = false;
    if (warnings === null) return;
    if (warnings > 0) store.announce('import.warnings', { count: warnings });
    html = '';
    open = false;
  }
</script>

<Dialog bind:open title={t('import.title')} uid={`${uid}-import`} submitLabel={t('import.submit')}
  cancelLabel={t('dialog.cancel')} {busy} onSubmit={submit}>
  <p class="help">{t('import.help')}</p>
  <label for={`${uid}-import-html`}>{t('import.field')}</label>
  <textarea id={`${uid}-import-html`} rows="10" bind:value={html} spellcheck="false"></textarea>
</Dialog>

<style>
  .help { font-size: .8rem; margin: 0 0 .5rem; }
  label { display: block; font-size: .8rem; font-weight: 600; margin-bottom: .25rem; }
  textarea { width: 100%; box-sizing: border-box; font: 12px/1.4 ui-monospace, monospace; padding: .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; }
</style>
