import { describe, expect, it } from 'vitest';
import { createEditor, sequentialIds } from '../../src/core';
import { MemoryServer } from '../support/memory-transport';
import { snapshot } from '../support/session';

const open = async (limit = 100) => {
  let now = 0;
  const editor = createEditor({ pageId: 'page-1', transport: new MemoryServer().transport(), ids: sequentialIds('new'),
    history: { limit, groupWindowMs: 500 }, now: () => now });
  await editor.load();
  return { editor, tick: (ms: number) => { now += ms; } };
};

describe('history', () => {
  it('groups a burst of typing into one step and splits after a pause', async () => {
    const { editor, tick } = await open();
    const original = snapshot(editor.tree);
    for (const text of ['H', 'He', 'Hel']) {
      editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: text } });
      tick(100);
    }
    tick(1000);
    editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: 'Hello' } });
    editor.undo();
    expect(editor.tree.nodes.p1?.fields.props).toEqual({ content: 'Hel' });
    editor.undo();
    expect(snapshot(editor.tree)).toEqual(original);
    expect(editor.canUndo).toBe(false);
    editor.redo();
    expect(editor.tree.nodes.p1?.fields.props).toEqual({ content: 'Hel' });
  });

  it('redo keeps the ids it created, so later steps still apply', async () => {
    const { editor, tick } = await open();
    editor.dispatch({ kind: 'insert', parent: null, index: 0, node: { type: 'div' } });
    const inserted = editor.selection as string;
    tick(10);
    editor.dispatch({ kind: 'insert', parent: inserted, index: 0, node: { type: 'p' } });
    const after = snapshot(editor.tree);
    editor.undo();
    editor.undo();
    expect(editor.tree.nodes[inserted]).toBeUndefined();
    editor.redo();
    editor.redo();
    expect(snapshot(editor.tree)).toEqual(after);
  });

  it('a new edit clears redo, and the limit drops the oldest steps', async () => {
    const { editor, tick } = await open(2);
    for (const id of ['h', 'p1', 'b1']) {
      editor.dispatch({ kind: 'rename', id, name: `N-${id}`, label: null });
      tick(10);
    }
    editor.undo();
    editor.undo();
    expect(editor.canUndo).toBe(false);
    expect(editor.tree.nodes.h?.fields.name).toBe('N-h');
    expect(editor.canRedo).toBe(true);
    editor.dispatch({ kind: 'remove', id: 'b1' });
    expect(editor.canRedo).toBe(false);
  });

  it('a failed command adds no step and changes nothing', async () => {
    const { editor } = await open();
    const before = editor.tree;
    expect(() => editor.dispatch({ kind: 'move', id: 'c1', parent: 'h', index: 0 })).toThrow();
    expect(editor.tree).toBe(before);
    expect(editor.canUndo).toBe(false);
    expect(editor.dirty).toBe(false);
  });
});
