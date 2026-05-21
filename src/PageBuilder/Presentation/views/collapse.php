<?php
$id = $props['id'] ?? 'collapse_' . uniqid();
$triggerLabel = $props['trigger_label'] ?? 'Mostrar / Ocultar';
$triggerVariant = $props['trigger_variant'] ?? 'primary';
$showTrigger = $props['show_trigger'] ?? true;
$open = $props['open'] ?? false;
$class = $props['class'] ?? '';

$collapseClasses = ['collapse'];
if ($open) {
    $collapseClasses[] = 'show';
}
if ($class !== '') {
    $collapseClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $collapseClasses));

?>
<?php if ($showTrigger): ?>
<button class="btn btn-<?php echo htmlspecialchars((string) $triggerVariant, ENT_QUOTES, 'UTF-8'); ?>"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>"
        aria-expanded="<?php echo $open ? 'true' : 'false'; ?>"
        aria-controls="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>">
    <?php echo htmlspecialchars((string) $triggerLabel, ENT_QUOTES, 'UTF-8'); ?>
</button>
<?php endif; ?>

<div class="<?php echo $classAttr; ?>" id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>">
    <?php echo $slot; ?>
</div>
