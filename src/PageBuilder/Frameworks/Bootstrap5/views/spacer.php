<?php
// Spacer (plan 05-B): empty vertical space, hidden from assistive technology.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$size = Html::int($props['size'] ?? null, 32, 4, 400);
$class = trim('cms-spacer ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class, 'style' => "height:{$size}px", 'aria-hidden' => 'true']) . '></div>';
