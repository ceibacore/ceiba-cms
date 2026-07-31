<?php
$divider = $props['divider'] ?? '/';
$showHome = $props['show_home'] ?? true;
$homeLabel = $props['home_label'] ?? 'Inicio';
$class = $props['class'] ?? '';

// $breadcrumbs is injected from context by BladeRenderer
$crumbs = $breadcrumbs ?? [];
if ($showHome) {
    array_unshift($crumbs, ['label' => $homeLabel, 'url' => '/']);
}
?>
<nav aria-label="breadcrumb"<?php echo $class !== '' ? ' class="' . htmlspecialchars((string) $class, ENT_QUOTES, 'UTF-8') . '"' : ''; ?>

     style="--bs-breadcrumb-divider: '<?php echo htmlspecialchars((string) $divider, ENT_QUOTES, 'UTF-8'); ?>';">
    <ol class="breadcrumb">
        <?php foreach ($crumbs as $i => $crumb): ?>
            <?php $isLast = ($i === count($crumbs) - 1); ?>
            <?php if ($isLast): ?>
                <li class="breadcrumb-item active" aria-current="page"><?php echo htmlspecialchars((string) ($crumb['label'] ?? ''), ENT_QUOTES, 'UTF-8'); ?></li>
            <?php else: ?>
                <li class="breadcrumb-item"><a href="<?php echo htmlspecialchars((string) ($crumb['url'] ?? '#'), ENT_QUOTES, 'UTF-8'); ?>"><?php echo htmlspecialchars((string) ($crumb['label'] ?? ''), ENT_QUOTES, 'UTF-8'); ?></a></li>
            <?php endif; ?>
        <?php endforeach; ?>
    </ol>
</nav>
