import type { ComponentDescriptorDto, HtmlTagRuleDto } from '../src/core';
import { CONTENT_COMPONENTS } from './catalogue-content';
import { DYNAMIC_COMPONENTS } from './catalogue-dynamic';

/** Same descriptors as ComponentCatalogue::createDefault() in the module. */
export const COMPONENTS: ComponentDescriptorDto[] = [
  { name: 'html', version: 1, label: 'Raw HTML / Embed', category: 'basic', propsSchema: { content: { type: 'string', default: '' } },
    allowedChildren: [], editorControls: { content: { type: 'textarea', label: 'HTML Content' } } },
  { name: 'container', version: 1, label: 'Container', category: 'layout', isContainer: true,
    propsSchema: { fluid: { type: 'boolean', default: false } }, editorControls: { fluid: { type: 'switch', label: 'Full Width' } } },
  { name: 'row', version: 1, label: 'Grid Row', category: 'layout', isContainer: true, allowedChildren: ['col'],
    allowedParents: ['container', 'section', 'div'], propsSchema: { gutter: { type: 'string', default: '3' } },
    editorControls: { gutter: { type: 'select', options: ['1', '2', '3', '4', '5'] } } },
  { name: 'col', version: 1, label: 'Grid Column', category: 'layout', isContainer: true, allowedParents: ['row'],
    propsSchema: { xs: { type: 'integer', default: 12 }, md: { type: 'integer', default: 6 } },
    editorControls: { xs: { type: 'number' }, md: { type: 'number' } } },
  { name: 'heading', version: 1, label: 'Heading', category: 'basic',
    propsSchema: { text: { type: 'string', default: 'Title' }, level: { type: 'integer', default: 2 } },
    editorControls: { text: { type: 'text' }, level: { type: 'select', options: [1, 2, 3, 4, 5, 6] } } },
  { name: 'text', version: 1, label: 'Text Block', category: 'basic',
    propsSchema: { content: { type: 'string', default: 'Paragraph text' } }, editorControls: { content: { type: 'richtext' } } },
  { name: 'image', version: 1, label: 'Image', category: 'media',
    propsSchema: { src: { type: 'string', default: '' }, alt: { type: 'string', default: '' } },
    editorControls: { src: { type: 'media_picker' }, alt: { type: 'text' } } },
  { name: 'button', version: 1, label: 'Button', category: 'basic',
    propsSchema: { label: { type: 'string', default: 'Click Me' }, url: { type: 'string', default: '#' } },
    editorControls: { label: { type: 'text' }, url: { type: 'url' } } },
  ...CONTENT_COMPONENTS,
  ...DYNAMIC_COMPONENTS,
];

export const HTML_TAGS: HtmlTagRuleDto[] = [
  { tag: 'div', category: 'block', allows_children: true, allowed_children: ['*'] },
  { tag: 'section', category: 'block_section', allows_children: true, allowed_children: ['*'] },
  { tag: 'p', category: 'block', allows_children: true, allowed_children: ['span', 'a'], disallowed_children: ['div', 'p'] },
  { tag: 'a', category: 'inline', allows_children: true, allowed_children: ['span'] },
  { tag: 'h1', category: 'heading', allows_children: true, allowed_children: ['span', 'a'] },
];
