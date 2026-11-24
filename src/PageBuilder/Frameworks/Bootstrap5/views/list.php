<?php
// List (plan 05-B): one text item per entry, bulleted, numbered, unstyled or inline.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$items = array_slice(array_values(array_filter(is_array($props['items'] ?? null) ? $props['items'] : [], 'is_string')), 0, 100);
$variant = Html::oneOf($props['variant'] ?? null, ['default', 'unstyled', 'inline']);
$tag = !empty($props['ordered']) ? 'ol' : 'ul';
$class = trim('cms-list' . ($variant === 'default' ? '' : ' list-' . $variant) . ' ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo "<{$tag}" . Html::attrs(['class' => $class]) . '>';
foreach ($items as $item) {
    echo '<li' . Html::attrs(['class' => $variant === 'inline' ? 'list-inline-item' : '']) . '>' . Html::e($item) . '</li>';
}
echo "</{$tag}>";
