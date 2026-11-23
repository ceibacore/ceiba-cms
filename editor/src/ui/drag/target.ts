import type { Command, CommandContext, EditorErrorCode, RawNode, TreeState } from '../../core';
import { applyCommand, childrenOf, EditorError } from '../../core';

/** What is being dragged: a node of the page, or a new component from the palette. */
export type Dragged = { readonly kind: 'move'; readonly id: string } | { readonly kind: 'insert'; readonly node: RawNode };

export type Zone = 'before' | 'after' | 'inside';

export interface DropTarget {
  readonly command: Command | null;
  /** Node the indicator is drawn on (null = the page). */
  readonly anchor: string | null;
  readonly zone: Zone;
  /** Error code when the drop is not allowed (the indicator turns red and the drop does nothing). */
  readonly refused: EditorErrorCode | null;
}

/**
 * Zone of the pointer over an element: top quarter = before, bottom quarter = after, the middle = inside
 * for containers. Non-containers split in halves.
 */
export const zoneFor = (top: number, height: number, y: number, isContainer: boolean): Zone => {
  const ratio = height <= 0 ? 0.5 : (y - top) / height;
  if (isContainer) return ratio < 0.25 ? 'before' : ratio > 0.75 ? 'after' : 'inside';
  return ratio < 0.5 ? 'before' : 'after';
};

const commandFor = (tree: TreeState, dragged: Dragged, parent: string | null, index: number): Command =>
  dragged.kind === 'move'
    ? { kind: 'move', id: dragged.id, parent, index }
    : { kind: 'insert', parent, index, node: dragged.node };

/**
 * Drop target for a pointer over `over` (null = empty area of the page: append at the end). The command is tried on
 * the tree without keeping the result, so the core decides what is valid (cycles, placement, limits).
 */
export const dropTarget = (
  tree: TreeState,
  context: CommandContext,
  dragged: Dragged,
  over: string | null,
  zone: Zone,
): DropTarget => {
  let command: Command;
  if (over === null || !tree.nodes[over]) {
    command = commandFor(tree, dragged, null, tree.rootIds.length);
  } else if (zone === 'inside') {
    command = commandFor(tree, dragged, over, tree.nodes[over]?.children.length ?? 0);
  } else {
    const parent = tree.nodes[over]?.parent ?? null;
    const index = childrenOf(tree, parent).indexOf(over) + (zone === 'after' ? 1 : 0);
    command = commandFor(tree, dragged, parent, index);
  }
  const anchor = over !== null && tree.nodes[over] ? over : null;
  if (dragged.kind === 'move' && command.kind === 'move' && isNoOp(tree, dragged.id, command.parent, command.index)) {
    return { command: null, anchor, zone, refused: null };
  }
  try {
    applyCommand(tree, command, context);
    return { command, anchor, zone, refused: null };
  } catch (error) {
    return { command: null, anchor, zone, refused: error instanceof EditorError ? error.code : 'SERVER' };
  }
};

/** Dropping a node right before or after itself changes nothing. */
const isNoOp = (tree: TreeState, id: string, parent: string | null, index: number): boolean => {
  if (tree.nodes[id]?.parent !== parent) return false;
  const at = childrenOf(tree, parent).indexOf(id);
  return index === at || index === at + 1;
};
