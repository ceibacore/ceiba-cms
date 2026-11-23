/** A URL the canvas may use, or '' when it is unsafe (javascript:, data:, vbscript:, …). */
export declare const safeUrl: (value: unknown) => string;
/** Class names: letters, digits, dash, underscore, colon (responsive prefixes) and spaces. */
export declare const safeClass: (value: unknown) => string;
/** Stylesheets the host gives for the canvas (the page's framework CSS): http(s) or same-origin paths only. */
export declare const safeStylesheet: (value: string) => string;
export declare const text: (value: unknown) => string;
