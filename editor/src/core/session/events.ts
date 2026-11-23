/** Tiny typed emitter; listeners are removed by the returned function or by clear() on unmount. */
export class Emitter<Events extends Record<string, unknown>> {
  private readonly listeners = new Map<keyof Events, Set<(payload: never) => void>>();

  on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void {
    const set = this.listeners.get(event) ?? new Set();
    set.add(listener as (payload: never) => void);
    this.listeners.set(event, set);
    return () => set.delete(listener as (payload: never) => void);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    for (const listener of this.listeners.get(event) ?? []) {
      (listener as (payload: Events[K]) => void)(payload);
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}
