import type { Catalogue, NodeRecord } from '../../core';

/** Tags whose text is a single line: Enter finishes the edit instead of adding a line break. */
const SINGLE_LINE = new Set(['heading', 'button', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'li', 'strong', 'em',
  'small', 'label', 'figcaption']);
const MULTI_LINE = new Set(['text', 'p', 'blockquote', 'code']);

/**
 * Prop that holds the visible text of a node, or null when it cannot be edited in place (containers, nodes with
 * children, unknown components, embeds). Plan 03 D-6: plain text and line breaks only.
 */
export const textKey = (node: NodeRecord, catalogue: Catalogue): string | null => {
  if (!catalogue.has(node.type) || node.children.length > 0) return null;
  if (node.type === 'heading') return 'text';
  if (node.type === 'text') return 'content';
  if (node.type === 'button') return 'label';
  return SINGLE_LINE.has(node.type) || MULTI_LINE.has(node.type) ? 'content' : null;
};

export const isMultiline = (type: string): boolean => MULTI_LINE.has(type);

/** Text typed in place: line breaks kept (only for multi-line nodes), other control characters dropped. */
export const cleanText = (raw: string, multiline: boolean): string => {
  const text = raw.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '');
  return multiline ? text.replace(/\n$/, '') : text.replace(/\n+/g, ' ');
};

/** Puts the caret at the end of an element of the canvas document. */
export const caretAtEnd = (element: HTMLElement): void => {
  const doc = element.ownerDocument;
  const range = doc.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = doc.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};
