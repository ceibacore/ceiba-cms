import { fail } from '../errors';
import type { TreeState } from '../tree/state';
import type { Catalogue } from './types';

const allows = (list: readonly string[], type: string): boolean => list.includes('*') || list.includes(type);

/**
 * Checks that a node of `type` may live under `parent` (null = root). Unknown types (kept from the document)
 * are not checked against their own rules, but a known parent still decides what it accepts.
 */
export const assertPlacement = (state: TreeState, catalogue: Catalogue, type: string, parent: string | null): void => {
  const parentType = parent === null ? null : state.nodes[parent]?.type ?? null;
  const rule = catalogue.get(type);
  if (rule && parentType !== null && !allows(rule.allowedParents, parentType)) {
    fail('PLACEMENT_NOT_ALLOWED', `${type} cannot be placed inside ${parentType}`, { type, parent: parentType });
  }
  if (rule && parentType === null && !allows(rule.allowedParents, '*') && !rule.allowedParents.includes('root')) {
    fail('PLACEMENT_NOT_ALLOWED', `${type} cannot be placed at the root`, { type, parent: 'root' });
  }
  if (parentType === null) return;
  const parentRule = catalogue.get(parentType);
  if (!parentRule) return;
  if (!parentRule.isContainer || !allows(parentRule.allowedChildren, type) || parentRule.disallowedChildren.includes(type)) {
    fail('PLACEMENT_NOT_ALLOWED', `${parentType} does not accept ${type}`, { type, parent: parentType });
  }
};

/** Insertions only accept known types (plan 03: never replace a component silently). */
export const assertKnown = (catalogue: Catalogue, type: string): void => {
  if (!catalogue.has(type)) {
    fail('UNKNOWN_COMPONENT', `Unknown component ${type}`, { type });
  }
};

/** Props of unknown types are locked: the editor has no schema to change them safely. */
export const assertEditable = (catalogue: Catalogue, type: string): void => {
  if (!catalogue.has(type)) {
    fail('LOCKED_COMPONENT', `${type} is not in the catalogue and cannot be edited`, { type });
  }
};

/** New content (insert, paste): every node must be known and every child allowed by its known parent. */
export const assertNewContent = (catalogue: Catalogue, raw: { type: string; children?: { type: string }[] }): void => {
  assertKnown(catalogue, raw.type);
  const rule = catalogue.get(raw.type);
  for (const child of raw.children ?? []) {
    if (rule && (!rule.isContainer || !allows(rule.allowedChildren, child.type) || rule.disallowedChildren.includes(child.type))) {
      fail('PLACEMENT_NOT_ALLOWED', `${raw.type} does not accept ${child.type}`, { type: child.type, parent: raw.type });
    }
    assertNewContent(catalogue, child);
  }
};
