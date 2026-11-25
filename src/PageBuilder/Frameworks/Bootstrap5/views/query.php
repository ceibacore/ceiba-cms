<?php
// Query block (plan 07-B): the results, states, filters and pagination of one query. Its id anchors partial reloads.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$class = trim('cms-query ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class, 'data-cms-query' => (string) ($props['id'] ?? ''),
    'data-cms-state' => (string) ($props['_state'] ?? 'error'), 'aria-live' => 'polite']) . '>' . $slot . '</div>';
