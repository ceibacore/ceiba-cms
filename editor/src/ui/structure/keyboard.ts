import type { Command, TreeState } from '../../core';
import { childrenOf } from '../../core';
import { flatten } from '../model/flatten';

export interface KeyInput {
  readonly key: string;
  readonly altKey: boolean;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  readonly shiftKey: boolean;
}

export type KeyAction =
  | { readonly type: 'select'; readonly id: string }
  | { readonly type: 'command'; readonly command: Command }
  | { readonly type: 'undo' }
  | { readonly type: 'redo' };

/** Undo/redo shortcuts, shared by the whole editor (ignored while typing in a field). */
export const historyAction = (e: KeyInput): KeyAction | null => {
  if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
  const key = e.key.toLowerCase();
  if (key === 'z') return e.shiftKey ? { type: 'redo' } : { type: 'undo' };
  if (key === 'y') return { type: 'redo' };
  return null;
};

/**
 * Keyboard of the structure navigator (WAI-ARIA tree): arrows navigate, Alt+arrows move and (un)indent,
 * Delete removes, Ctrl/Cmd+D duplicates. Returns null for keys it does not handle.
 */
export const treeAction = (tree: TreeState, selection: string | null, e: KeyInput): KeyAction | null => {
  const items = flatten(tree);
  const first = items[0];
  if (!first) return null;
  const at = selection === null ? -1 : items.findIndex((item) => item.id === selection);
  const current = items[at];
  if (!current) return e.key === 'ArrowDown' || e.key === 'Home' ? { type: 'select', id: first.id } : null;
  const node = tree.nodes[current.id];
  const siblings = childrenOf(tree, current.parent);
  const mod = e.ctrlKey || e.metaKey;

  if (e.altKey && !mod) {
    switch (e.key) {
      case 'ArrowUp':
        return current.index > 0 ? move(current.id, current.parent, current.index - 1) : null;
      case 'ArrowDown':
        return current.index < siblings.length - 1 ? move(current.id, current.parent, current.index + 2) : null;
      case 'ArrowRight': {
        const previous = siblings[current.index - 1];
        return previous ? move(current.id, previous, tree.nodes[previous]?.children.length ?? 0) : null;
      }
      case 'ArrowLeft': {
        if (current.parent === null) return null;
        const parent = tree.nodes[current.parent];
        const grand = childrenOf(tree, parent?.parent ?? null);
        return move(current.id, parent?.parent ?? null, grand.indexOf(current.parent) + 1);
      }
      default:
        return null;
    }
  }
  if (mod && e.key.toLowerCase() === 'd') return { type: 'command', command: { kind: 'duplicate', id: current.id } };
  if (mod || e.altKey) return historyAction(e);
  switch (e.key) {
    case 'ArrowDown': return select(items[at + 1]?.id);
    case 'ArrowUp': return select(items[at - 1]?.id);
    case 'Home': return select(first.id);
    case 'End': return select(items[items.length - 1]?.id);
    case 'ArrowRight': return select(node?.children[0]);
    case 'ArrowLeft': return select(current.parent ?? undefined);
    case 'Delete':
    case 'Backspace': return { type: 'command', command: { kind: 'remove', id: current.id } };
    default: return null;
  }
};

const move = (id: string, parent: string | null, index: number): KeyAction =>
  ({ type: 'command', command: { kind: 'move', id, parent, index } });

const select = (id: string | undefined): KeyAction | null => (id ? { type: 'select', id } : null);
