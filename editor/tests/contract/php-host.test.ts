import { spawn, spawnSync } from 'node:child_process';
import type { ChildProcess } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createEditor, createHttpTransport } from '../../src/core';

// Contract with the real module (plan 03-A): load → edit → save → reload against a plain PHP host on SQLite.
const host = fileURLToPath(new URL('../host/server.php', import.meta.url));
const vendor = fileURLToPath(new URL('../../../vendor/autoload.php', import.meta.url));
const available = spawnSync('php', ['-v']).status === 0 && existsSync(vendor);
const port = 18000 + Math.floor(Math.random() * 1000);
const baseUrl = `http://127.0.0.1:${port}`;
let server: ChildProcess | undefined;
let dir = '';

const waitFor = async (url: string): Promise<void> => {
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error(`PHP host did not start at ${url}`);
};

describe.skipIf(!available)('editor core against a minimal PHP host', () => {
  beforeAll(async () => {
    dir = mkdtempSync(join(tmpdir(), 'ceiba-editor-'));
    server = spawn('php', ['-S', `127.0.0.1:${port}`, host], {
      env: { ...process.env, CMS_EDITOR_DB: join(dir, 'host.sqlite') }, stdio: 'ignore',
    });
    await waitFor(`${baseUrl}/api/builder/v1/components`);
  });

  afterAll(() => {
    server?.kill();
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  const transport = () => createHttpTransport({
    baseUrl: `${baseUrl}/api/builder/v1`, rulesUrl: `${baseUrl}/api/pagebuilder/rules`,
  });

  it('loads, edits, saves and reloads the same document', async () => {
    const editor = createEditor({ pageId: 'page-1', transport: transport() });
    await editor.load();
    expect(editor.baseRevision).toBe(1);
    expect(editor.catalogue.has('heading') && editor.catalogue.has('p')).toBe(true);

    editor.dispatch({ kind: 'updateProps', id: 't1', set: { text: 'Edited' } });
    editor.dispatch({ kind: 'insert', parent: 'c1', index: 1, node: { type: 'p', props: { content: 'New' } } });
    editor.dispatch({ kind: 'duplicate', id: 't1' });
    const saved = editor.toDocument().root;
    expect(await editor.save()).toBe(2);

    const reloaded = createEditor({ pageId: 'page-1', transport: transport() });
    await reloaded.load();
    expect(reloaded.baseRevision).toBe(2);
    expect(reloaded.toDocument().root).toEqual(saved);

    const stored = await transport().preview('page-1', 2);
    expect(stored.root).toEqual(saved);
  });

  it('a stale save gets a conflict from the server and keep-mine resolves it', async () => {
    const first = createEditor({ pageId: 'page-1', transport: transport() });
    const second = createEditor({ pageId: 'page-1', transport: transport() });
    await first.load();
    await second.load();
    first.dispatch({ kind: 'rename', id: 'c1', name: 'First', label: null });
    second.dispatch({ kind: 'rename', id: 'c1', name: 'Second', label: null });
    const revision = await first.save('autosave');
    await expect(second.save()).rejects.toMatchObject({ code: 'REVISION_CONFLICT' });
    expect(second.status).toBe('conflict');
    await second.resolveConflict('keep-mine');
    expect(second.baseRevision).toBe((revision as number) + 1);
    const check = createEditor({ pageId: 'page-1', transport: transport() });
    await check.load();
    expect(check.tree.nodes.c1?.fields.name).toBe('Second');
  });

  it('server validation and missing pages come back as editor errors with stable codes', async () => {
    await expect(transport().load('missing')).rejects.toMatchObject({ code: 'NODE_NOT_FOUND' });
    const editor = createEditor({ pageId: 'page-1', transport: transport() });
    await editor.load();
    const document = { ...editor.toDocument(), root: [{ children: [] }] } as unknown as ReturnType<typeof editor.toDocument>;
    await expect(transport().save(document, editor.baseRevision, 'edit'))
      .rejects.toMatchObject({ code: 'VALIDATION_FAILED', details: { status: '422' } });
  });
});
