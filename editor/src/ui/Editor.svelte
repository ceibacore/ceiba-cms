<script lang="ts">
  import Canvas from './canvas/Canvas.svelte';
  import { ContentActions } from './content/actions.svelte';
  import ImportDialog from './content/ImportDialog.svelte';
  import DesignPanel from './design/DesignPanel.svelte';
  import TemplateDialog from './content/TemplateDialog.svelte';
  import { DragController } from './drag/controller';
  import Inspector from './inspector/Inspector.svelte';
  import MediaDialog from './media/MediaDialog.svelte';
  import RulesPanel from './site-parts/RulesPanel.svelte';
  import type { EditorStore } from './model/store.svelte';
  import Palette from './palette/Palette.svelte';
  import ConflictBanner from './publish/ConflictBanner.svelte';
  import ServerView from './publish/ServerView.svelte';
  import StructureTree from './structure/StructureTree.svelte';
  import { historyAction } from './structure/keyboard';
  import Toolbar from './toolbar/Toolbar.svelte';

  let { store, uid, stylesheets = [] }: { store: EditorStore; uid: string; stylesheets?: readonly string[] } = $props();
  let tree: { focusItem: (id: string | null) => Promise<void> } | undefined = $state();
  let canvas: { startEditing: (id: string) => boolean } | undefined = $state();
  const drag = $derived(new DragController(store));
  const content = $derived(new ContentActions(store));
  let importing = $state(false);
  let templating = $state(false);
  let templatesLoaded = false;
  $effect(() => {
    if (store.status === 'ready' && !templatesLoaded) {
      templatesLoaded = true;
      void content.loadTemplates();
    }
  });
  /** Revision shown in the server view; null shows the canvas. */
  let serverRevision = $state<number | null>(null);
  const canRender = $derived(typeof store.session.transport.render === 'function');

  /** Undo/redo anywhere in the editor except while typing in a field (plan 03: shortcuts never steal typing). */
  function onkeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (store.dirty) void store.save();
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select, [contenteditable="true"], [role="tree"]')) return;
    const action = historyAction(event);
    if (!action) return;
    event.preventDefault();
    if (action.type === 'undo') store.undo();
    else if (action.type === 'redo') store.redo();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="editor" role="application" aria-label={store.t('editor.label')} {onkeydown}>
  <Toolbar {store} serverView={serverRevision !== null}
    onServerView={canRender ? () => { serverRevision = serverRevision === null ? store.revision : null; } : null} />
  <ConflictBanner {store} {uid} onView={canRender ? (revision) => { serverRevision = revision; } : null} />
  <div class="body">
    <aside class="left">
      <Palette {store} {drag} {content} onInserted={(id) => tree?.focusItem(id)} onImport={() => { importing = true; }} />
      <StructureTree {store} bind:this={tree} onEdit={(id) => canvas?.startEditing(id) ?? false} />
    </aside>
    {#if serverRevision !== null}
      <ServerView {store} revision={serverRevision} {stylesheets} onBack={() => { serverRevision = null; }} />
    {:else}
      <Canvas {store} {drag} {uid} {stylesheets} bind:this={canvas}
        onEditEnd={(id, byKeyboard) => { if (byKeyboard) void tree?.focusItem(id); }} />
    {/if}
    {#if store.part?.open}
      <RulesPanel {store} {uid} />
    {:else if store.designOpen}
      <DesignPanel {store} {uid} />
    {:else}
      <Inspector {store} {uid} canTemplates={content.canTemplates} onRemoved={() => tree?.focusItem(store.selection)}
        onSaveTemplate={() => { templating = true; }} />
    {/if}
  </div>
  <ImportDialog {store} {content} {uid} bind:open={importing} />
  <TemplateDialog {store} {content} {uid} nodeId={store.selection} bind:open={templating} />
  {#if store.media.available}<MediaDialog {store} {uid} />{/if}
  <div class="sr-only" aria-live="polite">{store.message}</div>
  <div class="sr-only" aria-live="assertive" role="alert">{store.alert}</div>
</div>

<style>
  .editor {
    --cpb-border: #d4d4d8; --cpb-surface: #fff; --cpb-canvas: #f1f5f9; --cpb-muted: #52525b;
    --cpb-accent: #2563eb; --cpb-accent-soft: #dbeafe; --cpb-accent-strong: #1e3a8a; --cpb-danger: #b91c1c;
    font: 14px/1.4 system-ui, sans-serif; color: #18181b; background: var(--cpb-surface);
    display: flex; flex-direction: column; height: 100%; min-height: 600px; border: 1px solid var(--cpb-border);
  }
  .body { flex: 1; display: grid; grid-template-columns: 240px 1fr 280px; min-height: 0; }
  .left { display: grid; grid-template-rows: minmax(0, 45%) minmax(0, 1fr); min-height: 0; border-right: 1px solid var(--cpb-border); }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (max-width: 900px) { .body { grid-template-columns: 1fr; } }
</style>
