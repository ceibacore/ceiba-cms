<?php
// Site menu (plan 06 D-6): the menu `slug` drawn by the module's menu renderer, which the host hands to the views
// as $siteMenu (never through props, so a document cannot inject markup). Without it, an empty navigation landmark.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$slug = is_string($props['slug'] ?? null) && preg_match('/^[a-z0-9_-]{1,100}$/i', $props['slug']) ? $props['slug'] : '';
$label = is_string($props['label'] ?? null) && trim($props['label']) !== '' ? trim($props['label']) : 'Main';
$class = trim('cms-site-menu ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
$menu = $slug !== '' && isset($siteMenu) && is_callable($siteMenu) ? (string) $siteMenu($slug) : '';
echo '<nav' . Html::attrs(['class' => $class, 'aria-label' => $label, 'data-cms-menu' => $slug]) . '>' . $menu . '</nav>';
