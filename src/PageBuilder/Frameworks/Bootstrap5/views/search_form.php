<?php
// Search box (plan 06 D-6): a GET form to a path of the host (results arrive with plan 07).
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$action = Html::url($props['action'] ?? '/buscar') ?: '/buscar';
$label = is_string($props['label'] ?? null) && trim($props['label']) !== '' ? trim($props['label']) : 'Search';
$button = is_string($props['button'] ?? null) && trim($props['button']) !== '' ? trim($props['button']) : $label;
$placeholder = is_string($props['placeholder'] ?? null) ? trim($props['placeholder']) : '';
$class = trim('cms-search d-flex gap-2 ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<form' . Html::attrs(['class' => $class, 'role' => 'search', 'action' => $action, 'method' => 'get']) . '>';
echo '<label class="visually-hidden" for="cms-search-q">' . Html::e($label) . '</label>';
echo '<input' . Html::attrs(['id' => 'cms-search-q', 'class' => 'form-control', 'type' => 'search', 'name' => 'q', 'placeholder' => $placeholder]) . '>';
echo '<button type="submit" class="btn btn-outline-primary">' . Html::e($button) . '</button></form>';
