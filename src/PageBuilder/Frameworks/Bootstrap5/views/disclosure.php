<?php
// Accordion item (plan 05-C): <details>/<summary>, keyboard and screen readers work without JavaScript.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$title = is_string($props['title'] ?? null) && trim($props['title']) !== '' ? trim($props['title']) : 'Item';
$class = trim('cms-accordion-item ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<details' . Html::attrs(['class' => $class, 'open' => !empty($props['open'])]) . '><summary class="cms-accordion-title">' . Html::e($title)
    . '</summary><div class="cms-accordion-body">' . ($slot ?? '') . '</div></details>';
