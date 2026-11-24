# Style compiler fixtures (plan 04)

Each file is one case shared by the two compilers: `src/PageBuilder/Domain/Style/StyleCompiler.php` (public site,
previews) and `editor/src/core/styles/compile.ts` (editor canvas). Both must give exactly `css` and `diagnostics`
for `design` + `nodes`; `tests/PageBuilder/Style/StyleFixturesTest.php` and `editor/tests/styles/fixtures.test.ts`
fail otherwise.

- `design`: `{breakpoints: [{id, minWidth}], tokens: {id: {type, value}}, classes: {id: {name?, styles}}}`
- `nodes`: styled nodes in document order, `{id, styles: {classes?, base?, states?, breakpoints?}}`
- `assets` (optional, plan 05): `{id: url}` as the host's `MediaResolver` gives them; `{"asset": id}` values
  compile to `url("…")` only for `image` properties and only when the URL is http(s) or a site path made of
  URL-safe ASCII.
- `diagnostics`: `{path, code}` in processing order; the declaration at `path` was left out of the CSS.

Expected values are reviewed by hand. When a rule changes, change both compilers, then the fixtures, and review
the diff of the expected CSS line by line: never copy one compiler's output without reading it.
