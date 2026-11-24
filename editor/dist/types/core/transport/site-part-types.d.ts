/** Rules of a site part (plan 06 D-4), as the module validates them (SitePartRules.php). */
export type SitePartTarget = {
    readonly type: 'site';
} | {
    readonly type: 'home';
} | {
    readonly type: 'pages';
    readonly ids: readonly string[];
} | {
    readonly type: 'layouts';
    readonly ids: readonly string[];
} | {
    readonly type: 'routes';
    readonly names: readonly string[];
} | {
    readonly type: 'path_prefix';
    readonly value: string;
};
export interface SitePartRules {
    readonly include: readonly SitePartTarget[];
    readonly exclude?: readonly SitePartTarget[];
    readonly locales?: readonly string[];
    readonly session?: 'any' | 'with' | 'without';
    readonly priority?: number;
}
export interface SitePartSummary {
    readonly id: string;
    readonly kind: 'header' | 'footer' | 'not_found';
    readonly name: string;
    readonly status: string;
    readonly rules: SitePartRules;
    readonly publishedRules: SitePartRules | null;
    readonly version: number;
}
export interface SitePartCatalog {
    readonly parts: readonly SitePartSummary[];
    /** Host routes a rule may name: name => label. */
    readonly routes: Readonly<Record<string, string>>;
    readonly pages: readonly {
        readonly id: string;
        readonly path: string;
        readonly layoutId: string | null;
        readonly isHome: boolean;
    }[];
}
export interface SitePartContext {
    readonly path: string;
    readonly pageId?: string | null;
    readonly locale?: string;
    readonly hasSession?: boolean;
    readonly notFound?: boolean;
}
export interface SitePartImpact {
    readonly total: number;
    readonly changes: readonly {
        readonly context: SitePartContext;
        readonly before: {
            readonly parts: Record<string, string | null>;
        };
        readonly after: {
            readonly parts: Record<string, string | null>;
        };
    }[];
    readonly conflicts: readonly {
        readonly context: SitePartContext;
        readonly parts: Record<string, readonly string[]>;
    }[];
}
export interface SitePartPreview {
    readonly html: string;
    readonly css: string;
    readonly applies: boolean;
}
/** Optional site part methods of a transport (plan 06-C); the editor's part mode needs them. */
export interface SitePartMethods {
    listSiteParts?(): Promise<SitePartCatalog>;
    /** Saves draft rules over `version`; REVISION_CONFLICT when stale, VALIDATION_FAILED with the path otherwise. */
    saveSitePartRules?(id: string, rules: SitePartRules, version: number): Promise<{
        version: number;
    }>;
    sitePartImpact?(ids: readonly string[], offset?: number): Promise<SitePartImpact>;
    previewSitePart?(id: string, revision: number, pageId: string | null): Promise<SitePartPreview>;
    /** SITE_PART_CONFLICT (details.apiCode) when parts would tie; nothing is published then. */
    publishSiteParts?(changes: readonly {
        id: string;
        revision: number;
        rulesVersion: number;
    }[], key: string): Promise<Record<string, string>>;
}
