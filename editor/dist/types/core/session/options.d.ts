import type { HistoryOptions } from '../history/history';
import type { IdFactory } from '../tree/ids';
import type { Transport } from '../transport/types';
import type { Limits } from '../validate/limits';
export interface SessionOptions {
    readonly pageId: string;
    readonly transport: Transport;
    readonly ids?: IdFactory;
    readonly limits?: Limits;
    readonly history?: Partial<HistoryOptions>;
    /** Milliseconds clock, injectable for the history grouping tests. */
    readonly now?: () => number;
}
export interface ResolvedOptions {
    readonly pageId: string;
    readonly transport: Transport;
    readonly ids: IdFactory;
    readonly limits: Limits;
    readonly history: HistoryOptions;
    readonly now: () => number;
}
export declare const resolveOptions: (options: SessionOptions) => ResolvedOptions;
