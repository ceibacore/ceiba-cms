<?php
// Site logo (plan 06 D-6): a library image linking to the home page; without one, the site name as text.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$name = is_string($props['name'] ?? null) && trim($props['name']) !== '' ? trim($props['name']) : 'Home';
$href = Html::url($props['href'] ?? '/') ?: '/';
$height = Html::int($props['height'] ?? null, 40, 16, 200);
$class = trim('cms-site-logo navbar-brand ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
$image = Html::img(['image' => $props['image'] ?? null, 'alt' => $name, 'srcset' => $props['srcset'] ?? null], 'image', 'd-block', "{$height}px");
$image = $image === '' ? '' : str_replace('<img ', '<img style="height:' . $height . 'px;width:auto" ', $image);
echo '<a' . Html::attrs(['href' => $href, 'class' => $class]) . '>' . ($image !== '' ? $image : Html::e($name)) . '</a>';
