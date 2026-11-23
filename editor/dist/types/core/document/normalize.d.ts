import type { IdFactory } from '../tree/ids';
import type { TreeState } from '../tree/state';
import type { PageDocument } from './types';
/** Document metadata the tree does not own; kept to rebuild the envelope on save. */
export interface DocumentMeta {
    readonly documentId: string;
    readonly settings: Readonly<Record<string, unknown>>;
    readonly resources: readonly string[];
}
/** Checks the envelope shape the server sends (the server already validated it in depth). */
export declare const parseDocument: (value: unknown) => PageDocument;
/**
 * Loads a document into a tree. Ids are kept; missing or repeated ids get new ones, and the repeated ones are
 * reported so the UI can say the document was repaired.
 */
export declare const fromDocument: (document: PageDocument, ids: IdFactory) => {
    tree: TreeState;
    meta: DocumentMeta;
    repairedIds: string[];
};
/** Envelope for a save: revision is the one the server must create (base + 1). */
export declare const toDocument: (tree: TreeState, meta: DocumentMeta, revision: number) => PageDocument;
