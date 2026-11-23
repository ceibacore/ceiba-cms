import { mount, unmount } from 'svelte';
import type { AutosaveOptions, SessionEvents, SessionOptions } from '../core';
import { Autosave, DEFAULT_AUTOSAVE, EditorSession } from '../core';
import Editor from './Editor.svelte';
import { translator } from './i18n';
import { EditorStore } from './model/store.svelte';

export interface PageBuilderConfig extends SessionOptions {
  /** UI language ("es" by default). */
  readonly locale?: string;
  /** The page's own CSS (e.g. Bootstrap 5) for the canvas; http(s) or same-origin paths. */
  readonly stylesheets?: readonly string[];
  /** Autosave (on by default when the server allows it); false turns it off. */
  readonly autosave?: false | Partial<AutosaveOptions>;
}

/** Events re-dispatched on the element (bubbling, composed). They carry ids and state, never content or credentials. */
export const PUBLIC_EVENTS = ['ready', 'selection-change', 'dirty-change', 'save-start', 'save-success', 'save-error',
  'conflict', 'publish-success', 'publish-error'] as const satisfies readonly (keyof SessionEvents)[];

let instances = 0;

/**
 * <ceiba-page-builder>: set `config` to mount; removing the element (or a new config) releases the session,
 * the listeners and the canvas. Each instance has its own session and shadow root.
 */
export class CeibaPageBuilder extends HTMLElement {
  #config: PageBuilderConfig | null = null;
  #app: Record<string, unknown> | null = null;
  #session: EditorSession | null = null;
  #store: EditorStore | null = null;
  #autosave: Autosave | null = null;
  readonly #uid = `cpb${++instances}`;

  get config(): PageBuilderConfig | null {
    return this.#config;
  }

  set config(value: PageBuilderConfig | null) {
    this.#config = value;
    if (this.isConnected) this.#mount();
  }

  /** The core session, for hosts that drive it (autosave, custom buttons). */
  get session(): EditorSession | null {
    return this.#session;
  }

  connectedCallback(): void {
    if (this.#config && !this.#app) this.#mount();
  }

  disconnectedCallback(): void {
    this.#unmount();
  }

  #mount(): void {
    this.#unmount();
    const config = this.#config;
    if (!config) return;
    const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    const session = new EditorSession(config);
    for (const name of PUBLIC_EVENTS) {
      session.events.on(name, (detail) => {
        const safe = name === 'save-error' || name === 'publish-error'
          ? { code: (detail as SessionEvents['save-error']).error.code } : detail;
        this.dispatchEvent(new CustomEvent(name, { detail: safe, bubbles: true, composed: true }));
      });
    }
    const store = new EditorStore(session, translator(config.locale ?? 'es'));
    this.#session = session;
    this.#store = store;
    this.#app = mount(Editor, { target: root, props: { store, uid: this.#uid, stylesheets: config.stylesheets ?? [] } });
    session.load().then(() => {
      store.sync();
      if (config.autosave !== false && session.capabilities?.features.autosave !== false) {
        this.#autosave = new Autosave(session, { ...DEFAULT_AUTOSAVE, ...(config.autosave ?? {}) });
        this.#autosave.start();
      }
    }, (error: unknown) => { store.sync(); store.fail(error); });
  }

  #unmount(): void {
    this.#autosave?.stop();
    this.#autosave = null;
    if (this.#app) void unmount(this.#app);
    this.#store?.destroy();
    this.#session?.destroy();
    this.#app = null;
    this.#store = null;
    this.#session = null;
    this.shadowRoot?.replaceChildren();
  }
}

export const defineElement = (name = 'ceiba-page-builder'): void => {
  if (!customElements.get(name)) customElements.define(name, CeibaPageBuilder);
};
