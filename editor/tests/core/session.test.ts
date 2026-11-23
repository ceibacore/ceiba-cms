import { describe, expect, it } from 'vitest';
import { createEditor, EditorError, sequentialIds } from '../../src/core';
import { MemoryServer } from '../support/memory-transport';

const open = async (server = new MemoryServer()) => {
  const editor = createEditor({ pageId: 'page-1', transport: server.transport(), ids: sequentialIds('new') });
  const events: string[] = [];
  for (const name of ['ready', 'dirty-change', 'save-start', 'save-success', 'save-error', 'conflict'] as const) {
    editor.events.on(name, (payload) => events.push(`${name}:${JSON.stringify(payload)}`));
  }
  await editor.load();
  return { editor, server, events };
};

describe('session', () => {
  it('loads, edits and saves revision base + 1', async () => {
    const { editor, server, events } = await open();
    expect([editor.status, editor.baseRevision, editor.dirty]).toEqual(['ready', 3, false]);
    editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: 'Changed' } });
    expect([editor.status, editor.selection]).toEqual(['dirty', 'p1']);
    expect(await editor.save()).toBe(4);
    expect([editor.status, editor.dirty, editor.baseRevision]).toEqual(['ready', false, 4]);
    expect(server.revisions.get(4)?.root[0]?.children?.[1]?.props).toEqual({ content: 'Changed' });
    expect(events.join('\n')).not.toContain('Changed');
    await expect(editor.save()).rejects.toMatchObject({ code: 'NOTHING_TO_SAVE' });
    expect(await editor.save('autosave')).toBeNull();
  });

  it('edits made while saving stay dirty, and editing is blocked during the request', async () => {
    const { editor } = await open();
    editor.dispatch({ kind: 'rename', id: 'h', name: 'A', label: null });
    const saving = editor.save('autosave');
    expect(editor.status).toBe('saving');
    expect(() => editor.dispatch({ kind: 'remove', id: 'h' })).toThrow(EditorError);
    await saving;
    editor.dispatch({ kind: 'rename', id: 'h', name: 'B', label: null });
    expect(editor.dirty).toBe(true);
  });

  it('a conflict keeps the draft and needs an explicit choice', async () => {
    const { editor, server, events } = await open();
    editor.dispatch({ kind: 'remove', id: 'd1' });
    server.saveElsewhere();
    await expect(editor.save()).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
    expect([editor.status, editor.dirty, editor.tree.nodes.d1]).toEqual(['conflict', true, undefined]);
    expect(events).toContain('conflict:{"baseRevision":3,"currentRevision":4}');
    await expect(editor.save()).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
    await editor.resolveConflict('keep-mine');
    expect([editor.status, editor.baseRevision, server.current]).toEqual(['ready', 5, 5]);
    expect(server.revisions.get(5)?.root.map((n) => n.id)).toEqual(['c1']);
  });

  it('take-theirs reloads the server draft and forgets local history', async () => {
    const { editor, server } = await open();
    editor.dispatch({ kind: 'remove', id: 'd1' });
    server.saveElsewhere();
    await expect(editor.save()).rejects.toThrow();
    await editor.resolveConflict('take-theirs');
    expect([editor.status, editor.baseRevision, editor.canUndo]).toEqual(['ready', 4, false]);
    expect(editor.tree.rootIds).toEqual(['c1', 'd1', 'theirs']);
  });

  it('network and server errors never lose the draft', async () => {
    const { editor, server } = await open();
    editor.dispatch({ kind: 'remove', id: 'h' });
    server.failNext = new EditorError('NETWORK', 'offline');
    await expect(editor.save()).rejects.toMatchObject({ code: 'NETWORK' });
    expect([editor.status, editor.dirty]).toEqual(['offline', true]);
    server.failNext = new EditorError('SERVER', 'boom', { requestId: 'r-1' });
    await expect(editor.save()).rejects.toMatchObject({ code: 'SERVER' });
    expect(editor.status).toBe('dirty');
    expect(await editor.save()).toBe(4);
    expect(editor.tree.nodes.h).toBeUndefined();
  });

  it('refuses to send a document over the size limit', async () => {
    const server = new MemoryServer();
    const editor = createEditor({ pageId: 'page-1', transport: server.transport(), limits: { maxNodes: 500, maxDepth: 15, maxBytes: 600 } });
    await editor.load();
    editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: 'x'.repeat(700) } });
    await expect(editor.save()).rejects.toMatchObject({ code: 'DOCUMENT_TOO_LARGE' });
    expect([editor.status, server.saves.length]).toEqual(['dirty', 0]);
  });

  it('two sessions on the same page do not share state', async () => {
    const server = new MemoryServer();
    const a = (await open(server)).editor;
    const b = (await open(server)).editor;
    a.dispatch({ kind: 'remove', id: 'c1' });
    a.select('d1');
    expect([b.tree.nodes.c1 !== undefined, b.selection, b.dirty]).toEqual([true, null, false]);
  });

  it('a failed load reports load-error and blocks editing', async () => {
    const server = new MemoryServer();
    const transport = { ...server.transport(), load: async () => { throw new EditorError('AUTHORIZATION_DENIED', 'no'); } };
    const editor = createEditor({ pageId: 'page-1', transport });
    await expect(editor.load()).rejects.toMatchObject({ code: 'AUTHORIZATION_DENIED' });
    expect(editor.status).toBe('load-error');
    expect(() => editor.dispatch({ kind: 'remove', id: 'c1' })).toThrow(EditorError);
  });
});
