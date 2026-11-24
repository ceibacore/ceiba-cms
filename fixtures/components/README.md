# Component markup fixtures (plan 05-B)

Each file holds cases shared by the Bootstrap 5 views (`src/PageBuilder/Frameworks/Bootstrap5/views`) and the editor
canvas (`editor/src/ui/canvas/components`). Both must give exactly `html` for `node` once its `{asset}` references are
resolved with `media`; `tests/PageBuilder/Components/ComponentFixturesTest.php` and
`editor/tests/canvas/components.test.ts` fail otherwise. The server output is compared after removing whitespace
between tags.

- `media`: `{id: {url, width, height, alt, variants: [{url, width}]}}`, as the host's `MediaResolver` gives them.
- `cases`: `[{node, html}]`, where `node` may have children (drawn where the component puts its slot); an empty `html` means the component draws nothing (the canvas shows a placeholder).

Expected values are written and reviewed by hand; never copy one side's output without reading it.
