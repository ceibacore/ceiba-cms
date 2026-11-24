import { PROPERTY_BY_NAME, STYLE_MATRIX } from './matrix';
import type { ResolvedToken } from './tokens';
import { resolveTokens } from './tokens';
import type { Breakpoint, CompiledStyles, Declarations, DesignDocument, StyleBlock, StyleDiagnostic, StyledNode } from './types';
import { acceptedTokenType, assetUrl, literal } from './values';

/**
 * CSS compiler of plan 04 (mirrored by src/PageBuilder/Domain/Style/StyleCompiler.php; fixtures/styles keeps both
 * byte-identical). Output order: :root tokens, site classes (declared order) then nodes (document order); within
 * each, base and states first, then one @media block per breakpoint, ascending. Node selectors double the class
 * so a node always beats a site class.
 */
const NODE_ID = /^[A-Za-z0-9_-]{1,64}$/;
const CLASS_ID = /^[a-z][a-z0-9-]{0,40}$/;
const ORDER = new Map(STYLE_MATRIX.properties.map((p, i) => [p.name, i]));

/** Plain object or empty: malformed input (text, numbers, null) never reaches the grammar. */
const map = <T>(value: unknown): Readonly<Record<string, T>> =>
  typeof value === 'object' && value !== null ? (value as Record<string, T>) : {};

export const nodeClass = (id: string): string => `cms-n-${id}`;
export const siteClass = (id: string): string => `cms-c-${id}`;

interface Context {
  readonly tokens: Map<string, ResolvedToken>;
  /** Asset id → public URL, resolved by the host (background images, plan 05). */
  readonly assets: Readonly<Record<string, string>>;
  readonly breakpoints: readonly Breakpoint[];
  readonly diagnostics: StyleDiagnostic[];
}

interface Output {
  readonly rules: string[];
  readonly media: Map<string, string[]>;
}

const declarationBlock = (declarations: Declarations | undefined, path: string, context: Context): string => {
  const entries = Object.entries(map<unknown>(declarations));
  if (entries.length > STYLE_MATRIX.limits.declarations) {
    context.diagnostics.push({ path, code: 'LIMIT' });
    return '';
  }
  const out: [number, string][] = [];
  for (const [name, value] of entries) {
    const spec = PROPERTY_BY_NAME.get(name);
    const at = `${path}.${name}`;
    if (!spec) {
      context.diagnostics.push({ path: at, code: 'UNKNOWN_PROPERTY' });
      continue;
    }
    let css: string | null;
    if (typeof value === 'object' && value !== null && 'asset' in value) {
      if (spec.kind !== 'image') {
        context.diagnostics.push({ path: at, code: 'INVALID_VALUE' });
        continue;
      }
      const id = (value as { asset?: unknown }).asset;
      const url = typeof id === 'string' && Object.hasOwn(context.assets, id) ? context.assets[id] : undefined;
      if (typeof url !== 'string') {
        context.diagnostics.push({ path: at, code: 'UNKNOWN_ASSET' });
        continue;
      }
      css = assetUrl(url);
    } else if (typeof value === 'object' && value !== null) {
      const ref = (value as { token?: unknown }).token;
      const token = typeof ref === 'string' ? context.tokens.get(ref) : undefined;
      if (!token) {
        context.diagnostics.push({ path: at, code: 'UNKNOWN_TOKEN' });
        continue;
      }
      if (token.type !== acceptedTokenType(spec)) {
        context.diagnostics.push({ path: at, code: 'TOKEN_TYPE' });
        continue;
      }
      css = token.ref;
    } else {
      css = typeof value === 'string' || typeof value === 'number' ? literal(spec, value) : null;
    }
    if (css === null) context.diagnostics.push({ path: at, code: 'INVALID_VALUE' });
    else out.push([ORDER.get(name) ?? 0, `${spec.css}:${css}`]);
  }
  return out.sort((a, b) => a[0] - b[0]).map(([, d]) => d).join(';');
};

