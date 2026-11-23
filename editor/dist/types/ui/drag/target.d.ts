import type { Command, CommandContext, EditorErrorCode, RawNode, TreeState } from '../../core';
/** What is being dragged: a node of the page, or a new component from the palette. */
export type Dragged = {
    readonly kind: 'move';
    readonly id: string;
} | {
    readonly kind: 'insert';
    readonly node: RawNode;
};
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
export declare const zoneFor: (top: number, height: number, y: number, isContainer: boolean) => Zone;
/**
 * Drop target for a pointer over `over` (null = empty area of the page: append at the end). The command is tried on
 * the tree without keeping the result, so the core decides what is valid (cycles, placement, limits).
 */
export declare const dropTarget: (tree: TreeState, context: CommandContext, dragged: Dragged, over: string | null, zone: Zone) => DropTarget;
