import { describe, expect, it } from 'vitest';
import { Autosave, createEditor, EditorError, sequentialIds } from '../../src/core';
import type { Timers } from '../../src/core';
import { MemoryServer } from '../support/memory-transport';

const open = async (server = new MemoryServer()) => {
  const editor = createEditor({ pageId: 'page-1', transport: server.transport(), ids: sequentialIds('new') });
  await editor.load();
  return { editor, server };
};

/** Manual clock: run(ms) fires due timers in order, awaiting the saves they start. */
const fakeTimers = () => {
  let now = 0;
  let next = 0;
  const due = new Map<number, { at: number; callback: () => void }>();
  const timers: Timers = {
    set: (callback, ms) => { due.set(++next, { at: now + ms, callback }); return next; },
    clear: (handle) => { due.delete(handle as number); },
    now: () => now,
  };
  const run = async (ms: number): Promise<void> => {
    const end = now + ms;
    for (;;) {
      const [id, timer] = [...due.entries()].sort((a, b) => a[1].at - b[1].at)[0] ?? [];
      if (!timer || timer.at > end) break;
      due.delete(id as number);
      now = timer.at;
      timer.callback();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    now = end;
  };
  return { timers, run, tick: (ms: number) => { now += ms; } };
};

describe('publication', () => {
  it('loads permissions and the published revision, and publishes the saved one', async () => {
    const { editor, server } = await open();
    expect([editor.canPublish, editor.publishedRevision]).toEqual([true, 3]);
    await expect(editor.publish()).rejects.toMatchObject({ code: 'NOTHING_TO_PUBLISH' });
    editor.dispatch({ kind: 'remove', id: 'h' });
    await expect(editor.publish()).rejects.toMatchObject({ code: 'NOTHING_TO_PUBLISH' });
    await editor.save();
    expect(await editor.publish()).toBe(4);
    expect([editor.publishedRevision, server.published, server.publishKeys[0]?.length]).toEqual([4, 4, 32]);
  });

  it('is not offered without the permission, and the server refusal is reported', async () => {
    const server = new MemoryServer();
    server.permissions = ['pages.read', 'pages.update'];
    const { editor } = await open(server);
    expect(editor.canPublish).toBe(false);
    await expect(editor.publish()).rejects.toMatchObject({ code: 'AUTHORIZATION_DENIED' });
  });

  it('a transport without publication gives an editor without it', async () => {
    const server = new MemoryServer();
    const { publish: _publish, capabilities: _caps, status: _status, ...basic } = server.transport();
    const editor = createEditor({ pageId: 'page-1', transport: basic });
    await editor.load();
    expect([editor.canPublish, editor.publishedRevision, editor.capabilities]).toEqual([false, null, null]);
  });
});

describe('autosave', () => {
  it('saves after a quiet moment, once per burst', async () => {
    const { editor, server } = await open();
    const clock = fakeTimers();
    new Autosave(editor, { idleMs: 2000, maxWaitMs: 15000, retryMs: [1000] }, clock.timers).start();
    editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: 'a' } });
    clock.tick(500);
    editor.dispatch({ kind: 'updateProps', id: 'p1', set: { content: 'ab' } });
    await clock.run(1900);
    expect(server.saves).toEqual([]);
    await clock.run(200);
    expect(server.saves).toEqual([{ reason: 'autosave', base: 3 }]);
    expect([editor.status, editor.baseRevision]).toEqual(['ready', 4]);
  });

  it('does not wait forever while edits keep coming', async () => {
    const { editor, server } = await open();
    const clock = fakeTimers();
    new Autosave(editor, { idleMs: 2000, maxWaitMs: 5000, retryMs: [1000] }, clock.timers).start();
    for (let i = 0; i < 6; i++) {
      editor.dispatch({ kind: 'rename', id: 'h', name: `n${i}`, label: null });
      await clock.run(1000);
    }
    expect(server.saves.length).toBe(1);
  });

  it('retries while offline and stops at a conflict until the person chooses', async () => {
    const { editor, server } = await open();
    const clock = fakeTimers();
    new Autosave(editor, { idleMs: 100, maxWaitMs: 1000, retryMs: [1000, 3000] }, clock.timers).start();
    server.failNext = new EditorError('NETWORK', 'offline');
    editor.dispatch({ kind: 'remove', id: 'h' });
    await clock.run(100);
    expect(editor.status).toBe('offline');
    await clock.run(1000);
    expect([editor.status, server.current]).toEqual(['ready', 4]);

    server.saveElsewhere();
    editor.dispatch({ kind: 'remove', id: 'p1' });
    await clock.run(100);
    expect(editor.status).toBe('conflict');
    const attempts = server.saves.length;
    editor.dispatch({ kind: 'remove', id: 'w1' });
    await clock.run(10000);
    expect([editor.status, server.saves.length]).toEqual(['conflict', attempts]);
  });
});
