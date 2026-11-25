<?php
// What a query shows when it has results, none, or failed (plan 07-B); the expander keeps only the matching state.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$show = in_array($props['show'] ?? '', ['results', 'empty', 'error'], true) ? $props['show'] : 'empty';
$class = trim("cms-query-{$show} " . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<div' . Html::attrs(['class' => $class] + ($show === 'error' ? ['role' => 'status'] : [])) . '>' . $slot . '</div>';
