import type { CommandHandler } from './types';
/**
 * Node fields the editor may change besides props: dynamic content of the module (Node::loop, bindings) and the
 * render condition. Everything else (id, type, name, children, extensions) is out of reach of this command.
 */
export declare const EDITABLE_FIELDS: readonly string[];
/** Sets or removes loop / condition / bindings; the inverse restores exactly the previous keys. */
export declare const updateFields: CommandHandler<'updateFields'>;
