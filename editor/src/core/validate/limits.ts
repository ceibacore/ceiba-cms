import { fail } from '../errors';

/** Same limits as DocumentWriteValidator in the module (MAX_NODES, MAX_DEPTH, MAX_BYTES). */
export interface Limits {
  readonly maxNodes: number;
  readonly maxDepth: number;
  readonly maxBytes: number;
}

export const SERVER_LIMITS: Limits = { maxNodes: 500, maxDepth: 15, maxBytes: 2_000_000 };

export const assertNodeCount = (limits: Limits, count: number): void => {
  if (count > limits.maxNodes) {
    fail('MAX_NODES', `A page holds at most ${limits.maxNodes} nodes`, { limit: String(limits.maxNodes) });
  }
};

export const assertDepth = (limits: Limits, depth: number): void => {
  if (depth > limits.maxDepth) {
    fail('MAX_DEPTH', `Nodes can be nested ${limits.maxDepth} levels at most`, { limit: String(limits.maxDepth) });
  }
};

/** Size of the JSON the server receives; checked before saving, not on every keystroke. */
export const assertSize = (limits: Limits, json: string): void => {
  const bytes = new TextEncoder().encode(json).length;
  if (bytes > limits.maxBytes) {
    fail('DOCUMENT_TOO_LARGE', `The page is ${bytes} bytes; the limit is ${limits.maxBytes}`, {
      bytes: String(bytes), limit: String(limits.maxBytes),
    });
  }
};
