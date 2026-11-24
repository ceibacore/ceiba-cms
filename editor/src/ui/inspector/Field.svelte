<script lang="ts">
  import type { MessageKey, Translate } from '../i18n';
  import type { FieldSpec } from './fields';
  import { parseField } from './fields';

  let { field, value, id, t, onChange }: {
    field: FieldSpec; value: unknown; id: string; t: Translate; onChange: (value: unknown) => void;
  } = $props();
  let error = $state<string | null>(null);
  const shown = $derived(Array.isArray(value) ? value.filter((v) => typeof v === 'string').join('\n')
    : value === null || value === undefined || typeof value === 'object' ? '' : String(value));

  function change(input: string | boolean): void {
    const parsed = parseField(field, input);
    if ('error' in parsed) {
      error = t(parsed.error as MessageKey);
      return;
    }
    error = null;
    onChange(parsed.value);
  }
</script>

<div class="field">
  {#if field.control === 'checkbox'}
    <label><input {id} type="checkbox" checked={value === true} onchange={(e) => change(e.currentTarget.checked)} /> {field.label}</label>
  {:else}
    <label for={id}>{field.label}</label>
    {#if field.control === 'textarea' || field.control === 'lines'}
      <!-- Lists are committed on change: dropping empty lines while typing would eat the new line. -->
      <textarea {id} rows="3" value={shown} oninput={(e) => { if (field.control !== 'lines') change(e.currentTarget.value); }}
        onchange={(e) => { if (field.control === 'lines') change(e.currentTarget.value); }}
        aria-invalid={error !== null} aria-describedby={error ? `${id}-error` : undefined}></textarea>
    {:else if field.control === 'select'}
      <select {id} value={shown} onchange={(e) => change(e.currentTarget.value)}>
        {#each field.options ?? [] as option (option)}<option value={option}>{option}</option>{/each}
      </select>
    {:else}
      <input {id} type={field.control === 'number' ? 'number' : field.control === 'url' || field.control === 'media' ? 'url' : 'text'} value={shown}
        oninput={(e) => change(e.currentTarget.value)} aria-invalid={error !== null}
        aria-describedby={error ? `${id}-error` : undefined} />
    {/if}
  {/if}
  {#if error}<p class="error" id={`${id}-error`} role="alert">{error}</p>{/if}
</div>

<style>
  .field { display: grid; gap: .25rem; margin-bottom: .75rem; }
  label { font-size: .8rem; font-weight: 600; }
  input:not([type='checkbox']), textarea, select { font: inherit; font-size: .875rem; padding: .35rem .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  [aria-invalid='true'] { border-color: var(--cpb-danger); }
  input:focus-visible, textarea:focus-visible, select:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
  .error { color: var(--cpb-danger); font-size: .75rem; margin: 0; }
</style>
