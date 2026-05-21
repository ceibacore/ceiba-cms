<?php
$tag = $props['tag'] ?? 'p';
$content = $props['content'] ?? 'Texto aquí';
$align = $props['align'] ?? '';
$class = $props['class'] ?? '';

$allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'small'];
if (!in_array($tag, $allowedTags, true)) {
    $tag = 'p';
}

$textClasses = [];
if ($align !== '') {
    $textClasses[] = $align;
}
if ($class !== '') {
    $textClasses[] = $class;
}

$classAttr = '';
if (!empty($textClasses)) {
    $classAttr = ' class="' . implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $textClasses)) . '"';
}
?>
<<?php echo $tag; ?><?php echo $classAttr; ?>><?php echo htmlspecialchars((string) $content, ENT_QUOTES, 'UTF-8'); ?></<?php echo $tag; ?>>
