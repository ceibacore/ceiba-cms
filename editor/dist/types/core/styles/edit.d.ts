import type { DesignDocument, NodeStyles, StyleValue } from './types';
/** Where a declaration is edited: base (breakpoint null) or a breakpoint; states only on base. */
export interface StyleTarget {
    readonly breakpoint: string | null;
    readonly state: string | null;
}
export declare const BASE: StyleTarget;
/**
 * Sets (or removes, with null) one declaration at a target. Removing deletes the key, so the value is inherited
 * again; empty blocks disappear. Returns null when nothing is left.
 */
export declare const setDeclaration: (styles: NodeStyles | undefined, target: StyleTarget, property: string, value: StyleValue | null) => NodeStyles | null;
export declare const setClasses: (styles: NodeStyles | undefined, classes: readonly string[]) => NodeStyles | null;
export interface EffectiveValue {
    readonly value: StyleValue;
    /** own: set at this target; inherited: from a smaller width or base; class: from a site class. */
    readonly origin: 'own' | 'inherited' | 'class';
    /** Breakpoint id ('base') or class id the value comes from. */
    readonly from: string;
}
/** The value a property has at a target, and where it comes from (same cascade as the compiler: node beats class). */
export declare const effectiveValue: (styles: NodeStyles | undefined, design: DesignDocument, target: StyleTarget, property: string) => EffectiveValue | null;
