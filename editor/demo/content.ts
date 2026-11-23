import type { RawNode, TemplateSummary } from '../src/core';

/** Rough stand-in for the server HTML importer: known tags become nodes, scripts and unknown tags are dropped. */
const KEEP = new Set(['div', 'section', 'h1', 'h2', 'h3', 'p', 'a', 'ul', 'li']);

const toNodes = (element: Element): RawNode[] => {
  const tag = element.tagName.toLowerCase();
  if (!KEEP.has(tag)) return [];
  const children = Array.from(element.children).flatMap(toNodes);
  const props: Record<string, unknown> = {};
  if (children.length === 0) props.content = element.textContent ?? '';
  if (tag === 'a') props.href = element.getAttribute('href') ?? '#';
  return [{ type: tag, props, children }];
};

export const importHtml = (html: string): { nodes: RawNode[]; warnings: string[] } => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const dropped = doc.querySelectorAll('script').length;
  return { nodes: Array.from(doc.body.children).flatMap(toNodes), warnings: dropped > 0 ? [`${dropped} script(s) dropped`] : [] };
};

export class TemplateStore {
  readonly templates: TemplateSummary[] = [{
    id: 'tpl-cta', name: 'Call to action', category: 'general',
    nodes: [{ type: 'container', props: { fluid: false }, children: [
      { type: 'heading', props: { text: 'Ready?', level: 2 }, children: [] },
      { type: 'button', props: { label: 'Start', url: '/start' }, children: [] },
    ] }],
  }];

  save(template: { name: string; category: string; nodes: RawNode[] }): TemplateSummary {
    const saved = { id: `tpl-${this.templates.length + 1}`, ...template };
    this.templates.push(saved);
    return saved;
  }
}
