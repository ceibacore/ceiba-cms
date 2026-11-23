import type { MessageKey } from '../i18n';
/** Style controls of the inspector, grouped (property names of schemas/style-properties-v1.json). */
export declare const STYLE_GROUPS: readonly {
    key: MessageKey;
    properties: readonly string[];
}[];
/** "paddingBlock" → "Padding block". */
export declare const propertyLabel: (name: string) => string;
/** Text typed in a field as the value to store: numbers for numeric properties, trimmed text otherwise. */
export declare const typedValue: (kind: string, raw: string) => string | number;
