<?php
$gutter = (string) ($props['gutter'] ?? 'g-0');
// The catalogue offers the gutter as a number (1-5): it is the Bootstrap class g-{n}.
if (preg_match('/^[0-5]$/', $gutter)) {
    $gutter = 'g-' . $gutter;
}
$align = $props['align'] ?? '';
$justify = $props['justify'] ?? '';
$class = $props['class'] ?? '';

$rowClasses = ['row', $gutter];
if ($align !== '') {
    $rowClasses[] = $align;
}
if ($justify !== '') {
    $rowClasses[] = $justify;
}
if ($class !== '') {
    $rowClasses[] = $class;
}
$rowClassStr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $rowClasses));
?>
<div class="<?php echo $rowClassStr; ?>">
    <?php echo $slot; ?>
</div>
