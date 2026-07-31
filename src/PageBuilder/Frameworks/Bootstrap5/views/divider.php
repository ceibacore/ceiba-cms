<?php
$style = $props['style'] ?? 'solid';
$spacing = $props['spacing'] ?? 'my-4';
$color = $props['color'] ?? '#dee2e6';
?>
<hr class="<?php echo htmlspecialchars((string) $spacing, ENT_QUOTES, 'UTF-8'); ?>" style="border-top-style: <?php echo htmlspecialchars((string) $style, ENT_QUOTES, 'UTF-8'); ?>; border-top-color: <?php echo htmlspecialchars((string) $color, ENT_QUOTES, 'UTF-8'); ?>; opacity: 1;">
