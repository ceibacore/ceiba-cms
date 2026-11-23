import { describe, expect, it } from 'vitest';
import { dropTarget, zoneFor } from '../../src/ui/drag/target';
import { setup } from '../support/session';

describe('drop targets', () => {
  const { tree, commands } = setup();
  const context = commands.context;

  it('split elements into zones; containers have an inside zone', () => {
    expect([zoneFor(0, 100, 10, true), zoneFor(0, 100, 50, true), zoneFor(0, 100, 90, true)]).toEqual(['before', 'inside', 'after']);
    expect([zoneFor(0, 100, 40, false), zoneFor(0, 100, 60, false), zoneFor(0, 0, 0, false)]).toEqual(['before', 'after', 'after']);
  });

  it('turn a position into the move or insert the core accepts', () => {
    expect(dropTarget(tree, context, { kind: 'move', id: 'h' }, 'w1', 'after').command)
      .toEqual({ kind: 'move', id: 'h', parent: 'c1', index: 3 });
    expect(dropTarget(tree, context, { kind: 'move', id: 'b1' }, 'c1', 'inside').command)
      .toEqual({ kind: 'move', id: 'b1', parent: 'c1', index: 3 });
    expect(dropTarget(tree, context, { kind: 'insert', node: { type: 'div' } }, null, 'inside').command)
      .toEqual({ kind: 'insert', parent: null, index: 2, node: { type: 'div' } });
  });

  it('refuse cycles and placements the catalogue forbids, without touching the tree', () => {
    const before = tree;
    expect(dropTarget(tree, context, { kind: 'move', id: 'c1' }, 'p1', 'before').refused).toBe('CYCLE');
    expect(dropTarget(tree, context, { kind: 'move', id: 'c1' }, 'c1', 'inside').refused).toBe('CYCLE');
    expect(dropTarget(tree, context, { kind: 'move', id: 'd1' }, 'p1', 'inside').refused).toBe('PLACEMENT_NOT_ALLOWED');
    expect(dropTarget(tree, context, { kind: 'insert', node: { type: 'row' } }, 'c1', 'before').refused).toBe('PLACEMENT_NOT_ALLOWED');
    expect(tree).toBe(before);
  });

  it('dropping a node next to itself is a no-op, not an error', () => {
    const same = dropTarget(tree, context, { kind: 'move', id: 'p1' }, 'h', 'after');
    expect([same.command, same.refused]).toEqual([null, null]);
  });
});
