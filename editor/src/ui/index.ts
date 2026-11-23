/**
 * <ceiba-page-builder> Web Component (plan 03-B). Importing this module defines the element.
 * The core (createEditor, transports, commands) is re-exported for hosts that build their own transport.
 */
import { defineElement } from './element';

export { CeibaPageBuilder, defineElement, PUBLIC_EVENTS } from './element';
export type { PageBuilderConfig } from './element';
export * from '../core';

defineElement();
