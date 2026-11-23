<script lang="ts">
  import type { ElementRule } from '../../core';
  import { defaultNode, insertTarget } from '../model/insert';
  import type { ContentActions } from '../content/actions.svelte';
  import type { DragController } from '../drag/controller';
  import type { EditorStore } from '../model/store.svelte';

  let { store, drag, content, onInserted, onImport }: {
    store: EditorStore; drag: DragController; content: ContentActions; onInserted: (id: string) => void; onImport: () => void;
  } = $props();
  const t = $derived(store.t);

  /** Components of the module plus the HTML tags people reach for; the rest stay in the catalogue for imports. */
  const COMMON_TAGS = ['div', 'section', 'h1', 'h2', 'h3', 'p', 'a', 'ul', 'li', 'img'];

  const groups = $derived.by(() => {
    const catalogue = store.catalogue;
    if (!catalogue) return [];
    const rules = [...catalogue.rules.values()]
      .filter((rule) => (rule.label !== rule.type || COMMON_TAGS.includes(rule.type)) && rule.type !== 'html');
    const byCategory = new Map<string, ElementRule[]>();
    for (const rule of rules) byCategory.set(rule.category, [...(byCategory.get(rule.category) ?? []), rule]);
    return [...byCategory.entries()];
  });

  function insert(rule: ElementRule): void {
    const catalogue = store.catalogue;
    if (!catalogue || drag.consumeClick()) return;
    const target = insertTarget(store.tree, catalogue, store.selection, rule.type);
    const ok = store.run({ kind: 'insert', ...target, node: defaultNode(catalogue, rule.type) },
      ['announce.inserted', { label: rule.label }]);
    if (ok && store.selection) onInserted(store.selection);
  }
</script>

<section class="palette" aria-labelledby="cpb-palette-title">
  <h2 id="cpb-palette-title">{t('palette.title')}</h2>
  {#if content.canImport}
    <button type="button" class="wide" onclick={onImport}>{t('palette.import')}</button>
  {/if}
  {#if content.canTemplates && content.templates.length > 0}
    <h3>{t('palette.templates')}</h3>
    <ul>
      {#each content.templates as template (template.id)}
        <li>
          <button type="button" aria-label={t('palette.insertTemplate', { name: template.name })}
            onclick={() => { if (content.insertNodes(template.nodes, template.name) && store.selection) onInserted(store.selection); }}
          >{template.name}</button>
        </li>
      {/each}
    </ul>
  {/if}
  {#each groups as [category, rules] (category)}
    <h3>{category.replace(/_/g, ' ')}</h3>
    <ul>
      {#each rules as rule (rule.type)}
        <li>
          <button type="button" onclick={() => insert(rule)} aria-label={t('palette.insert', { label: rule.label })}
            onpointerdown={(e) => store.catalogue && drag.pressNew(e, { kind: 'insert', node: defaultNode(store.catalogue, rule.type) }, rule.label)}
            data-type={rule.type}>{rule.label}</button>
        </li>
      {/each}
    </ul>
  {/each}
</section>

<style>
  .palette { padding: .5rem .75rem; overflow: auto; }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .05em; margin: 0 0 .5rem; color: var(--cpb-muted); }
  h3 { font-size: .75rem; margin: .5rem 0 .25rem; color: var(--cpb-muted); text-transform: capitalize; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: .25rem; }
  button { touch-action: none; width: 100%; font: inherit; font-size: .8rem; padding: .35rem; border: 1px solid var(--cpb-border); border-radius: 6px; background: var(--cpb-surface); color: inherit; cursor: pointer; text-align: left; }
  button:hover { border-color: var(--cpb-accent); }
  .wide { margin-bottom: .5rem; text-align: center; }
  button:focus-visible { outline: 2px solid var(--cpb-accent); outline-offset: 1px; }
</style>
