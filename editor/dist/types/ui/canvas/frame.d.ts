/** Sandbox of the canvas: same origin so the editor can draw into it, never scripts, forms, popups or navigation. */
export declare const CANVAS_SANDBOX = "allow-same-origin";
/**
 * Document of the canvas iframe: the page's CSS (framework stylesheets from the host), a CSP without scripts,
 * and the editor's selection outline.
 */
export declare const canvasDocument: (stylesheets: readonly string[]) => string;
