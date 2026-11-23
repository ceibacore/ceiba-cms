import type { SessionOptions } from '../core';
import { EditorSession } from '../core';
export interface PageBuilderConfig extends SessionOptions {
    /** UI language ("es" by default). */
    readonly locale?: string;
    /** The page's own CSS (e.g. Bootstrap 5) for the canvas; http(s) or same-origin paths. */
    readonly stylesheets?: readonly string[];
}
/** Events re-dispatched on the element (bubbling, composed). They carry ids and state, never content or credentials. */
export declare const PUBLIC_EVENTS: readonly ["ready", "selection-change", "dirty-change", "save-start", "save-success", "save-error", "conflict"];
/**
 * <ceiba-page-builder>: set `config` to mount; removing the element (or a new config) releases the session,
 * the listeners and the canvas. Each instance has its own session and shadow root.
 */
export declare class CeibaPageBuilder extends HTMLElement {
    #private;
    get config(): PageBuilderConfig | null;
    set config(value: PageBuilderConfig | null);
    /** The core session, for hosts that drive it (autosave, custom buttons). */
    get session(): EditorSession | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export declare const defineElement: (name?: string) => void;
