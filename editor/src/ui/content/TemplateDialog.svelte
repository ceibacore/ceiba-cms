<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import type { ContentActions } from './actions.svelte';
  import Dialog from './Dialog.svelte';

  let { store, content, uid, nodeId, open = $bindable(false) }: {
    store: EditorStore; content: ContentActions; uid: string; nodeId: string | null; open?: boolean;
  } = $props();
  const t = $derived(store.t);
  let name = $state('');
  let category = $state('general');
  let busy = $state(false);

  async function submit(): Promise<void> {
    if (!nodeId || name.trim() === '') return;
    busy = true;
    const saved = await content.saveTemplate(nodeId, name.trim(), category.trim() || 'general');
    busy = false;
    if (saved) {
      name = '';
      open = false;
    }
  }
</script>

<Dialog bind:open title={t('template.title')} uid={`${uid}-template`} submitLabel={t('template.submit')}
  cancelLabel={t('dialog.cancel')} {busy} onSubmit={submit}>
  <label for={`${uid}-template-name`}>{t('template.name')}</label>
  <input id={`${uid}-template-name`} bind:value={name} required maxlength="200" />
  <label for={`${uid}-template-category`}>{t('template.category')}</label>
  <input id={`${uid}-template-category`} bind:value={category} maxlength="100" />
</Dialog>

<style>
  label { display: block; font-size: .8rem; font-weight: 600; margin: .5rem 0 .25rem; }
  input { width: 100%; box-sizing: border-box; font: inherit; padding: .35rem .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; }
</style>
