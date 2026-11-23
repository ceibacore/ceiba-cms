<script lang="ts">
  import type { DragController } from '../drag/controller';
  import type { EditorStore } from '../model/store.svelte';
  import { CANVAS_SANDBOX, canvasDocument } from './frame';
  import { caretAtEnd, cleanText, isMultiline, textKey } from './inline-edit';
  import { renderCanvas } from './render';

  let { store, drag, uid, stylesheets = [], onEditEnd }: {
    store: EditorStore; drag: DragController; uid: string; stylesheets?: readonly string[];
    onEditEnd: (id: string, byKeyboard: boolean) => void;
  } = $props();
  const t = $derived(store.t);
  let frame: HTMLIFrameElement | undefined = $state();
  let ready = $state(false);
  /** Node whose text is being edited in place; the canvas is not redrawn meanwhile (it would lose the caret). */
  let editing = $state<string | null>(null);
  const srcdoc = $derived(canvasDocument(stylesheets));

  const nodeElement = (target: EventTarget | null): HTMLElement | null =>
    (target as Element | null)?.closest?.('[data-ceiba-id]') as HTMLElement | null;

  /** Starts editing the text of a node in place (double click, or F2 in the structure tree). */
  export function startEditing(id: string): boolean {
    const doc = frame?.contentDocument;
    const node = store.tree.nodes[id];
    const key = node && store.catalogue ? textKey(node, store.catalogue) : null;
    const element = doc?.querySelector<HTMLElement>(`[data-ceiba-id="${CSS.escape(id)}"]`);
    if (!doc || !node || !key || !element) return false;
    store.select(id);
    editing = id;
    const multiline = isMultiline(node.type);
    element.setAttribute('contenteditable', 'plaintext-only');
    element.setAttribute('aria-label', t('announce.editing'));
    const input = (): void => { store.run({ kind: 'updateProps', id, set: { [key]: cleanText(element.innerText, multiline) } }); };
    const finish = (byKeyboard: boolean): void => {
      element.removeEventListener('input', input);
      element.removeEventListener('keydown', keydown);
      element.removeEventListener('blur', blur);
      element.removeAttribute('contenteditable');
      editing = null;
      store.announce('announce.editDone');
      onEditEnd(id, byKeyboard);
    };
    const keydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' || (event.key === 'Enter' && (!multiline || event.ctrlKey || event.metaKey))) {
        event.preventDefault();
        finish(true);
      }
    };
    const blur = (): void => finish(false);
    element.addEventListener('input', input);
    element.addEventListener('keydown', keydown);
    element.addEventListener('blur', blur);
    element.focus();
    caretAtEnd(element);
    store.announce('announce.editing');
    return true;
  }

  /** Clicks select; nothing inside the canvas navigates or submits while editing. */
  function attach(doc: Document): void {
    doc.addEventListener('click', (event) => {
      event.preventDefault();
      if (editing === null) store.select(nodeElement(event.target)?.dataset.ceibaId ?? null);
    });
    doc.addEventListener('dblclick', (event) => {
      const id = nodeElement(event.target)?.dataset.ceibaId;
      if (id && editing === null) startEditing(id);
    });
    doc.addEventListener('pointerdown', (event) => {
      const element = nodeElement(event.target);
      if (element?.dataset.ceibaId && editing === null) drag.pressNode(event, element, element.dataset.ceibaId);
    });
    doc.addEventListener('submit', (event) => event.preventDefault());
    doc.addEventListener('auxclick', (event) => event.preventDefault());
    doc.addEventListener('dragstart', (event) => event.preventDefault());
  }

  function onload(): void {
    const doc = frame?.contentDocument;
    if (!doc || !frame) return;
    attach(doc);
    drag.attach(frame);
    ready = true;
  }

  $effect(() => {
    const doc = frame?.contentDocument;
    const catalogue = store.catalogue;
    const tree = store.tree;
    const selection = store.selection;
    if (!ready || !doc || !catalogue || editing !== null) return;
    renderCanvas(doc, tree, catalogue, selection, {
      unknown: (type) => t('canvas.unknown', { type }),
      html: t('canvas.html'),
      emptyImage: t('canvas.emptyImage'),
    });
    if (selection) doc.querySelector(`[data-ceiba-id="${CSS.escape(selection)}"]`)?.scrollIntoView({ block: 'nearest' });
  });
</script>

<div class="canvas">
  <p class="help" id={`${uid}-canvas-help`}>{t('canvas.help')}</p>
  <iframe bind:this={frame} title={t('canvas.title')} sandbox={CANVAS_SANDBOX} {srcdoc} {onload}
    aria-describedby={`${uid}-canvas-help`}></iframe>
</div>

<style>
  .canvas { background: var(--cpb-canvas); padding: .5rem 1rem 1rem; min-height: 0; display: flex; flex-direction: column; }
  .help { margin: 0 0 .5rem; font-size: .75rem; color: var(--cpb-muted); }
  iframe { flex: 1; width: 100%; min-height: 480px; border: 1px solid var(--cpb-border); border-radius: 8px; background: #fff; }
</style>
