<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Modal <dialog> of the editor: focus goes in, Escape and Cancel close it, focus returns to the opener. */
  let { open = $bindable(false), title, uid, submitLabel, cancelLabel, busy = false, onSubmit, children }: {
    open?: boolean; title: string; uid: string; submitLabel: string; cancelLabel: string; busy?: boolean;
    onSubmit: () => void | Promise<void>; children: Snippet;
  } = $props();
  let dialog: HTMLDialogElement | undefined = $state();
  let opener: Element | null = null;

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) {
      opener = (dialog.getRootNode() as Document | ShadowRoot).activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  });
</script>

<dialog bind:this={dialog} aria-labelledby={`${uid}-title`}
  onclose={() => { open = false; (opener as HTMLElement | null)?.focus?.(); }}>
  <form method="dialog" onsubmit={(e) => { e.preventDefault(); void onSubmit(); }}>
    <h2 id={`${uid}-title`}>{title}</h2>
    {@render children()}
    <div class="actions">
      <button type="button" onclick={() => { open = false; }}>{cancelLabel}</button>
      <button type="submit" class="primary" disabled={busy}>{submitLabel}</button>
    </div>
  </form>
</dialog>

<style>
  dialog { border: 1px solid var(--cpb-border); border-radius: 10px; padding: 1rem; width: min(560px, 90vw); color: inherit; font: inherit; }
  dialog::backdrop { background: rgb(15 23 42 / .45); }
  h2 { font-size: 1rem; margin: 0 0 .75rem; }
  .actions { display: flex; justify-content: flex-end; gap: .5rem; margin-top: 1rem; }
  button { font: inherit; padding: .35rem .75rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; }
  button.primary { background: var(--cpb-accent); border-color: var(--cpb-accent); color: #fff; }
  button:disabled { opacity: .5; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
