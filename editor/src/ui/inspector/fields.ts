import type { ElementRule } from '../../core';
import { safeUrl } from '../canvas/sanitize';

export type Control = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'url';

export interface FieldSpec {
  readonly key: string;
  readonly label: string;
  readonly control: Control;
  readonly options?: readonly string[];
}

const CONTROL_ALIASES: Record<string, Control> = {
  text: 'text', string: 'text', textarea: 'textarea', richtext: 'textarea', number: 'number', integer: 'number',
  switch: 'checkbox', boolean: 'checkbox', checkbox: 'checkbox', select: 'select', url: 'url', media_picker: 'url',
};

const TEXT_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'li', 'blockquote', 'strong', 'em',
  'small', 'figcaption', 'label', 'button', 'code']);

const titled = (key: string): string => key.charAt(0).toUpperCase() + key.slice(1).replace(/[_-]/g, ' ');

/**
 * Inspector fields of a node, from the catalogue: editorControls first (they say how), then propsSchema keys
 * without a control (their type says how). HTML tags get content, link, image and class fields.
 */
export const fieldsFor = (rule: ElementRule): FieldSpec[] => {
  const fields: FieldSpec[] = [];
  const seen = new Set<string>();
  for (const [key, raw] of Object.entries(rule.editorControls)) {
    const control = raw as { type?: string; label?: string; options?: unknown[] };
    const options = control.options?.map(String);
    fields.push({ key, label: control.label ?? titled(key), control: CONTROL_ALIASES[control.type ?? ''] ?? 'text',
      ...(options ? { options } : {}) });
    seen.add(key);
  }
  for (const [key, raw] of Object.entries(rule.propsSchema)) {
    if (seen.has(key)) continue;
    const schema = raw as { type?: string; enum?: unknown[] };
    const options = schema.enum?.map(String);
    fields.push({ key, label: titled(key), control: options ? 'select' : CONTROL_ALIASES[schema.type ?? ''] ?? 'text',
      ...(options ? { options } : {}) });
    seen.add(key);
  }
  if (Object.keys(rule.propsSchema).length === 0 && Object.keys(rule.editorControls).length === 0) {
    if (TEXT_TAGS.has(rule.type)) fields.push({ key: 'content', label: 'Content', control: 'textarea' });
    if (rule.type === 'a') fields.push({ key: 'href', label: 'Link', control: 'url' });
    if (rule.type === 'img') fields.push({ key: 'src', label: 'Image', control: 'url' }, { key: 'alt', label: 'Alt', control: 'text' });
    fields.push({ key: 'class', label: 'Class', control: 'text' });
  }
  return fields;
};

/** Value to store for an input, or an error key (translated by the UI) when it is invalid. */
export const parseField = (field: FieldSpec, input: string | boolean): { value: unknown } | { error: string } => {
  if (field.control === 'checkbox') return { value: input === true };
  const value = String(input);
  if (field.control === 'number') {
    if (value.trim() === '') return { value: null };
    const number = Number(value);
    return Number.isFinite(number) ? { value: number } : { error: 'field.number' };
  }
  if (field.control === 'url' && value.trim() !== '' && safeUrl(value) === '') return { error: 'field.url' };
  if (field.control === 'select' && field.options && !field.options.includes(value)) return { error: 'field.option' };
  if (field.control === 'select' && field.options?.every((o) => /^\d+$/.test(o))) return { value: Number(value) };
  return { value };
};