const compileBlock = (selector: string, raw: unknown, path: string, context: Context, output: Output): void => {
  const block = map<unknown>(raw) as StyleBlock;
  const base = declarationBlock(block.base, `${path}.base`, context);
  if (base !== '') output.rules.push(`${selector}{${base}}`);
  const states = map<Declarations>(block.states);
  for (const state of Object.keys(states)) {
    if (!STYLE_MATRIX.states.includes(state)) context.diagnostics.push({ path: `${path}.states.${state}`, code: 'UNKNOWN_STATE' });
  }
  for (const state of STYLE_MATRIX.states) {
    if (!(state in states)) continue;
    const body = declarationBlock(states[state], `${path}.states.${state}`, context);
    if (body !== '') output.rules.push(`${selector}:${state}{${body}}`);
  }
  const byBreakpoint = map<Declarations>(block.breakpoints);
  for (const id of Object.keys(byBreakpoint)) {
    if (!context.breakpoints.some((b) => b.id === id)) {
      context.diagnostics.push({ path: `${path}.breakpoints.${id}`, code: 'UNKNOWN_BREAKPOINT' });
      continue;
    }
    const body = declarationBlock(byBreakpoint[id], `${path}.breakpoints.${id}`, context);
    if (body !== '') output.media.get(id)?.push(`${selector}{${body}}`);
  }
};

const validBreakpoints = (list: readonly Breakpoint[], diagnostics: StyleDiagnostic[]): readonly Breakpoint[] => {
  const ok = Array.isArray(list) && list.length <= STYLE_MATRIX.limits.breakpoints && list.every((b, i) =>
    typeof b === 'object' && b !== null && typeof b.id === 'string' && /^[a-z][a-z0-9-]{0,15}$/.test(b.id) && Number.isInteger(b.minWidth) && b.minWidth >= 1
    && b.minWidth <= STYLE_MATRIX.limits.minWidth && (i === 0 || b.minWidth > (list[i - 1] as Breakpoint).minWidth)
    && list.findIndex((o) => o.id === b.id) === i);
  if (!ok) diagnostics.push({ path: 'design.breakpoints', code: 'INVALID_BREAKPOINTS' });
  return ok ? list : [];
};

const emit = (output: Output, breakpoints: readonly Breakpoint[], chunks: string[]): void => {
  chunks.push(...output.rules);
  for (const bp of breakpoints) {
    const rules = output.media.get(bp.id) ?? [];
    if (rules.length > 0) chunks.push(`@media (min-width:${bp.minWidth}px){\n${rules.join('\n')}\n}`);
  }
};

export const compileStyles = (
  design: DesignDocument,
  nodes: readonly StyledNode[],
  assets: Readonly<Record<string, string>> = {},
): CompiledStyles => {
  const diagnostics: StyleDiagnostic[] = [];
  const { table, root } = resolveTokens(map(design.tokens), diagnostics);
  const breakpoints = validBreakpoints(design.breakpoints ?? [], diagnostics);
  const context: Context = { tokens: table, breakpoints, diagnostics, assets };
  const fresh = (): Output => ({ rules: [], media: new Map(breakpoints.map((b) => [b.id, []])) });

  const classes = fresh();
  const classMap = map<{ styles?: unknown }>(design.classes);
  const classIds = Object.keys(classMap);
  if (classIds.length > STYLE_MATRIX.limits.classes) diagnostics.push({ path: 'design.classes', code: 'LIMIT' });
  for (const id of classIds.length > STYLE_MATRIX.limits.classes ? [] : classIds) {
    if (!CLASS_ID.test(id)) diagnostics.push({ path: `design.classes.${id}`, code: 'INVALID_ID' });
    else compileBlock(`.${siteClass(id)}`, map<unknown>(classMap[id]).styles, `design.classes.${id}.styles`, context, classes);
  }

  const own = fresh();
  for (const node of nodes) {
    if (!NODE_ID.test(node.id)) {
      diagnostics.push({ path: `nodes.${node.id}`, code: 'INVALID_ID' });
      continue;
    }
    const listed: unknown = map<unknown>(node.styles).classes;
    (Array.isArray(listed) ? listed : []).forEach((id: unknown, i) => {
      if (typeof id !== 'string' || !classIds.includes(id) || !CLASS_ID.test(id)) diagnostics.push({ path: `nodes.${node.id}.styles.classes.${i}`, code: 'UNKNOWN_CLASS' });
    });
    compileBlock(`.${nodeClass(node.id)}.${nodeClass(node.id)}`, node.styles, `nodes.${node.id}.styles`, context, own);
  }

  const chunks: string[] = root === '' ? [] : [root];
  emit(classes, breakpoints, chunks);
  emit(own, breakpoints, chunks);
  return { css: chunks.join('\n'), diagnostics };
};
