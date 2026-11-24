<?php
// Image (plan 05-A/B): src/srcset/width/height/alt come resolved from the asset by MediaPropsDecorator.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$classes = array_filter([
    ($props['fluid'] ?? true) ? 'img-fluid' : '', ($props['rounded'] ?? false) ? 'rounded' : '',
    is_string($props['class'] ?? null) ? trim($props['class']) : '',
]);
$sizes = is_string($props['sizes'] ?? null) && trim($props['sizes']) !== '' ? trim($props['sizes']) : '100vw';
echo Html::img($props, 'src', implode(' ', $classes), $sizes);
