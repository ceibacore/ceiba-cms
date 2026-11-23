import type { RawNode } from '../document/types';
import { nodeClass, siteClass } from './compile';
import type { DesignDocument, NodeStyles, StyledNode } from './types';

const isStyles = (value: unknown): value is NodeStyles =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Nodes with a styles field, in document order (depth first), as the compiler takes them. */
export const collectStyledNodes = (root: readonly RawNode[]): StyledNode[] => {
  const out: StyledNode[] = [];
  const walk = (nodes: readonly RawNode[]): void => {
    for (const node of nodes) {
      const id = typeof node.id === 'string' ? node.id : typeof node._id === 'string' ? node._id : '';
      if (id !== '' && isStyles(node.styles)) out.push({ id, styles: node.styles });
      walk(node.children ?? []);
    }
  };
  walk(root);
  return out;
};

const hasOwn = (styles: NodeStyles): boolean =>
  [styles.base, ...Object.values(styles.states ?? {}), ...Object.values(styles.breakpoints ?? {})]
    .some((block) => block !== undefined && Object.keys(block).length > 0);

/** Classes the renderer adds to a node: its site classes (known ones, in order) and its own class. */
export const styleClassNames = (id: string, styles: NodeStyles, design: DesignDocument): string[] => [
  ...(styles.classes ?? []).filter((c) => c in (design.classes ?? {})).map(siteClass),
  ...(hasOwn(styles) && /^[A-Za-z0-9_-]{1,64}$/.test(id) ? [nodeClass(id)] : []),
];
