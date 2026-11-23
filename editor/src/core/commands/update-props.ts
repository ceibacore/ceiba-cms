import { assertEditable } from '../catalogue/placement';
import { getNode } from '../tree/queries';
import { withNode } from '../tree/state';
import type { CommandHandler } from './types';

const propsOf = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value) ? { ...(value as Record<string, unknown>) } : {};

/** Sets and removes props of a known component; the inverse restores exactly the previous keys. */
export const updateProps: CommandHandler<'updateProps'> = (state, command, context) => {
  const node = getNode(state, command.id);
  assertEditable(context.catalogue, node.type);
  const before = propsOf(node.fields.props);
  const after = { ...before, ...command.set };
  for (const key of command.unset ?? []) delete after[key];

  const restore: Record<string, unknown> = {};
  const drop: string[] = [];
  for (const key of [...Object.keys(command.set), ...(command.unset ?? [])]) {
    if (key in before) restore[key] = before[key];
    else drop.push(key);
  }
  const next = withNode(state, { ...node, fields: { ...node.fields, props: after } });
  return { state: next, inverse: { kind: 'updateProps', id: command.id, set: restore, unset: drop }, focus: command.id };
};
