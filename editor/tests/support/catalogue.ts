import { createCatalogue } from '../../src/core';
import type { ComponentDescriptorDto, HtmlTagRuleDto } from '../../src/core';

/** Same shape as ComponentCatalogue::createDefault() of the module (subset). */
export const COMPONENTS: ComponentDescriptorDto[] = [
  { name: 'container', version: 1, label: 'Container', category: 'layout', isContainer: true,
    allowedChildren: ['*'], allowedParents: ['*'] },
  { name: 'row', version: 1, label: 'Grid Row', category: 'layout', isContainer: true,
    allowedChildren: ['col'], allowedParents: ['container', 'section', 'div'] },
  { name: 'col', version: 1, label: 'Column', category: 'layout', isContainer: true,
    allowedChildren: ['*'], allowedParents: ['row'] },
  { name: 'heading', version: 1, label: 'Heading', category: 'basic', propsSchema: { text: { type: 'string' } } },
  { name: 'text', version: 1, label: 'Text', category: 'basic' },
  { name: 'image', version: 1, label: 'Image', category: 'media' },
  { name: 'button', version: 1, label: 'Button', category: 'basic' },
];

export const HTML_TAGS: HtmlTagRuleDto[] = [
  { tag: 'div', category: 'block', allows_children: true, allowed_children: ['*'] },
  { tag: 'p', category: 'block', allows_children: true, allowed_children: ['span', 'a'], disallowed_children: ['div', 'p'] },
  { tag: 'span', category: 'inline', allows_children: true, allowed_children: ['*'], disallowed_children: ['div', 'p'] },
  { tag: 'a', category: 'inline', allows_children: true, allowed_children: ['span'] },
  { tag: 'h1', category: 'heading', allows_children: true, allowed_children: ['span', 'a'] },
];

export const catalogue = () => createCatalogue(COMPONENTS, HTML_TAGS);
