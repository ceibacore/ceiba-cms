import type { Command } from '../commands/types';

/**
 * Commands that merge with the previous one when they come in a burst: typing in a field is one undo step,
 * not one per key. Structural commands never merge.
 */
export const groupKeyOf = (command: Command): string | null => {
  switch (command.kind) {
    case 'updateProps':
      return `props:${command.id}:${[...Object.keys(command.set), ...(command.unset ?? [])].sort().join(',')}`;
    case 'rename':
      return `rename:${command.id}`;
    default:
      return null;
  }
};
