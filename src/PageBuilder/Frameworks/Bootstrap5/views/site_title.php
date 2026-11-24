<?php
// Site name (plan 06 D-6): text linking to the home page.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$text = is_string($props['text'] ?? null) && trim($props['text']) !== '' ? trim($props['text']) : 'Site';
$href = Html::url($props['href'] ?? '/') ?: '/';
$class = trim('cms-site-title navbar-brand ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<a' . Html::attrs(['href' => $href, 'class' => $class]) . '>' . Html::e($text) . '</a>';
