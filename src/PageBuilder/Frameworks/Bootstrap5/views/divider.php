<?php
// Divider (plan 05-B): Bootstrap spacing class, line style from a closed list; colour and width come from styles.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$style = Html::oneOf($props['style'] ?? null, ['solid', 'dashed', 'dotted']);
$spacing = Html::int($props['spacing'] ?? null, 4, 0, 5);
$class = trim('cms-divider my-' . $spacing . ' ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<hr' . Html::attrs(['class' => $class, 'style' => $style === 'solid' ? '' : 'border-top-style:' . $style]) . '>';
