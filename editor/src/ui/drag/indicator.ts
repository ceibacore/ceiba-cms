import type { Zone } from './target';

const ID = 'ceiba-drop-indicator';

/** Draws where a drop would land, inside the canvas document (no scripts needed there). */
export const showIndicator = (doc: Document, anchor: Element | null, zone: Zone, refused: boolean): void => {
  let box = doc.getElementById(ID);
  if (!box) {
    box = doc.createElement('div');
    box.id = ID;
    box.setAttribute('aria-hidden', 'true');
    doc.body.append(box);
  }
  const rect = (anchor ?? doc.body).getBoundingClientRect();
  const x = rect.left + doc.defaultView!.scrollX;
  const y = rect.top + doc.defaultView!.scrollY;
  const line = zone !== 'inside' && anchor !== null;
  Object.assign(box.style, {
    position: 'absolute', pointerEvents: 'none', zIndex: '2147483647', boxSizing: 'border-box',
    left: `${x}px`, width: `${rect.width}px`,
    top: `${line ? (zone === 'before' ? y - 2 : y + rect.height - 2) : y}px`,
    height: line ? '4px' : `${rect.height}px`,
    background: line ? (refused ? '#b91c1c' : '#2563eb') : 'transparent',
    border: line ? 'none' : `2px dashed ${refused ? '#b91c1c' : '#2563eb'}`,
    borderRadius: '2px',
  });
  box.dataset.zone = zone;
  box.dataset.refused = refused ? 'true' : 'false';
};

export const hideIndicator = (doc: Document | null | undefined): void => {
  doc?.getElementById(ID)?.remove();
};
