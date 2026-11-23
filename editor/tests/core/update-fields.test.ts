import { describe, expect, it } from 'vitest';
import { EditorError } from '../../src/core';
import { setup, snapshot } from '../support/session';

describe('updateFields (loop, condition, bindings)', () => {
  it('sets and removes the dynamic fields, and the inverse restores them exactly', () => {
    const { commands, tree } = setup();
    const loop = { source: 'module:courses', variable: 'course', key: 'id' };
    const set = commands.apply(tree, { kind: 'updateFields', id: 'd1', set: { loop, condition: 'user.logged' } });
    expect([set.state.nodes.d1?.fields.loop, set.state.nodes.d1?.fields.condition]).toEqual([loop, 'user.logged']);
    expect(snapshot(commands.apply(set.state, set.inverse).state)).toEqual(snapshot(tree));

    const removed = commands.apply(set.state, { kind: 'updateFields', id: 'd1', set: {}, unset: ['loop'] });
    expect(removed.state.nodes.d1?.fields).not.toHaveProperty('loop');
    expect(commands.apply(removed.state, removed.inverse).state.nodes.d1?.fields.loop).toEqual(loop);
  });

  it('never touches other fields, and unknown components stay locked', () => {
    const { commands, tree } = setup();
    for (const field of ['type', 'id', 'name', 'children', 'props', 'x-analytics']) {
      expect(() => commands.apply(tree, { kind: 'updateFields', id: 'c1', set: { [field]: 'x' } }))
        .toThrow(expect.objectContaining({ code: 'INVALID_TARGET' }) as EditorError);
    }
    expect(() => commands.apply(tree, { kind: 'updateFields', id: 'w1', set: { condition: 'x' } }))
      .toThrow(expect.objectContaining({ code: 'LOCKED_COMPONENT' }) as EditorError);
  });
});
