<?php
// Gallery (plan 05-B): library images in a responsive grid, each with its alt text and optional caption.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$columns = (int) Html::oneOf((string) ($props['columns'] ?? '3'), ['3', '2', '4']);
$items = array_slice(array_values(array_filter(is_array($props['items'] ?? null) ? $props['items'] : [], 'is_array')), 0, 60);
$sizes = '(min-width: 768px) ' . intdiv(100, $columns) . 'vw, 50vw';
$class = trim('cms-gallery row g-3 ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class]) . '>';
foreach ($items as $item) {
    $img = Html::img($item, 'image', 'img-fluid rounded', $sizes);
    if ($img === '') {
        continue;
    }
    $caption = is_string($item['caption'] ?? null) ? trim($item['caption']) : '';
    echo '<figure class="col-6 col-md-' . intdiv(12, $columns) . ' m-0">' . $img;
    echo $caption === '' ? '' : '<figcaption class="small text-muted mt-1">' . Html::e($caption) . '</figcaption>';
    echo '</figure>';
}
echo '</div>';
