/**
 * Mirror of schemas/style-properties-v1.json (the source of truth, read as is by the PHP compiler).
 * tests/styles/matrix.test.ts fails when they differ.
 */
export interface PropertySpec {
  readonly name: string;
  readonly css: string;
  readonly kind: 'keyword' | 'number' | 'length' | 'tracks' | 'gridColumn' | 'token' | 'lineHeight' | 'color';
  readonly parts?: number;
  readonly auto?: boolean;
  readonly negative?: boolean;
  readonly min?: number;
  readonly max?: number;
  readonly tokenType?: string;
}

export const STYLE_MATRIX = {
  version: 1,
  states: ["hover", "focus-visible", "active"],
  tokenTypes: ["color", "length", "fontFamily", "fontWeight", "shadow", "duration"],
  keywords: {
    display: ["block", "inline", "inline-block", "flex", "inline-flex", "grid", "none"],
    flexDirection: ["row", "row-reverse", "column", "column-reverse"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse"],
    justifyContent: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end"],
    alignItems: ["stretch", "flex-start", "flex-end", "center", "baseline", "start", "end"],
    alignSelf: ["auto", "stretch", "flex-start", "flex-end", "center", "baseline", "start", "end"],
    textAlign: ["left", "right", "center", "justify", "start", "end"],
    fontWeight: ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
    borderStyle: ["none", "solid", "dashed", "dotted", "double"],
  } as Record<string, readonly string[]>,
  properties: [
    { name: "display", css: "display", kind: "keyword" },
    { name: "flexDirection", css: "flex-direction", kind: "keyword" },
    { name: "flexWrap", css: "flex-wrap", kind: "keyword" },
    { name: "flexGrow", css: "flex-grow", kind: "number", min: 0, max: 100 },
    { name: "flexShrink", css: "flex-shrink", kind: "number", min: 0, max: 100 },
    { name: "justifyContent", css: "justify-content", kind: "keyword" },
    { name: "alignItems", css: "align-items", kind: "keyword" },
    { name: "alignSelf", css: "align-self", kind: "keyword" },
    { name: "gap", css: "gap", kind: "length", parts: 2 },
    { name: "gridTemplateColumns", css: "grid-template-columns", kind: "tracks" },
    { name: "gridColumn", css: "grid-column", kind: "gridColumn" },
    { name: "width", css: "width", kind: "length", auto: true },
    { name: "minWidth", css: "min-width", kind: "length" },
    { name: "maxWidth", css: "max-width", kind: "length" },
    { name: "height", css: "height", kind: "length", auto: true },
    { name: "minHeight", css: "min-height", kind: "length" },
    { name: "maxHeight", css: "max-height", kind: "length" },
    { name: "margin", css: "margin", kind: "length", parts: 4, auto: true, negative: true },
    { name: "marginBlock", css: "margin-block", kind: "length", parts: 2, auto: true, negative: true },
    { name: "marginInline", css: "margin-inline", kind: "length", parts: 2, auto: true, negative: true },
    { name: "marginTop", css: "margin-top", kind: "length", auto: true, negative: true },
    { name: "marginRight", css: "margin-right", kind: "length", auto: true, negative: true },
    { name: "marginBottom", css: "margin-bottom", kind: "length", auto: true, negative: true },
    { name: "marginLeft", css: "margin-left", kind: "length", auto: true, negative: true },
    { name: "padding", css: "padding", kind: "length", parts: 4 },
    { name: "paddingBlock", css: "padding-block", kind: "length", parts: 2 },
    { name: "paddingInline", css: "padding-inline", kind: "length", parts: 2 },
    { name: "paddingTop", css: "padding-top", kind: "length" },
    { name: "paddingRight", css: "padding-right", kind: "length" },
    { name: "paddingBottom", css: "padding-bottom", kind: "length" },
    { name: "paddingLeft", css: "padding-left", kind: "length" },
    { name: "fontFamily", css: "font-family", kind: "token", tokenType: "fontFamily" },
    { name: "fontSize", css: "font-size", kind: "length" },
    { name: "fontWeight", css: "font-weight", kind: "keyword", tokenType: "fontWeight" },
    { name: "lineHeight", css: "line-height", kind: "lineHeight", min: 0.5, max: 10 },
    { name: "textAlign", css: "text-align", kind: "keyword" },
    { name: "color", css: "color", kind: "color" },
    { name: "backgroundColor", css: "background-color", kind: "color" },
    { name: "borderWidth", css: "border-width", kind: "length", parts: 4 },
    { name: "borderStyle", css: "border-style", kind: "keyword" },
    { name: "borderColor", css: "border-color", kind: "color" },
    { name: "borderRadius", css: "border-radius", kind: "length", parts: 4 },
    { name: "boxShadow", css: "box-shadow", kind: "token", tokenType: "shadow" },
    { name: "opacity", css: "opacity", kind: "number", min: 0, max: 1 },
  ] as readonly PropertySpec[],
  limits: { tokens: 500, classes: 200, declarations: 60, valueLength: 200, breakpoints: 8, minWidth: 4000, magnitude: 10000 },
};

export const PROPERTY_BY_NAME: ReadonlyMap<string, PropertySpec> = new Map(STYLE_MATRIX.properties.map((p) => [p.name, p]));
