import type { Breakpoint, DesignDocument, DesignToken, NodeStyles, StyleBlock } from '../../core';
/** Pure changes of the site design (plan 04-D); each returns a new document. */
export declare const TOKEN_ID: RegExp;
export declare const CLASS_ID: RegExp;
export declare const withToken: (design: DesignDocument, id: string, token: DesignToken) => DesignDocument;
export declare const withoutToken: (design: DesignDocument, id: string) => DesignDocument;
export declare const withClass: (design: DesignDocument, id: string, name: string, styles?: StyleBlock) => DesignDocument;
export declare const withClassStyles: (design: DesignDocument, id: string, styles: NodeStyles | null) => DesignDocument;
export declare const withoutClass: (design: DesignDocument, id: string) => DesignDocument;
export declare const withBreakpoints: (design: DesignDocument, breakpoints: readonly Breakpoint[]) => DesignDocument;
/** Where a token is used inside the design itself: aliases of other tokens and class declarations. */
export declare const tokenUsagesInDesign: (design: DesignDocument, id: string) => string[];
