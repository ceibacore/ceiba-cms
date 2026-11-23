import { safeStylesheet } from './sanitize';

const escapeAttr = (value: string): string => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Sandbox of the canvas: same origin so the editor can draw into it, never scripts, forms, popups or navigation. */
export const CANVAS_SANDBOX = 'allow-same-origin';

/**
 * Document of the canvas iframe: the page's CSS (framework stylesheets from the host), a CSP without scripts,
 * and the editor's selection outline.
 */
export const canvasDocument = (stylesheets: readonly string[]): string => {
  const links = stylesheets.map(safeStylesheet).filter((url) => url !== '')
    .map((url) => `<link rel="stylesheet" href="${escapeAttr(url)}">`).join('');
  return '<!doctype html><html><head><meta charset="utf-8">'
    + `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src * 'unsafe-inline'; img-src * data: blob:; font-src * data:">`
    + links
    + '<style>body{margin:0;padding:12px;min-height:100vh;box-sizing:border-box}'
    + '[data-ceiba-id]{cursor:default}[data-ceiba-id]:hover{outline:1px dashed #94a3b8}'
    + '[data-ceiba-selected]{outline:2px solid #2563eb!important;outline-offset:2px}'
    + '[data-ceiba-multiline]{white-space:pre-line}'
    + '[contenteditable]{outline:2px solid #16a34a!important;outline-offset:2px;cursor:text}'
    + '.ceiba-dragging,.ceiba-dragging *{user-select:none!important;cursor:grabbing!important}'
    + '.ceiba-placeholder{padding:12px;border:1px dashed #94a3b8;color:#475569;font:13px system-ui;background:#f8fafc}'
    + '@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}</style>'
    + '</head><body></body></html>';
};
