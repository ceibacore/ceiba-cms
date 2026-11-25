<?php
// A visitor filter of a query (plan 07, D-6): a GET form on a declared URL parameter (search box or select).
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$filter = is_array($props['_filter'] ?? null) ? $props['_filter'] : null;
if ($filter === null) {
    return;
}
$name = (string) $filter['name'];
$id = 'cms-filter-' . preg_replace('/[^a-z0-9_]/', '', $name);
$label = is_string($props['label'] ?? null) && $props['label'] !== '' ? $props['label'] : $name;
$button = is_string($props['button'] ?? null) && $props['button'] !== '' ? $props['button'] : 'OK';
$class = trim('cms-query-filter d-flex gap-2 align-items-end ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<form' . Html::attrs(['class' => $class, 'method' => 'get', 'action' => '']) . '>';
foreach ($filter['hidden'] ?? [] as $key => $value) {
    echo '<input' . Html::attrs(['type' => 'hidden', 'name' => (string) $key, 'value' => (string) $value]) . '>';
}
echo '<div><label class="form-label"' . Html::attrs(['for' => $id]) . '>' . Html::e($label) . '</label>';
if ($filter['kind'] === 'select') {
    echo '<select' . Html::attrs(['id' => $id, 'name' => $name, 'class' => 'form-select']) . '><option value="">' . Html::e($props['all'] ?? '—') . '</option>';
    foreach ($filter['options'] as $option) {
        $selected = (string) $option['value'] === (string) $filter['value'];
        echo '<option' . Html::attrs(['value' => (string) $option['value'], 'selected' => $selected ?: null]) . '>' . Html::e($option['label']) . '</option>';
    }
    echo '</select>';
} else {
    echo '<input' . Html::attrs(['id' => $id, 'type' => 'search', 'name' => $name, 'class' => 'form-control', 'value' => (string) $filter['value'],
        'placeholder' => is_string($props['placeholder'] ?? null) ? $props['placeholder'] : null]) . '>';
}
echo '</div><button type="submit" class="btn btn-outline-primary">' . Html::e($button) . '</button></form>';
