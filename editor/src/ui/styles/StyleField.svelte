<script lang="ts">
  import type { NodeStyles, PropertySpec, StyleTarget, StyleValue } from '../../core';
  import { acceptedTokenType, effectiveValue, literal, setDeclaration, STYLE_MATRIX } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import { propertyLabel, typedValue } from './groups';

  /**
   * One style property at the current target (of a node or of a site class): literal or token, effective value and
   * its origin, remove. onSet receives the new styles (null when nothing is left).
   */
  let { store, styles, target, spec, id, onSet }: {
    store: EditorStore; styles: NodeStyles | undefined; target: StyleTarget; spec: PropertySpec; id: string;
    onSet: (next: NodeStyles | null) => void;
  } = $props();
  const t = $derived(store.t);
  const effective = $derived(effectiveValue(styles, store.design, target, spec.name));
  const own = $derived(effective?.origin === 'own' ? effective.value : undefined);
  const tokenType = $derived(acceptedTokenType(spec));
  const tokens = $derived(Object.entries(store.design.tokens).filter(([, token]) => token.type === tokenType).map(([key]) => key));
  const keywords = $derived(spec.kind === 'keyword' ? STYLE_MATRIX.keywords[spec.name] ?? [] : []);
  const ownToken = $derived(typeof own === 'object' && own !== null ? own.token : '');
  const ownText = $derived(own === undefined || typeof own === 'object' ? '' : String(own));
  const shown = (value: StyleValue): string => (typeof value === 'object' ? `{${value.token}}` : String(value));
  const origin = $derived(!effective || effective.origin === 'own' ? null
    : effective.origin === 'class' ? t('styles.fromClass', { from: effective.from }) : t('styles.inherited', { from: effective.from }));
  let error = $state<string | null>(null);

  function set(value: StyleValue | null): void {
    if (value !== null && typeof value !== 'object' && literal(spec, value) === null) {
      error = t('styles.invalid');
      return;
    }
    error = null;
    onSet(setDeclaration(styles, target, spec.name, value));
  }

  const fromText = (raw: string): void => set(raw.trim() === '' ? null : typedValue(spec.kind, raw));
</script>

<div class="field">
  <label for={id}>{propertyLabel(spec.name)}</label>
  <div class="row">
    {#if spec.kind === 'token'}
      <select {id} value={ownToken} onchange={(e) => set(e.currentTarget.value === '' ? null : { token: e.currentTarget.value })}>
        <option value="">{effective ? shown(effective.value) : '—'}</option>
        {#each tokens as token (token)}<option value={token}>{token}</option>{/each}
      </select>
    {:else if keywords.length > 0}
      <select {id} value={ownText} onchange={(e) => fromText(e.currentTarget.value)}>
        <option value="">{effective ? shown(effective.value) : '—'}</option>
        {#each keywords as keyword (keyword)}<option value={keyword}>{keyword}</option>{/each}
      </select>
    {:else}
      <input {id} value={ownText} placeholder={effective && effective.origin !== 'own' ? shown(effective.value) : ''}
        onchange={(e) => fromText(e.currentTarget.value)} aria-invalid={error !== null}
        aria-describedby={error ? `${id}-error` : origin ? `${id}-origin` : undefined} />
    {/if}
    {#if tokens.length > 0 && spec.kind !== 'token'}
      <select aria-label={`${t('styles.token')} · ${propertyLabel(spec.name)}`} value={ownToken}
        onchange={(e) => set(e.currentTarget.value === '' ? null : { token: e.currentTarget.value })}>
        <option value="">{t('styles.literal')}</option>
        {#each tokens as token (token)}<option value={token}>{token}</option>{/each}
      </select>
    {/if}
    {#if own !== undefined}
      <button type="button" class="remove" aria-label={t('styles.remove', { property: propertyLabel(spec.name) })} onclick={() => set(null)}>×</button>
    {/if}
  </div>
  {#if error}<p class="error" id={`${id}-error`} role="alert">{error}</p>
  {:else if origin}<p class="origin" id={`${id}-origin`}>{origin}</p>{/if}
</div>

<style>
  .field { display: grid; gap: .2rem; margin: .4rem 0; }
  label { font-size: .75rem; font-weight: 600; }
  .row { display: flex; gap: .25rem; }
  input, select { flex: 1; min-width: 0; font: inherit; font-size: .8rem; padding: .25rem .4rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; }
  [aria-invalid='true'] { border-color: var(--cpb-danger); }
  .remove { font: inherit; padding: 0 .5rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); cursor: pointer; }
  .origin { margin: 0; font-size: .7rem; color: var(--cpb-muted); }
  .error { margin: 0; font-size: .7rem; color: var(--cpb-danger); }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
