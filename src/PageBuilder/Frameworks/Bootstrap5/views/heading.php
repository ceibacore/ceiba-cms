<?php
/**
 * Heading component of the module catalogue (ComponentCatalogue: props text, level).
 * Same output as the editor canvas: <h{level}> with the text escaped.
 */
$level = isset($props['level']) ? (int) $props['level'] : 2;
$level = max(1, min(6, $level));
$text  = (string) ($props['text'] ?? '');
$class = (string) ($props['class'] ?? '');
$classAttr = $class !== '' ? ' class="' . htmlspecialchars($class, ENT_QUOTES, 'UTF-8') . '"' : '';
?>
<h<?php echo $level; ?><?php echo $classAttr; ?>><?php echo htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); ?></h<?php echo $level; ?>>
