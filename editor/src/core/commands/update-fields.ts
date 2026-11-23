import { assertEditable } from '../catalogue/placement';
import { fail } from '../errors';
import { getNode } from '../tree/queries';
import { withNode } from '../tree/state';
import type { CommandHandler } from './types';

/**
 * Node fields the editor may change besides props: dynamic content of the module (Node::loop, bindings) and the
 * render condition. Everything else (id, type, name, children, extensions) is out of reach of this command.
 */
export const EDITABLE_FIELDS: readonly string[] = ['loop', 'condition', 'bindings'];

/** Sets or removes loop / condition / bindings; the inverse restores exactly the previous keys. */
export const updateFields: CommandHandler<'updateFields'> = (state, command, context) => {
  const node = getNode(state, command.id);
  assertEditable(context.catalogue, node.type);
  const keys = [...Object.keys(command.set), ...(command.unset ?? [])];
  const refused = keys.find((key) => !EDITABLE_FIELDS.includes(key));
  if (refused !== undefined) fail('INVALID_TARGET', `${refused} cannot be changed here`, { field: refused });

  const fields: Record<string, unknown> = { ...node.fields, ...command.set };
  for (const key of command.unset ?? []) delete fields[key];
  const restore: Record<string, unknown> = {};
  const drop: string[] = [];
  for (const key of keys) {
    if (key in node.fields) restore[key] = node.fields[key];
    else drop.push(key);
  }
  return {
    state: withNode(state, { ...node, fields }),
    inverse: { kind: 'updateFields', id: command.id, set: restore, unset: drop },
    focus: command.id,
  };
};
