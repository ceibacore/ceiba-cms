/** Node id generator; injectable so tests are deterministic. */
export type IdFactory = () => string;
export declare const randomIds: IdFactory;
/** Ids n1, n2, … for tests and fixtures. */
export declare const sequentialIds: (prefix?: string) => IdFactory;
