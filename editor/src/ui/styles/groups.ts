import type { MessageKey } from '../i18n';

/** Style controls of the inspector, grouped (property names of schemas/style-properties-v1.json). */
export const STYLE_GROUPS: readonly { key: MessageKey; properties: readonly string[] }[] = [
  { key: 'styles.group.layout', properties: ['display', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems', 'alignSelf', 'gap',
    'gridTemplateColumns', 'gridColumn', 'flexGrow', 'flexShrink'] },
  { key: 'styles.group.spacing', properties: ['margin', 'marginBlock', 'marginInline', 'padding', 'paddingBlock', 'paddingInline'] },
  { key: 'styles.group.size', properties: ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'] },
  { key: 'styles.group.typography', properties: ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign', 'color'] },
  { key: 'styles.group.background', properties: ['backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat'] },
  { key: 'styles.group.border', properties: ['borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'boxShadow'] },
  { key: 'styles.group.effects', properties: ['opacity'] },
];

/** "paddingBlock" → "Padding block". */
export const propertyLabel = (name: string): string => {
  const words = name.replace(/([A-Z])/g, ' $1').toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** Text typed in a field as the value to store: numbers for numeric properties, trimmed text otherwise. */
export const typedValue = (kind: string, raw: string): string | number => {
  const text = raw.trim();
  return (kind === 'number' || kind === 'lineHeight') && /^-?(\d+\.?\d*|\.\d+)$/.test(text) ? Number(text) : text;
};
