<?php
$xs = isset($props['xs']) ? (int) $props['xs'] : 12;
$sm = isset($props['sm']) ? (int) $props['sm'] : 0;
$md = isset($props['md']) ? (int) $props['md'] : 0;
$lg = isset($props['lg']) ? (int) $props['lg'] : 0;
$xl = isset($props['xl']) ? (int) $props['xl'] : 0;
$class = $props['class'] ?? '';

$colClasses = [];
if ($xs > 0) {
    $colClasses[] = 'col-' . $xs;
} else {
    $colClasses[] = 'col';
}

if ($sm > 0) {
    $colClasses[] = 'col-sm-' . $sm;
}
if ($md > 0) {
    $colClasses[] = 'col-md-' . $md;
}
if ($lg > 0) {
    $colClasses[] = 'col-lg-' . $lg;
}
if ($xl > 0) {
    $colClasses[] = 'col-xl-' . $xl;
}

if ($class !== '') {
    $colClasses[] = $class;
}

$colClassStr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $colClasses));
?>
<div class="<?php echo $colClassStr; ?>">
    <?php echo $slot; ?>
</div>
