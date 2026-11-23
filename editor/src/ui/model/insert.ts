import type { Catalogue, RawNode, TreeState } from '../../core';
import { childrenOf } from '../../core';

/** Default props of a catalogue entry (propsSchema[key].default). */
export const defaultNode = (catalogue: Catalogue, type: string): RawNode => {
  const props: Record<string, unknown> = {};
  for (const [key, schema] of Object.entries(catalogue.get(type)?.propsSchema ?? {})) {
    const value = (schema as { default?: unknown } | null)?.default;
    if (value !== undefined) props[key] = value;
  }
  return { type, props, children: [] };
};

const accepts = (catalogue: Catalogue, parentType: string, type: string): boolean => {
  const rule = catalogue.get(parentType);
  if (!rule?.isContainer || rule.disallowedChildren.includes(type)) return false;
  return rule.allowedChildren.includes('*') || rule.allowedChildren.includes(type);
};

/**
 * Where the palette inserts: inside the selection when it is a container that accepts the type (as last child),
 * otherwise right after the selection; at the end of the page when nothing is selected.
 */
export const insertTarget = (
  tree: TreeState,
  catalogue: Catalogue,
  selection: string | null,
  type: string,
): { parent: string | null; index: number } => {
  const selected = selection === null ? undefined : tree.nodes[selection];
  if (!selected) return { parent: null, index: tree.rootIds.length };
  if (accepts(catalogue, selected.type, type)) return { parent: selected.id, index: selected.children.length };
  const siblings = childrenOf(tree, selected.parent);
  return { parent: selected.parent, index: siblings.indexOf(selected.id) + 1 };
};
