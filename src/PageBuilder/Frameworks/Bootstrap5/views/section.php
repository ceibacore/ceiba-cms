<?php
/**
 * Renders a generic HTML container (div) preserving ALL props as HTML attributes.
 * Also used by SemanticSectionRule nodes until the type is migrated to 'node'.
 */
// A node of type "section" is a <section> (as without a UI framework); semantic rules may set another tag.
$tag  = $props['tag'] ?? 'section';
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
