import type { MessageKey } from './es';
export type { MessageKey } from './es';
export type Translate = (key: MessageKey, params?: Record<string, string | number>) => string;
/** Translator for a locale ("es", "es-CO", "en-US"…); unknown locales fall back to Spanish. */
export declare const translator: (locale: string) => Translate;
