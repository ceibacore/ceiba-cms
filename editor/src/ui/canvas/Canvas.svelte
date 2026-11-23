<script lang="ts">
  import type { EditorStore } from '../model/store.svelte';
  import { CANVAS_SANDBOX, canvasDocument } from './frame';
  import { renderCanvas } from './render';

  let { store, stylesheets = [] }: { store: EditorStore; stylesheets?: readonly string[] } = $props();
  const t = $derived(store.t);
  let frame: HTMLIFrameElement | undefined = $state();
  let ready = $state(false);
  const srcdoc = $derived(canvasDocument(stylesheets));

  /** Clicks select; nothing inside the canvas navigates or submits while editing. */
  function attach(doc: Document): void {
    doc.addEventListener('click', (event) => {
      event.preventDefault();
      const target = (event.target as Element | null)?.closest?.('[data-ceiba-id]') as HTMLElement | null;
      store.select(target?.dataset.ceibaId ?? null);
    });
    doc.addEventListener('submit', (event) => event.preventDefault());
    doc.addEventListener('auxclick', (event) => event.preventDefault());
  }

  function onload(): void {
    const doc = frame?.contentDocument;
    if (!doc) return;
    attach(doc);
    ready = true;
  }

  $effect(() => {
    const doc = frame?.contentDocument;
    const catalogue = store.catalogue;
    if (!ready || !doc || !catalogue) return;
    renderCanvas(doc, store.tree, catalogue, store.selection, {
      unknown: (type) => t('canvas.unknown', { type }),
      html: t('canvas.html'),
      emptyImage: t('canvas.emptyImage'),
    });
    if (store.selection) {
      doc.querySelector(`[data-ceiba-id="${CSS.escape(store.selection)}"]`)?.scrollIntoView({ block: 'nearest' });
    }
  });
</script>

<div class="canvas">
  <iframe bind:this={frame} title={t('canvas.title')} sandbox={CANVAS_SANDBOX} {srcdoc} {onload}></iframe>
</div>

<style>
  .canvas { background: var(--cpb-canvas); padding: 1rem; min-height: 0; display: flex; }
  iframe { flex: 1; width: 100%; min-height: 480px; border: 1px solid var(--cpb-border); border-radius: 8px; background: #fff; }
</style>
