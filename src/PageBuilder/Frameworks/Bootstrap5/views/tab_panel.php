<?php
// Tab panel (plan 05-C): its title becomes the tab; the heading stays as the readable title without JavaScript.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$title = is_string($props['title'] ?? null) && trim($props['title']) !== '' ? trim($props['title']) : 'Tab';
$class = trim('cms-tab-panel ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<section' . Html::attrs(['class' => $class]) . '><h3 class="cms-tab-title">' . Html::e($title) . '</h3>' . ($slot ?? '') . '</section>';
