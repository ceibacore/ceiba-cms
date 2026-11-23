import type { TreeState } from '../tree/state';
import { withNode } from '../tree/state';
import { subtreeIds } from '../tree/queries';

/**
 * Props that hold the id of another node of the page (anchors, tabs, accordions, form labels).
 * After a duplicate they must point inside the copy when they pointed inside the original.
 */
export const REFERENCE_PROPS: readonly string[] = ['targetId', 'for', 'aria-controls', 'aria-labelledby', 'aria-describedby'];

export const rewriteReferences = (state: TreeState, root: string, renamed: ReadonlyMap<string, string>): TreeState => {
  let next = state;
  for (const id of subtreeIds(state, root)) {
    const node = next.nodes[id];
    const props = node?.fields.props;
    if (!node || typeof props !== 'object' || props === null || Array.isArray(props)) continue;
    let changed = false;
    const copy: Record<string, unknown> = { ...(props as Record<string, unknown>) };
    for (const key of REFERENCE_PROPS) {
      const value = copy[key];
      if (typeof value === 'string' && renamed.has(value)) {
        copy[key] = renamed.get(value);
        changed = true;
      }
    }
    if (changed) next = withNode(next, { ...node, fields: { ...node.fields, props: copy } });
  }
  return next;
};
