<?php
// Tabs (plan 05-C): without JavaScript each panel is a titled section; behaviors/tabs.js builds the tab list.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$label = is_string($props['label'] ?? null) ? trim($props['label']) : '';
$class = trim('cms-tabs ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class, 'data-cms-tabs' => '1', 'data-cms-label' => $label]) . '>' . ($slot ?? '') . '</div>';
