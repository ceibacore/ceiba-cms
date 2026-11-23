import type { Breakpoint, DesignDocument, DesignToken, NodeStyles, StyleBlock } from '../../core';

/** Pure changes of the site design (plan 04-D); each returns a new document. */
export const TOKEN_ID = /^[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)*$/;
export const CLASS_ID = /^[a-z][a-z0-9-]{0,40}$/;

export const withToken = (design: DesignDocument, id: string, token: DesignToken): DesignDocument =>
  ({ ...design, tokens: { ...design.tokens, [id]: token } });

export const withoutToken = (design: DesignDocument, id: string): DesignDocument => {
  const tokens = { ...design.tokens };
  delete tokens[id];
  return { ...design, tokens };
};

export const withClass = (design: DesignDocument, id: string, name: string, styles: StyleBlock = {}): DesignDocument =>
  ({ ...design, classes: { ...design.classes, [id]: { name, styles: design.classes[id]?.styles ?? styles } } });

export const withClassStyles = (design: DesignDocument, id: string, styles: NodeStyles | null): DesignDocument => {
  const current = design.classes[id];
  return current ? { ...design, classes: { ...design.classes, [id]: { ...current, styles: styles ?? {} } } } : design;
};

export const withoutClass = (design: DesignDocument, id: string): DesignDocument => {
  const classes = { ...design.classes };
  delete classes[id];
  return { ...design, classes };
};

export const withBreakpoints = (design: DesignDocument, breakpoints: readonly Breakpoint[]): DesignDocument =>
  ({ ...design, breakpoints });

const blockUsesToken = (block: StyleBlock | undefined, id: string): boolean =>
  JSON.stringify(block ?? {}).includes(`{"token":${JSON.stringify(id)}}`);

/** Where a token is used inside the design itself: aliases of other tokens and class declarations. */
export const tokenUsagesInDesign = (design: DesignDocument, id: string): string[] => [
  ...Object.entries(design.tokens).filter(([other, token]) => other !== id && typeof token.value === 'object'
    && token.value.token === id).map(([other]) => `token ${other}`),
  ...Object.entries(design.classes).filter(([, cls]) => blockUsesToken(cls.styles, id)).map(([cls, value]) => `class ${value.name ?? cls}`),
];
