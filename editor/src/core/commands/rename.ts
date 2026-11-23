import { getNode } from '../tree/queries';
import { withNode } from '../tree/state';
import type { CommandHandler } from './types';

const text = (value: unknown): string | null => (typeof value === 'string' ? value : null);

/** Changes the name and label shown in the structure navigator. null removes them. Allowed on unknown types too. */
export const rename: CommandHandler<'rename'> = (state, command) => {
  const node = getNode(state, command.id);
  const fields: Record<string, unknown> = { ...node.fields };
  for (const key of ['name', 'label'] as const) {
    const value = command[key];
    if (value === null) delete fields[key];
    else fields[key] = value;
  }
  const inverse = { kind: 'rename', id: command.id, name: text(node.fields.name), label: text(node.fields.label) } as const;
  return { state: withNode(state, { ...node, fields }), inverse, focus: command.id };
};
