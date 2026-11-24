import type { ElementRule } from '../../core';
export type Control = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'url' | 'media';
export interface FieldSpec {
    readonly key: string;
    readonly label: string;
    readonly control: Control;
    readonly options?: readonly string[];
}
/**
 * Inspector fields of a node, from the catalogue: editorControls first (they say how), then propsSchema keys
 * without a control (their type says how). HTML tags get content, link, image and class fields.
 */
export declare const fieldsFor: (rule: ElementRule) => FieldSpec[];
/** Value to store for an input, or an error key (translated by the UI) when it is invalid. */
export declare const parseField: (field: FieldSpec, input: string | boolean) => {
    value: unknown;
} | {
    error: string;
};
