import type { EditorSession } from './session';
export interface AutosaveOptions {
    /** Quiet time after the last edit before saving. */
    readonly idleMs: number;
    /** Longest wait while edits keep coming. */
    readonly maxWaitMs: number;
    /** Waits between retries while offline (the last one repeats). */
    readonly retryMs: readonly number[];
}
export declare const DEFAULT_AUTOSAVE: AutosaveOptions;
export interface Timers {
    set(callback: () => void, ms: number): unknown;
    clear(handle: unknown): void;
    now(): number;
}
/**
 * Saves the draft on its own (plan 03-D): after a quiet moment, or at the latest after maxWaitMs of continuous
 * editing. Offline it retries with growing waits; in a conflict it waits for the person to choose.
 */
export declare class Autosave {
    private readonly session;
    private readonly options;
    private readonly timers;
    private timer;
    private firstChange;
    private retries;
    private readonly stops;
    constructor(session: EditorSession, options?: AutosaveOptions, timers?: Timers);
    start(): void;
    stop(): void;
    private changed;
    private schedule;
    private fire;
    private retryWait;
    private reset;
}
