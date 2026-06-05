<?php
/**
 * Renders a leaf text element. Preserves ALL props as HTML attributes.
 * 'tag' and 'content' are system keys — not emitted as attributes.
 * 'align' is a PageBuilder layout helper — appended to class.
 */
$tag     = $props['tag']     ?? 'p';
$content = $props['content'] ?? '';
$align   = $props['align']   ?? '';
$class   = $props['class']   ?? '';

// Merge align utility into class
if ($align !== '') {
    $class = trim($align . ' ' . $class);
}

$skip = ['tag', 'content', 'align'];

$attrStr = '';
// class first for readability
if ($class !== '') {
    $attrStr .= ' class="' . htmlspecialchars($class, ENT_QUOTES, 'UTF-8') . '"';
}
foreach ($props as $key => $value) {
    if (in_array($key, array_merge($skip, ['class']), true) || $value === null || $value === '') {
        continue;
    }
    $attrStr .= ' '
        . htmlspecialchars((string) $key, ENT_QUOTES, 'UTF-8')
        . '="'
        . htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8')
        . '"';
}
?>
<<?php echo $tag; ?><?php echo $attrStr; ?>><?php echo htmlspecialchars((string) $content, ENT_QUOTES, 'UTF-8'); ?></<?php echo $tag; ?>>

