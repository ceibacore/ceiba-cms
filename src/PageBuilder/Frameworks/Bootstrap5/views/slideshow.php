<?php
// Carousel (plan 05-C): without JavaScript the slides scroll sideways; behaviors/carousel.js adds previous/next,
// and pause/play when it rotates by itself (never with prefers-reduced-motion).
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$text = static fn (string $key, string $default): string => is_string($props[$key] ?? null) && trim($props[$key]) !== ''
    ? str_replace('|', '', trim($props[$key])) : $default;
$interval = !empty($props['autoplay']) ? Html::int($props['interval'] ?? null, 6, 3, 15) * 1000 : 0;
$labels = implode('|', [$text('previousLabel', 'Previous'), $text('nextLabel', 'Next'), $text('pauseLabel', 'Pause'), $text('playLabel', 'Play')]);
$class = trim('cms-carousel ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class, 'role' => 'region', 'aria-label' => $text('label', 'Carousel'),
    'data-cms-carousel' => (string) $interval, 'data-cms-labels' => $labels]) . '><div class="cms-carousel-track">' . ($slot ?? '') . '</div></div>';
