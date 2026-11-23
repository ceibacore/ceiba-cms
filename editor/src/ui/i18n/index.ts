import { en } from './en';
import type { MessageKey } from './es';
import { es } from './es';

export type { MessageKey } from './es';
export type Translate = (key: MessageKey, params?: Record<string, string | number>) => string;

const catalogs: Record<string, Record<MessageKey, string>> = { es, en };

/** Translator for a locale ("es", "es-CO", "en-US"…); unknown locales fall back to Spanish. */
export const translator = (locale: string): Translate => {
  const messages = catalogs[locale.toLowerCase().split('-')[0] ?? 'es'] ?? es;
  return (key, params = {}) =>
    messages[key].replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
};
