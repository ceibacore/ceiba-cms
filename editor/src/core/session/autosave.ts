import type { EditorSession } from './session';

export interface AutosaveOptions {
  /** Quiet time after the last edit before saving. */
  readonly idleMs: number;
  /** Longest wait while edits keep coming. */
  readonly maxWaitMs: number;
  /** Waits between retries while offline (the last one repeats). */
  readonly retryMs: readonly number[];
}

export const DEFAULT_AUTOSAVE: AutosaveOptions = { idleMs: 2000, maxWaitMs: 15000, retryMs: [2000, 5000, 15000, 30000] };

export interface Timers {
  set(callback: () => void, ms: number): unknown;
  clear(handle: unknown): void;
  now(): number;
}

const realTimers: Timers = {
  set: (callback, ms) => setTimeout(callback, ms),
  clear: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
  now: () => Date.now(),
};

/**
 * Saves the draft on its own (plan 03-D): after a quiet moment, or at the latest after maxWaitMs of continuous
 * editing. Offline it retries with growing waits; in a conflict it waits for the person to choose.
 */
export class Autosave {
  private timer: unknown = null;
  private firstChange: number | null = null;
  private retries = 0;
  private readonly stops: (() => void)[] = [];

  constructor(
    private readonly session: EditorSession,
    private readonly options: AutosaveOptions = DEFAULT_AUTOSAVE,
    private readonly timers: Timers = realTimers,
  ) {}

  start(): void {
    this.stops.push(
      this.session.events.on('history-change', () => this.changed()),
      this.session.events.on('status-change', ({ status }) => {
        if (status === 'ready' || status === 'conflict' || status === 'loading') this.reset();
      }),
    );
  }

  stop(): void {
    for (const stop of this.stops.splice(0)) stop();
    this.reset();
  }

  private changed(): void {
    if (!this.session.dirty || this.session.status === 'conflict') return;
    const now = this.timers.now();
    this.firstChange ??= now;
    const wait = this.session.status === 'offline'
      ? this.retryWait()
      : Math.min(this.options.idleMs, Math.max(0, this.firstChange + this.options.maxWaitMs - now));
    this.schedule(wait);
  }

  private schedule(ms: number): void {
    if (this.timer !== null) this.timers.clear(this.timer);
    this.timer = this.timers.set(() => void this.fire(), ms);
  }

  private async fire(): Promise<void> {
    this.timer = null;
    const status = this.session.status;
    if (!this.session.dirty || (status !== 'dirty' && status !== 'offline')) return;
    this.firstChange = null;
    try {
      await this.session.save('autosave');
      this.retries = 0;
      if (this.session.dirty) this.changed();
    } catch {
      if (this.session.status === 'offline' || this.session.status === 'dirty') {
        this.schedule(this.retryWait());
        this.retries++;
      }
    }
  }

  private retryWait(): number {
    const list = this.options.retryMs;
    return list[Math.min(this.retries, list.length - 1)] ?? this.options.idleMs;
  }

  private reset(): void {
    if (this.timer !== null) this.timers.clear(this.timer);
    this.timer = null;
    this.firstChange = null;
    if (this.session.status !== 'offline') this.retries = 0;
  }
}
