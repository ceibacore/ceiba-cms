import type { CompiledStyles, DesignDocument, StyledNode } from './types';
export declare const nodeClass: (id: string) => string;
export declare const siteClass: (id: string) => string;
export declare const compileStyles: (design: DesignDocument, nodes: readonly StyledNode[], assets?: Readonly<Record<string, string>>) => CompiledStyles;
