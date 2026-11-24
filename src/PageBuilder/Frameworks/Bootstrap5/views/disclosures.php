<?php
// Accordion (plan 05-C): native <details> items; behaviors/accordion.js keeps one open when "single" is set.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$single = ($props['single'] ?? true) ? '1' : '';
$class = trim('cms-accordion ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class, 'data-cms-single' => $single]) . '>' . ($slot ?? '') . '</div>';
