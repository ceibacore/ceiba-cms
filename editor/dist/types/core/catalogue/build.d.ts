import type { Catalogue, ComponentDescriptorDto, HtmlTagRuleDto } from './types';
/**
 * Catalogue of the editor. Components of the module win over HTML tags with the same name.
 * Types missing from both are "unknown": kept as data, never inserted, their props locked.
 */
export declare const createCatalogue: (components: readonly ComponentDescriptorDto[], htmlTags?: readonly HtmlTagRuleDto[]) => Catalogue;
