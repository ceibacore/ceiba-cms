import type { CommandHandler } from './types';
/**
 * Changes `name` and `label`; null removes them. Allowed on unknown types too.
 * In the module, `name` picks the server view of a component (BladeRenderer renders `name ?? type`), so the UI only
 * changes `label`, the text shown in the structure navigator.
 */
export declare const rename: CommandHandler<'rename'>;
