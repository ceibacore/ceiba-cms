<?php
$src = $props['src'] ?? '';
$alt = $props['alt'] ?? '';
$fluid = $props['fluid'] ?? true;
$rounded = $props['rounded'] ?? false;
$width = isset($props['width']) ? (int) $props['width'] : 0;
$height = isset($props['height']) ? (int) $props['height'] : 0;
$class = $props['class'] ?? '';

$imgClasses = [];
if ($fluid) {
    $imgClasses[] = 'img-fluid';
}
if ($rounded) {
    $imgClasses[] = 'rounded';
}
if ($class !== '') {
    $imgClasses[] = $class;
}

$classAttr = '';
if (!empty($imgClasses)) {
    $classAttr = ' class="' . implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $imgClasses)) . '"';
}

$widthAttr = $width > 0 ? ' width="' . $width . '"' : '';
$heightAttr = $height > 0 ? ' height="' . $height . '"' : '';
?>
<img src="<?php echo htmlspecialchars((string) $src, ENT_QUOTES, 'UTF-8'); ?>" alt="<?php echo htmlspecialchars((string) $alt, ENT_QUOTES, 'UTF-8'); ?>"<?php echo $classAttr; ?><?php echo $widthAttr; ?><?php echo $heightAttr; ?>>
