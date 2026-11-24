<?php
// Card (plan 05-B): optional library image, title, text, the nodes placed inside, and an optional link.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$title = is_string($props['title'] ?? null) ? trim($props['title']) : '';
$text = is_string($props['text'] ?? null) ? trim($props['text']) : '';
$label = is_string($props['linkLabel'] ?? null) ? trim($props['linkLabel']) : '';
$href = Html::url($props['linkUrl'] ?? null);
$class = trim('card ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class]) . '>' . Html::img($props, 'image', 'card-img-top', '(min-width: 768px) 33vw, 100vw');
echo '<div class="card-body">';
echo $title === '' ? '' : '<h3 class="card-title h5">' . Html::e($title) . '</h3>';
echo $text === '' ? '' : '<p class="card-text">' . Html::lines($text) . '</p>';
echo $slot ?? '';
echo $label === '' || $href === '' ? '' : '<a' . Html::attrs(['href' => $href, 'class' => 'btn btn-primary']) . '>' . Html::e($label) . '</a>';
echo '</div></div>';
