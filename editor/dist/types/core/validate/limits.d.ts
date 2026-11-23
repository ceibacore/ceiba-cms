/** Same limits as DocumentWriteValidator in the module (MAX_NODES, MAX_DEPTH, MAX_BYTES). */
export interface Limits {
    readonly maxNodes: number;
    readonly maxDepth: number;
    readonly maxBytes: number;
}
export declare const SERVER_LIMITS: Limits;
export declare const assertNodeCount: (limits: Limits, count: number) => void;
export declare const assertDepth: (limits: Limits, depth: number) => void;
/** Size of the JSON the server receives; checked before saving, not on every keystroke. */
export declare const assertSize: (limits: Limits, json: string) => void;
