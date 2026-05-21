<?php
$id = $props['id'] ?? 'accordion_' . uniqid();
$flush = $props['flush'] ?? false;
$alwaysOpen = $props['always_open'] ?? false;
$class = $props['class'] ?? '';

$accordionClasses = ['accordion'];
if ($flush) {
    $accordionClasses[] = 'accordion-flush';
}
if ($class !== '') {
    $accordionClasses[] = $class;
}
$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $accordionClasses));
?>
<div class="<?php echo $classAttr; ?>" id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>">
    <?php echo $slot; ?>
</div>
