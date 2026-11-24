<?php
// Carousel slide (plan 05-C): any content; the carousel script names it "n / total".
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$class = trim('cms-carousel-slide ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class]) . '>' . ($slot ?? '') . '</div>';
