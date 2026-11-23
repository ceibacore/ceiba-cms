<?php
$label = $props['label'] ?? 'Click aquí';
// The module catalogue stores the link in `url`; imported trees may use `href`.
$href = (string) ($props['href'] ?? $props['url'] ?? '#');
// Active schemes never reach the public page (same rule as the editor canvas).
if (preg_match('/^\s*(javascript|data|vbscript):/i', preg_replace('/[\x00-\x20]+/', '', $href))) {
    $href = '#';
}
$variant = $props['variant'] ?? 'primary';
$size = $props['size'] ?? '';
$target = $props['target'] ?? '_self';
$class = $props['class'] ?? '';

$btnClasses = ['btn', 'btn-' . $variant];
if ($size !== '') {
    $btnClasses[] = $size;
}
if ($class !== '') {
    $btnClasses[] = $class;
}

$classAttr = ' class="' . implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $btnClasses)) . '"';
$targetAttr = $target !== '_self' ? ' target="' . htmlspecialchars((string) $target, ENT_QUOTES, 'UTF-8') . '"' : '';
?>
<a href="<?php echo htmlspecialchars((string) $href, ENT_QUOTES, 'UTF-8'); ?>"<?php echo $classAttr; ?><?php echo $targetAttr; ?>><?php echo htmlspecialchars((string) $label, ENT_QUOTES, 'UTF-8'); ?></a>
