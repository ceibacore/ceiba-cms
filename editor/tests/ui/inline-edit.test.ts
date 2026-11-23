import { describe, expect, it } from 'vitest';
import { cleanText, isMultiline, textKey } from '../../src/ui/canvas/inline-edit';
import { setup } from '../support/session';

describe('inline text editing', () => {
  const { tree, commands } = setup();
  const catalogue = commands.context.catalogue;

  it('edits the prop that holds the visible text, only on leaf nodes the catalogue knows', () => {
    expect(textKey(tree.nodes.h!, catalogue)).toBe('content');
    expect(textKey(tree.nodes.p1!, catalogue)).toBe('content');
    expect(textKey({ ...tree.nodes.b1!, type: 'button' }, catalogue)).toBe('label');
    expect(textKey({ ...tree.nodes.b1!, type: 'heading' }, catalogue)).toBe('text');
    expect(textKey(tree.nodes.c1!, catalogue)).toBeNull();
    expect(textKey(tree.nodes.w1!, catalogue)).toBeNull();
    expect(textKey(tree.nodes.d1!, catalogue)).toBeNull();
  });

  it('keeps plain text: line breaks only where the node is multi-line, no control characters', () => {
    expect(cleanText('a\r\nb\n', true)).toBe('a\nb');
    expect(cleanText('a\nb', false)).toBe('a b');
    expect(cleanText('x\u0000\u0007y\tz', false)).toBe('xyz');
    expect(cleanText('<b>x</b>', false)).toBe('<b>x</b>');
    expect([isMultiline('text'), isMultiline('p'), isMultiline('heading')]).toEqual([true, false, false]);
  });
});
