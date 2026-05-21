<?php
$label = $props['label'] ?? 'Tooltip';
$tooltipText = $props['tooltip_text'] ?? '';
$placement = $props['placement'] ?? 'top';
$variant = $props['variant'] ?? 'primary';
$class = $props['class'] ?? '';

$elementClasses = [];
if ($variant !== '') {
    $elementClasses[] = 'btn';
    $elementClasses[] = 'btn-' . $variant;
}
if ($class !== '') {
    $elementClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $elementClasses));

$tag = $variant !== '' ? 'button' : 'span';
$typeAttr = $tag === 'button' ? ' type="button"' : '';

?>
<<?php echo $tag; ?><?php echo $typeAttr; ?> class="<?php echo $classAttr; ?>" data-bs-toggle="tooltip" data-bs-placement="<?php echo htmlspecialchars((string) $placement, ENT_QUOTES, 'UTF-8'); ?>" title="<?php echo htmlspecialchars((string) $tooltipText, ENT_QUOTES, 'UTF-8'); ?>">
    <?php echo htmlspecialchars((string) $label, ENT_QUOTES, 'UTF-8'); ?>
    <?php echo $slot; ?>
</<?php echo $tag; ?>>
