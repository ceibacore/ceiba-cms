import type { EditorStore } from '../model/store.svelte';
import type { Dragged } from './target';
/**
 * Pointer drag and drop on the canvas (plan 03-C): moving page nodes inside the canvas, and dragging new components
 * from the palette onto it. Escape cancels. Invalid targets show a red indicator and drop nothing.
 * The keyboard alternative is the structure tree (Alt+arrows).
 */
export declare class DragController {
    private readonly store;
    private frame;
    private active;
    private dropped;
    private readonly onKey;
    constructor(store: EditorStore);
    get dragging(): boolean;
    /** True once after a drag ended: the click that follows the pointerup must not act as a click. */
    consumeClick(): boolean;
    attach(frame: HTMLIFrameElement): void;
    private get doc();
    /** Pointer down on a page node inside the canvas: becomes a move once the pointer travels a few pixels. */
    pressNode(event: PointerEvent, element: HTMLElement, id: string): void;
    /** Pointer down on a palette button: the component follows the pointer over the canvas. */
    pressNew(event: PointerEvent, dragged: Dragged, label: string): void;
    private begin;
    /** x, y in canvas viewport coordinates. */
    private update;
    private clearTarget;
    private finish;
    private labelOf;
}
