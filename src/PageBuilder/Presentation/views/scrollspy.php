<?php
$id = $props['id'] ?? 'scrollspy_' . uniqid();
$navId = $props['nav_id'] ?? '';
$offset = $props['offset'] ?? 0;
$class = $props['class'] ?? '';

$scrollspyClasses = ['scrollspy-example'];
if ($class !== '') {
    $scrollspyClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $scrollspyClasses));
$navAttr = $navId !== '' ? ' data-bs-target="#' . htmlspecialchars((string) $navId, ENT_QUOTES, 'UTF-8') . '"' : '';

?>
<div id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $classAttr; ?>" data-bs-spy="scroll"<?php echo $navAttr; ?> data-bs-smooth-scroll="true" tabindex="0">
    <?php echo $slot; ?>
</div>
