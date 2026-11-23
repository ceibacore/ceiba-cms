import type { Catalogue, ComponentDescriptorDto, ElementRule, HtmlTagRuleDto } from './types';

const fromComponent = (dto: ComponentDescriptorDto): ElementRule => ({
  type: dto.name,
  label: dto.label,
  category: dto.category,
  isContainer: dto.isContainer ?? false,
  allowedChildren: dto.isContainer ? dto.allowedChildren ?? ['*'] : [],
  disallowedChildren: [],
  allowedParents: dto.allowedParents ?? ['*'],
  propsSchema: dto.propsSchema ?? {},
  editorControls: dto.editorControls ?? {},
  version: dto.version,
});

const fromHtmlTag = (dto: HtmlTagRuleDto): ElementRule => ({
  type: dto.tag,
  label: dto.tag,
  category: dto.category ?? 'html',
  isContainer: dto.allows_children ?? false,
  allowedChildren: dto.allows_children ? dto.allowed_children ?? ['*'] : [],
  disallowedChildren: dto.disallowed_children ?? [],
  allowedParents: ['*'],
  propsSchema: {},
  editorControls: {},
  version: 1,
});

/**
 * Catalogue of the editor. Components of the module win over HTML tags with the same name.
 * Types missing from both are "unknown": kept as data, never inserted, their props locked.
 */
export const createCatalogue = (
  components: readonly ComponentDescriptorDto[],
  htmlTags: readonly HtmlTagRuleDto[] = [],
): Catalogue => {
  const rules = new Map<string, ElementRule>();
  for (const tag of htmlTags) rules.set(tag.tag, fromHtmlTag(tag));
  for (const component of components) rules.set(component.name, fromComponent(component));
  return {
    rules,
    get: (type) => rules.get(type),
    has: (type) => rules.has(type),
  };
};
