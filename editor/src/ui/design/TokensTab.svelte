<script lang="ts">
  import { STYLE_MATRIX, tokenLiteral } from '../../core';
  import type { EditorStore } from '../model/store.svelte';
  import { TOKEN_ID, tokenUsagesInDesign, withToken, withoutToken } from './ops';

  /** Tokens of the site: change values, add, and delete only when nothing uses them (design or pages). */
  let { store, uid }: { store: EditorStore; uid: string } = $props();
  const t = $derived(store.t);
  const tokens = $derived(Object.entries(store.design.tokens));
  let newId = $state('');
  let newType = $state('color');
  let newValue = $state('');
  let message = $state<string | null>(null);

  const valid = (type: string, value: string): boolean => tokenLiteral(type, value) !== null;

  function change(id: string, value: string): void {
    const token = store.design.tokens[id];
    if (!token) return;
    if (!valid(token.type, value)) {
      message = t('design.badValue');
      return;
    }
    message = null;
    store.designSession.update(withToken(store.design, id, { ...token, value }));
  }

  function add(): void {
    if (!TOKEN_ID.test(newId) || newId in store.design.tokens) { message = t('design.badId'); return; }
    if (!valid(newType, newValue)) { message = t('design.badValue'); return; }
    message = null;
    store.designSession.update(withToken(store.design, newId, { type: newType, value: newValue }));
    newId = '';
    newValue = '';
  }

  async function remove(id: string): Promise<void> {
    const pages = (await store.session.transport.designUsages?.('token', id).catch(() => [])) ?? [];
    const where = [...tokenUsagesInDesign(store.design, id), ...pages.map((p) => p.title)];
    if (where.length > 0) { message = t('design.inUse', { name: id, where: where.join(', ') }); return; }
    message = null;
    store.designSession.update(withoutToken(store.design, id));
  }
</script>

<table>
  <thead><tr><th scope="col">{t('design.id')}</th><th scope="col">{t('design.type')}</th><th scope="col">{t('design.value')}</th><th></th></tr></thead>
  <tbody>
    {#each tokens as [id, token] (id)}
      <tr>
        <th scope="row">{id}</th>
        <td>{token.type}</td>
        <td>{#if typeof token.value === 'string'}
          <input aria-label={`${t('design.value')} · ${id}`} value={token.value} onchange={(e) => change(id, e.currentTarget.value)} />
        {:else}→ {token.value.token}{/if}</td>
        <td><button type="button" aria-label={t('design.delete', { name: id })} onclick={() => remove(id)}>×</button></td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="add">
  <input aria-label={t('design.id')} placeholder="color.accent" bind:value={newId} />
  <select aria-label={t('design.type')} bind:value={newType}>
    {#each STYLE_MATRIX.tokenTypes as type (type)}<option value={type}>{type}</option>{/each}
  </select>
  <input aria-label={t('design.value')} id={`${uid}-token-value`} bind:value={newValue} />
  <button type="button" onclick={add}>{t('design.add')}</button>
</div>
{#if message}<p class="message" role="alert">{message}</p>{/if}

<style>
  table { width: 100%; border-collapse: collapse; font-size: .78rem; }
  th, td { text-align: left; padding: .2rem; border-bottom: 1px solid var(--cpb-border); }
  input, select { width: 100%; box-sizing: border-box; font: inherit; font-size: .78rem; padding: .2rem .35rem; border: 1px solid var(--cpb-border); border-radius: 5px; }
  .add { display: grid; grid-template-columns: 1fr auto 1fr auto; gap: .25rem; margin-top: .5rem; }
  button { font: inherit; font-size: .78rem; padding: .2rem .5rem; border: 1px solid var(--cpb-border); border-radius: 5px; background: var(--cpb-surface); cursor: pointer; }
  .message { color: var(--cpb-danger); font-size: .75rem; }
  :focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
