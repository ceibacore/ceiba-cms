import type { RawNode } from '../document/types';
import type { DesignDocument, NodeStyles, StyledNode } from './types';
/** Nodes with a styles field, in document order (depth first), as the compiler takes them. */
export declare const collectStyledNodes: (root: readonly RawNode[]) => StyledNode[];
/** Classes the renderer adds to a node: its site classes (known ones, in order) and its own class. */
export declare const styleClassNames: (id: string, styles: NodeStyles, design: DesignDocument) => string[];
