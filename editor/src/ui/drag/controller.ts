import type { MessageKey } from '../i18n';
import type { EditorStore } from '../model/store.svelte';
import { hideIndicator, showIndicator } from './indicator';
import type { Dragged, DropTarget } from './target';
import { dropTarget, zoneFor } from './target';

const THRESHOLD = 5;

interface Active {
  readonly dragged: Dragged;
  readonly label: string;
  target: DropTarget | null;
}

/**
 * Pointer drag and drop on the canvas (plan 03-C): moving page nodes inside the canvas, and dragging new components
 * from the palette onto it. Escape cancels. Invalid targets show a red indicator and drop nothing.
 * The keyboard alternative is the structure tree (Alt+arrows).
 */
export class DragController {
  private frame: HTMLIFrameElement | null = null;
  private active: Active | null = null;
  private dropped = false;
  private readonly onKey = (event: KeyboardEvent): void => {
    if (this.active && event.key === 'Escape') {
      event.preventDefault();
      this.finish(false);
    }
  };

  constructor(private readonly store: EditorStore) {}

  get dragging(): boolean {
    return this.active !== null;
  }

  /** True once after a drag ended: the click that follows the pointerup must not act as a click. */
  consumeClick(): boolean {
    const dropped = this.dropped;
    this.dropped = false;
    return dropped;
  }

  attach(frame: HTMLIFrameElement): void {
    this.frame = frame;
  }

  private get doc(): Document | null {
    return this.frame?.contentDocument ?? null;
  }

  /** Pointer down on a page node inside the canvas: becomes a move once the pointer travels a few pixels. */
  pressNode(event: PointerEvent, element: HTMLElement, id: string): void {
    if (event.button !== 0) return;
    const start = { x: event.clientX, y: event.clientY };
    const doc = element.ownerDocument;
    const move = (e: PointerEvent): void => {
      if (!this.active && Math.hypot(e.clientX - start.x, e.clientY - start.y) < THRESHOLD) return;
      if (!this.active) this.begin({ kind: 'move', id }, this.labelOf(id));
      this.update(e.clientX, e.clientY);
    };
    const up = (): void => {
      doc.removeEventListener('pointermove', move);
      doc.removeEventListener('pointerup', up);
      if (this.active) this.finish(true);
    };
    doc.addEventListener('pointermove', move);
    doc.addEventListener('pointerup', up);
  }

  /** Pointer down on a palette button: the component follows the pointer over the canvas. */
  pressNew(event: PointerEvent, dragged: Dragged, label: string): void {
    if (event.button !== 0 || !this.frame) return;
    const source = event.currentTarget as HTMLElement;
    const start = { x: event.clientX, y: event.clientY };
    source.setPointerCapture?.(event.pointerId);
    const move = (e: PointerEvent): void => {
      if (!this.active && Math.hypot(e.clientX - start.x, e.clientY - start.y) < THRESHOLD) return;
      if (!this.active) {
        this.begin(dragged, label);
        // The iframe would swallow the pointer events that the palette button captured; hit testing inside the
        // canvas (elementFromPoint) does not depend on them.
        if (this.frame) this.frame.style.pointerEvents = 'none';
      }
      const rect = this.frame?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left - (this.frame?.clientLeft ?? 0);
      const y = e.clientY - rect.top - (this.frame?.clientTop ?? 0);
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        this.clearTarget();
        return;
      }
      this.update(x, y);
    };
    const up = (): void => {
      source.removeEventListener('pointermove', move);
      source.removeEventListener('pointerup', up);
      source.removeEventListener('pointercancel', up);
      if (this.active) this.finish(true);
    };
    source.addEventListener('pointermove', move);
    source.addEventListener('pointerup', up);
    source.addEventListener('pointercancel', up);
  }

  private begin(dragged: Dragged, label: string): void {
    this.active = { dragged, label, target: null };
    this.doc?.body.classList.add('ceiba-dragging');
    document.addEventListener('keydown', this.onKey, true);
    this.doc?.addEventListener('keydown', this.onKey, true);
  }

  /** x, y in canvas viewport coordinates. */
  private update(x: number, y: number): void {
    const doc = this.doc;
    const context = this.store.session.commandContext;
    if (!this.active || !doc || !context) return;
    const hit = doc.elementFromPoint(x, y)?.closest<HTMLElement>('[data-ceiba-id]') ?? null;
    const id = hit?.dataset.ceibaId ?? null;
    const node = id ? this.store.tree.nodes[id] : undefined;
    const rect = hit?.getBoundingClientRect();
    const container = node ? this.store.catalogue?.get(node.type)?.isContainer ?? false : false;
    const zone = rect ? zoneFor(rect.top, rect.height, y, container) : 'inside';
    this.active.target = dropTarget(this.store.tree, context, this.active.dragged, id, zone);
    showIndicator(doc, hit, zone, this.active.target.refused !== null);
  }

  private clearTarget(): void {
    if (this.active) this.active.target = null;
    hideIndicator(this.doc);
  }

  private finish(drop: boolean): void {
    const active = this.active;
    this.active = null;
    hideIndicator(this.doc);
    if (this.frame) this.frame.style.pointerEvents = '';
    this.doc?.body.classList.remove('ceiba-dragging');
    document.removeEventListener('keydown', this.onKey, true);
    this.doc?.removeEventListener('keydown', this.onKey, true);
    if (!active) return;
    this.dropped = true;
    const target = active.target;
    if (!drop || !target) {
      this.store.announce('announce.dragCancelled');
    } else if (target.command) {
      const key: MessageKey = target.command.kind === 'insert' ? 'announce.inserted' : 'announce.moved';
      this.store.run(target.command, [key, { label: active.label }]);
    } else if (target.refused) {
      this.store.fail(new Error(target.refused), target.refused);
    }
  }

  private labelOf(id: string): string {
    const type = this.store.tree.nodes[id]?.type ?? '';
    return this.store.catalogue?.get(type)?.label ?? type;
  }
}
