# @ceibacore/page-builder — editor core

Framework-agnostic visual editor for ceiba-cms pages (plan 03). This first part (03-A) is the **core**: no DOM and no
host routes. The UI (`<ceiba-page-builder>` Web Component) arrives in 03-B on top of it.

`dist/` is committed and built for every tag, so PHP hosts can serve it without Node.

## Use

```ts
import { createEditor, createHttpTransport } from '@ceibacore/page-builder';

const editor = createEditor({
  pageId: 'page-1',
  transport: createHttpTransport({
    baseUrl: '/api/builder/v1',             // module adapter, or the host's own routes through its own Transport
    rulesUrl: '/api/pagebuilder/rules',     // HTML tag rules (optional)
    headers: () => ({ 'X-CSRF-TOKEN': csrf() }),  // read per request; never stored by the editor
  }),
});
await editor.load();
editor.events.on('dirty-change', ({ dirty }) => …);
editor.dispatch({ kind: 'insert', parent: 'c1', index: 0, node: { type: 'heading', props: { text: 'Hi' } } });
editor.undo();
await editor.save('autosave');            // If-Match: "n", creates revision n + 1
```

A host with its own routes (Campus) implements `Transport` (`load`, `save`, `preview`, `listComponents`,
`listElementRules`) and keeps its session, CSRF and permissions.

## Pieces

| Folder | Role |
|---|---|
| `src/core/document` | Envelope v1: read (repairs missing or repeated ids) and write; keeps unknown fields and types |
| `src/core/tree` | Normalized tree (`nodes` by id, parent pointers, ordered children), immutable updates |
| `src/core/catalogue` | Components of the module + HTML tag rules; placement rules; unknown types are kept and locked |
| `src/core/commands` | `insert`, `remove`, `move`, `duplicate`, `updateProps`, `rename`, `replace`; each returns its inverse |
| `src/core/history` | Undo/redo; bursts of the same edit merge (500 ms); configurable limit |
| `src/core/transport` | `Transport` contract and the reference HTTP adapter; errors with stable codes |
| `src/core/session` | `EditorSession`: states `loading · ready · dirty · saving · conflict · offline · load-error` |

Limits are the server's (500 nodes, 15 levels, 2 MB). A failed command throws an `EditorError` and leaves the tree
untouched. A conflict (412) is never resolved automatically: `resolveConflict('keep-mine' | 'take-theirs')`.

## Develop

```bash
npm ci
npm run check   # files ≤ 200 lines, types, tests, build
```

The contract test (`tests/contract`) starts `tests/host/server.php` — the module wired by hand on SQLite, without
Laravel or the module router — and runs load → edit → save → reload against it. It needs `php` and `composer install`
in the repository root; without them it is skipped.

**Rule:** no file over 200 lines. When a file grows, split it into a folder with an `index.ts` that assembles it.
