/** Node id generator; injectable so tests are deterministic. */
export type IdFactory = () => string;

export const randomIds: IdFactory = () => {
  const bytes = new Uint8Array(8);
  globalThis.crypto.getRandomValues(bytes);
  return 'n' + Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 12);
};

/** Ids n1, n2, … for tests and fixtures. */
export const sequentialIds = (prefix = 'n'): IdFactory => {
  let next = 0;
  return () => `${prefix}${++next}`;
};
