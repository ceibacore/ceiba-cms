<?php
// Image (plan 05-A): src/srcset/width/height/alt come resolved from the asset by MediaPropsDecorator.
$esc = static fn ($v): string => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
$src = is_string($props['src'] ?? null) ? trim($props['src']) : '';
if (preg_match('~^\s*(javascript|vbscript|data):~i', $src)) {
    $src = '';
}
$alt = is_string($props['alt'] ?? null) ? $props['alt'] : '';
$srcset = is_string($props['srcset'] ?? null) ? $props['srcset'] : '';
$sizes = is_string($props['sizes'] ?? null) && $props['sizes'] !== '' ? $props['sizes'] : '100vw';
$width = isset($props['width']) ? (int) $props['width'] : 0;
$height = isset($props['height']) ? (int) $props['height'] : 0;
$lazy = ($props['loading'] ?? 'lazy') !== 'eager';

$classes = [];
if ($props['fluid'] ?? true) {
    $classes[] = 'img-fluid';
}
if ($props['rounded'] ?? false) {
    $classes[] = 'rounded';
}
if (is_string($props['class'] ?? null) && trim($props['class']) !== '') {
    $classes[] = trim($props['class']);
}
if ($src === '') {
    return;
}
?>
<img src="<?php echo $esc($src); ?>" alt="<?php echo $esc($alt); ?>"<?php
echo $srcset !== '' ? ' srcset="' . $esc($srcset) . '" sizes="' . $esc($sizes) . '"' : '';
echo $classes !== [] ? ' class="' . $esc(implode(' ', $classes)) . '"' : '';
echo $width > 0 ? ' width="' . $width . '"' : '';
echo $height > 0 ? ' height="' . $height . '"' : '';
echo $lazy ? ' loading="lazy" decoding="async"' : '';
?>>
