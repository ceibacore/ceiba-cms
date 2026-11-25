<?php
// Pages of a query (plan 07, D-6): plain links that keep the other declared URL values; works without JavaScript.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$pages = is_array($props['_pages'] ?? null) ? $props['_pages'] : null;
if ($pages === null) {
    return;
}
$label = is_string($props['label'] ?? null) && $props['label'] !== '' ? $props['label'] : 'Pages';
$prev = is_string($props['prev'] ?? null) && $props['prev'] !== '' ? $props['prev'] : '«';
$next = is_string($props['next'] ?? null) && $props['next'] !== '' ? $props['next'] : '»';
$class = trim('pagination ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
$item = static function (?string $href, string $text, bool $current = false, ?string $aria = null): string {
    $li = 'page-item' . ($href === null ? ' disabled' : '') . ($current ? ' active' : '');
    $inner = $href === null || $current
        ? '<span' . Html::attrs(['class' => 'page-link', 'aria-current' => $current ? 'page' : null]) . '>' . Html::e($text) . '</span>'
        : '<a' . Html::attrs(['class' => 'page-link', 'href' => $href, 'aria-label' => $aria]) . '>' . Html::e($text) . '</a>';

    return '<li class="' . $li . '">' . $inner . '</li>';
};
echo '<nav' . Html::attrs(['aria-label' => $label]) . '><ul' . Html::attrs(['class' => $class]) . '>';
echo $item($pages['prev'] ?? null, $prev, false, 'Previous');
foreach ($pages['links'] ?? [] as $link) {
    echo $item((string) $link['href'], (string) $link['label'], (bool) $link['current']);
}
echo $item($pages['next'] ?? null, $next, false, 'Next');
echo '</ul></nav>';
