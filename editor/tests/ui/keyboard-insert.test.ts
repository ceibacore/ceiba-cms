import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/core';
import type { Command, TreeState } from '../../src/core';
import { insertTarget, defaultNode } from '../../src/ui/model/insert';
import { historyAction, treeAction } from '../../src/ui/structure/keyboard';
import { setup } from '../support/session';

const key = (k: string, mods: Partial<{ altKey: boolean; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean }> = {}) =>
  ({ key: k, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...mods });

describe('structure keyboard', () => {
  const { tree, commands } = setup();
  const run = (state: TreeState, command: Command) => applyCommand(state, command, commands.context).state;

  it('navigates in visible order', () => {
    expect(treeAction(tree, null, key('ArrowDown'))).toEqual({ type: 'select', id: 'c1' });
    expect(treeAction(tree, 'c1', key('ArrowDown'))).toEqual({ type: 'select', id: 'h' });
    expect(treeAction(tree, 'w1', key('ArrowDown'))).toEqual({ type: 'select', id: 'd1' });
    expect(treeAction(tree, 'h', key('ArrowLeft'))).toEqual({ type: 'select', id: 'c1' });
    expect(treeAction(tree, 'd1', key('ArrowRight'))).toEqual({ type: 'select', id: 'b1' });
    expect(treeAction(tree, 'h', key('End'))).toEqual({ type: 'select', id: 'b1' });
    expect(treeAction(tree, 'c1', key('ArrowUp'))).toBeNull();
  });

  it('moves, indents and outdents with Alt+arrows', () => {
    const down = treeAction(tree, 'h', key('ArrowDown', { altKey: true }));
    expect(down?.type === 'command' && run(tree, down.command).nodes.c1?.children).toEqual(['p1', 'h', 'w1']);
    const up = treeAction(tree, 'p1', key('ArrowUp', { altKey: true }));
    expect(up?.type === 'command' && run(tree, up.command).nodes.c1?.children).toEqual(['p1', 'h', 'w1']);
    const indent = treeAction(tree, 'd1', key('ArrowRight', { altKey: true }));
    expect(indent?.type === 'command' && run(tree, indent.command).nodes.c1?.children).toEqual(['h', 'p1', 'w1', 'd1']);
    const outdent = treeAction(tree, 'h', key('ArrowLeft', { altKey: true }));
    expect(outdent?.type === 'command' && run(tree, outdent.command).rootIds).toEqual(['c1', 'h', 'd1']);
    expect(treeAction(tree, 'c1', key('ArrowUp', { altKey: true }))).toBeNull();
  });

  it('removes, duplicates and maps undo/redo', () => {
    expect(treeAction(tree, 'h', key('Delete'))).toEqual({ type: 'command', command: { kind: 'remove', id: 'h' } });
    expect(treeAction(tree, 'h', key('d', { ctrlKey: true }))).toEqual({ type: 'command', command: { kind: 'duplicate', id: 'h' } });
    expect(historyAction(key('z', { ctrlKey: true }))).toEqual({ type: 'undo' });
    expect(historyAction(key('Z', { metaKey: true, shiftKey: true }))).toEqual({ type: 'redo' });
    expect(historyAction(key('y', { ctrlKey: true }))).toEqual({ type: 'redo' });
    expect(historyAction(key('z'))).toBeNull();
  });
});

describe('palette insertion target', () => {
  const { tree, commands } = setup();
  const catalogue = commands.context.catalogue;

  it('goes inside a container that accepts the type, else after the selection, else at the end', () => {
    expect(insertTarget(tree, catalogue, 'c1', 'heading')).toEqual({ parent: 'c1', index: 3 });
    expect(insertTarget(tree, catalogue, 'h', 'heading')).toEqual({ parent: 'c1', index: 1 });
    expect(insertTarget(tree, catalogue, 'p1', 'div')).toEqual({ parent: 'c1', index: 2 });
    expect(insertTarget(tree, catalogue, null, 'div')).toEqual({ parent: null, index: 2 });
    expect(defaultNode(catalogue, 'heading')).toEqual({ type: 'heading', props: {}, children: [] });
  });
});
