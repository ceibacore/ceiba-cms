import type { Declarations, DesignDocument, NodeStyles, StyleBlock, StyleValue } from './types';

/** Where a declaration is edited: base (breakpoint null) or a breakpoint; states only on base. */
export interface StyleTarget {
  readonly breakpoint: string | null;
  readonly state: string | null;
}

export const BASE: StyleTarget = { breakpoint: null, state: null };

const declarationsAt = (block: StyleBlock | undefined, target: StyleTarget): Declarations | undefined => {
  if (!block) return undefined;
  if (target.state !== null) return block.states?.[target.state];
  return target.breakpoint === null ? block.base : block.breakpoints?.[target.breakpoint];
};

const prune = <T extends object>(value: T): T | undefined => (Object.keys(value).length === 0 ? undefined : value);

/**
 * Sets (or removes, with null) one declaration at a target. Removing deletes the key, so the value is inherited
 * again; empty blocks disappear. Returns null when nothing is left.
 */
export const setDeclaration = (
  styles: NodeStyles | undefined,
  target: StyleTarget,
  property: string,
  value: StyleValue | null,
): NodeStyles | null => {
  const current = { ...(declarationsAt(styles, target) ?? {}) } as Record<string, StyleValue>;
  if (value === null) delete current[property];
  else current[property] = value;
  const next: Record<string, unknown> = { ...(styles ?? {}) };
  if (target.state !== null) {
    next.states = prune({ ...(styles?.states ?? {}), [target.state]: prune(current) });
  } else if (target.breakpoint !== null) {
    next.breakpoints = prune({ ...(styles?.breakpoints ?? {}), [target.breakpoint]: prune(current) });
  } else {
    next.base = prune(current);
  }
  for (const key of Object.keys(next)) {
    const value = next[key];
    if (value === undefined) delete next[key];
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      for (const [k, v] of Object.entries(value)) if (v === undefined) delete (value as Record<string, unknown>)[k];
      if (Object.keys(value).length === 0) delete next[key];
    }
  }
  if (Array.isArray(next.classes) && next.classes.length === 0) delete next.classes;
  return Object.keys(next).length === 0 ? null : (next as NodeStyles);
};

export const setClasses = (styles: NodeStyles | undefined, classes: readonly string[]): NodeStyles | null => {
  const next: Record<string, unknown> = { ...(styles ?? {}), classes: [...classes] };
  if (classes.length === 0) delete next.classes;
  return Object.keys(next).length === 0 ? null : (next as NodeStyles);
};

export interface EffectiveValue {
  readonly value: StyleValue;
  /** own: set at this target; inherited: from a smaller width or base; class: from a site class. */
  readonly origin: 'own' | 'inherited' | 'class';
  /** Breakpoint id ('base') or class id the value comes from. */
  readonly from: string;
}

/** Chain of targets a value cascades from, nearest first (mobile-first: this width, smaller widths, base). */
const chain = (design: DesignDocument, target: StyleTarget): StyleTarget[] => {
  if (target.state !== null) return [target, BASE];
  const ids = design.breakpoints.map((b) => b.id);
  const at = target.breakpoint === null ? -1 : ids.indexOf(target.breakpoint);
  return [...ids.slice(0, at + 1).reverse().map((id) => ({ breakpoint: id, state: null })), BASE];
};

/** The value a property has at a target, and where it comes from (same cascade as the compiler: node beats class). */
export const effectiveValue = (
  styles: NodeStyles | undefined,
  design: DesignDocument,
  target: StyleTarget,
  property: string,
): EffectiveValue | null => {
  const targets = chain(design, target);
  for (const [i, t] of targets.entries()) {
    const value = declarationsAt(styles, t)?.[property];
    if (value !== undefined) return { value, origin: i === 0 ? 'own' : 'inherited', from: t.state ?? t.breakpoint ?? 'base' };
  }
  for (const id of [...(styles?.classes ?? [])].reverse()) {
    const block = design.classes[id]?.styles;
    for (const t of targets) {
      const value = declarationsAt(block, t)?.[property];
      if (value !== undefined) return { value, origin: 'class', from: id };
    }
  }
  return null;
};
