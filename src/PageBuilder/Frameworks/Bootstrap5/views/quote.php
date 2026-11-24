<?php
// Quote (plan 05-B): blockquote in a figure, with the author as its caption.
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Html;

$cite = is_string($props['cite'] ?? null) ? trim($props['cite']) : '';
$class = trim('cms-quote ' . (is_string($props['class'] ?? null) ? $props['class'] : ''));
echo '<figure' . Html::attrs(['class' => $class]) . '><blockquote class="blockquote"><p>' . Html::lines($props['text'] ?? '') . '</p></blockquote>';
echo $cite === '' ? '' : '<figcaption class="blockquote-footer">' . Html::e($cite) . '</figcaption>';
echo '</figure>';
