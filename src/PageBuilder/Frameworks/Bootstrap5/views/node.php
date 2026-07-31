<?php
/**
 * Renders a generic HTML node preserving ALL props as HTML attributes.
 * Props with key 'tag' are system keys (not emitted as HTML attributes).
 *
 * Used by: SemanticSectionRule (main, nav, header, footer, section, aside, article)
 *          HeadingRule with child elements (h1-h6 with inner markup)
 *          AnchorRule with child elements (<a> containing child elements)
 */
$tag  = $props['tag'] ?? 'div';
$skip = ['tag'];

$attrStr = '';
foreach ($props as $key => $value) {
    if (in_array($key, $skip, true) || $value === null || $value === '') {
        continue;
    }
    $attrStr .= ' '
        . htmlspecialchars((string) $key, ENT_QUOTES, 'UTF-8')
        . '="'
        . htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8')
        . '"';
}

echo "<{$tag}{$attrStr}>{$slot}</{$tag}>";
