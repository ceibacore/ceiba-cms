/**
 * @ceibacore/page-builder — editor core (plan 03-A). Framework-free: no DOM, no host routes.
 * Entry point (factory): `createEditor()` returns a session; the rest is exported for hosts and the UI (03-B).
 */
import { EditorSession } from './session/session';
import type { SessionOptions } from './session/options';

export const createEditor = (options: SessionOptions): EditorSession => new EditorSession(options);

export * from './errors';
export * from './document';
export * from './tree';
export * from './catalogue';
export * from './validate';
export * from './commands';
export * from './history';
export * from './transport';
export * from './session';
export * from './styles';
export * from './design';
export * from './media';
export * from './data';
