<?php
$fluid = $props['fluid'] ?? false;
$class = $props['class'] ?? '';
$containerClass = $fluid ? 'container-fluid' : 'container';
?>
<div class="<?php echo htmlspecialchars((string) $containerClass, ENT_QUOTES, 'UTF-8'); ?><?php echo $class !== '' ? ' ' . htmlspecialchars((string) $class, ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php echo $slot; ?>
</div>
