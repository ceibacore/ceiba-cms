/** What the editor needs to know about a node type; built from the module catalogue and the HTML tag rules. */
export interface ElementRule {
  readonly type: string;
  readonly label: string;
  readonly category: string;
  readonly isContainer: boolean;
  /** Types allowed as children; ['*'] allows any. */
  readonly allowedChildren: readonly string[];
  readonly disallowedChildren: readonly string[];
  /** Types allowed as parent; ['*'] allows any (root included). */
  readonly allowedParents: readonly string[];
  readonly propsSchema: Readonly<Record<string, unknown>>;
  readonly editorControls: Readonly<Record<string, unknown>>;
  readonly version: number;
}

export interface Catalogue {
  readonly rules: ReadonlyMap<string, ElementRule>;
  get(type: string): ElementRule | undefined;
  has(type: string): boolean;
}

/** Component descriptor as GET {prefix}/components returns it (ComponentDescriptor::toArray). */
export interface ComponentDescriptorDto {
  name: string;
  version: number;
  label: string;
  category: string;
  propsSchema?: Record<string, unknown>;
  allowedChildren?: string[];
  allowedParents?: string[];
  editorControls?: Record<string, unknown>;
  capabilities?: string[];
  isContainer?: boolean;
}

/** One entry of the HTML tag rules (HtmlSemanticRulesProvider::getRules). */
export interface HtmlTagRuleDto {
  tag: string;
  category?: string;
  allows_children?: boolean;
  allowed_children?: string[];
  disallowed_children?: string[];
}
