# @ceibacore/page-builder — editor core

Framework-agnostic visual editor for ceiba-cms pages (plan 03): a **core** without DOM or host routes (03-A) and the
**`<ceiba-page-builder>` Web Component** on top of it (03-B).

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

## Web Component

```html
<ceiba-page-builder id="editor"></ceiba-page-builder>
<script type="module">
  import '/vendor/ceiba-cms/editor/dist/ceiba-page-builder.js';   // defines the element
  import { createHttpTransport } from '/vendor/ceiba-cms/editor/dist/ceiba-page-builder.js';
  const editor = document.getElementById('editor');
  editor.config = {
    pageId: 'page-1', locale: 'es',
    transport: createHttpTransport({ baseUrl: '/api/builder/v1', headers: () => ({ 'X-CSRF-TOKEN': csrf() }) }),
    stylesheets: ['/css/bootstrap.min.css'],   // the page's CSS, only inside the canvas
  };
  editor.addEventListener('save-success', (e) => console.log(e.detail.revision));
</script>
```

- **Layout:** palette, structure tree (WAI-ARIA tree), canvas and inspector, all in its own shadow root.
- **Keyboard:** arrows navigate; Alt+arrows move and (un)indent; Delete removes; Ctrl+D duplicates; Ctrl+Z / Ctrl+Shift+Z undo and redo, never while typing in a field. Errors are announced in `aria-live`.
- **Canvas:** an `<iframe sandbox="allow-same-origin">` (no scripts) drawn by the editor. Only safe tags and attributes are created; `javascript:`/`data:` URLs are dropped; links and forms never navigate; `html` embeds and unknown components show a placeholder.
- **Drag and drop:** drag nodes on the canvas, or components from the palette onto it. A line or a box shows where the drop lands; it turns red when the core refuses it (cycle, placement, limits), and Escape cancels. The keyboard alternative is the structure tree.
- **Text in place:** double click (or F2 in the tree) edits the text of headings, text blocks, buttons and text tags directly on the canvas. Plain text only; text blocks keep line breaks. Enter (Ctrl+Enter in text blocks) or Escape finishes, and the whole edit is one undo step.
- **Saving and publishing:** autosave after a quiet moment (2 s; at most every 15 s while typing; retries offline; `autosave: false` turns it off), Ctrl+S, and **Publish** for the saved revision when the server grants `pages.publish`. The toolbar shows the loaded revision and whether it is published.
- **Conflicts:** when someone else saved first, a dialog takes the focus: keep my changes (saved over theirs), use the server version, or view it. Nothing is decided automatically.
- **Server view:** the saved revision drawn by the module's own renderer (`GET pages/{id}/revisions/{n}/render`), in a frame without scripts, to check that what will be published matches the canvas.
- **Inspector:** generated from the catalogue (`editorControls`, then `propsSchema`); invalid values (unsafe URL, non-numbers) are refused before they reach the document.
- **Events** (`ready`, `selection-change`, `dirty-change`, `save-start`, `save-success`, `save-error`, `conflict`) carry ids and state, never content. Removing the element releases the session.

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
| `src/ui` | Web Component: `element.ts` (mount/unmount), `Editor.svelte` (layout), `canvas/`, `structure/`, `inspector/`, `palette/`, `toolbar/`, `i18n/` (es, en) |

Limits are the server's (500 nodes, 15 levels, 2 MB). A failed command throws an `EditorError` and leaves the tree
untouched. A conflict (412) is never resolved automatically: `resolveConflict('keep-mine' | 'take-theirs')`.

## Develop

```bash
npm ci
npm run check   # files ≤ 200 lines, types (tsc + svelte-check), unit tests, build, browser tests
npm run demo    # two editors on a plain HTML page (demo/), with an in-memory server
```

Browser tests (`e2e/`, Playwright) run against the demo: a page built, reordered, edited, undone and saved with the
keyboard only; two instances on one page; sandboxed canvas; unsafe URLs refused; events without content; drags
(moves, palette, Escape, refused drops) and text edited in place. Drags use CDP mouse input (`e2e/support.ts`): Playwright's
`page.mouse` hangs with a button pressed over a frame that forbids scripts.

The contract test (`tests/contract`) starts `tests/host/server.php` — the module wired by hand on SQLite, without
Laravel or the module router — and runs load → edit → save → reload against it. It needs `php` and `composer install`
in the repository root; without them it is skipped.

**Rule:** no file over 200 lines. When a file grows, split it into a folder with an `index.ts` that assembles it.
