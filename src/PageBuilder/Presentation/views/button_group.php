<?php
$vertical = $props['vertical'] ?? false;
$size = $props['size'] ?? '';
$ariaLabel = $props['aria_label'] ?? 'Grupo de botones';
$class = $props['class'] ?? '';

$groupClasses = [$vertical ? 'btn-group-vertical' : 'btn-group'];
if ($size !== '') {
    $groupClasses[] = $size;
}
if ($class !== '') {
    $groupClasses[] = $class;
}
$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $groupClasses));
?>
<div class="<?php echo $classAttr; ?>" role="group" aria-label="<?php echo htmlspecialchars((string) $ariaLabel, ENT_QUOTES, 'UTF-8'); ?>">
    <?php echo $slot; ?>
</div>
