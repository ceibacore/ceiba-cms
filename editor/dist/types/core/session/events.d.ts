/** Tiny typed emitter; listeners are removed by the returned function or by clear() on unmount. */
export declare class Emitter<Events extends Record<string, unknown>> {
    private readonly listeners;
    on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): () => void;
    emit<K extends keyof Events>(event: K, payload: Events[K]): void;
    clear(): void;
}
