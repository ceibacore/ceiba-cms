import type { RawNode, TemplateSummary } from '../../core';
import type { EditorStore } from '../model/store.svelte';
/**
 * Templates and HTML import (plan 03-E2). Both are optional: shown only when the transport has them and the server
 * says so (features.templates / features.htmlImport), or when the transport reports no capabilities at all.
 */
export declare class ContentActions {
    private readonly store;
    templates: readonly TemplateSummary[];
    constructor(store: EditorStore);
    private allowed;
    get canTemplates(): boolean;
    get canImport(): boolean;
    loadTemplates(): Promise<void>;
    /** Inserts several nodes one after another where the palette would insert the first one. */
    insertNodes(nodes: readonly RawNode[], label: string): boolean;
    saveTemplate(nodeId: string, name: string, category: string): Promise<boolean>;
    importHtml(html: string): Promise<number | null>;
}
