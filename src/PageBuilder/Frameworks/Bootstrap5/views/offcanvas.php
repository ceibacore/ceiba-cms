<?php
$id = $props['id'] ?? 'offcanvas_' . uniqid();
$title = $props['title'] ?? 'Menú Lateral';
$placement = $props['placement'] ?? 'start';
$backdrop = $props['backdrop'] ?? true;
$bodyText = $props['body_text'] ?? '';
$class = $props['class'] ?? '';

$offcanvasClasses = ['offcanvas'];
$offcanvasClasses[] = 'offcanvas-' . $placement;

if ($class !== '') {
    $offcanvasClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $offcanvasClasses));
$backdropAttr = $backdrop ? 'true' : 'false';

?>
<div class="<?php echo $classAttr; ?>" tabindex="-1" id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" aria-labelledby="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>Label" data-bs-backdrop="<?php echo $backdropAttr; ?>">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>Label"><?php echo htmlspecialchars((string) $title, ENT_QUOTES, 'UTF-8'); ?></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <?php if ($bodyText !== ''): ?>
            <p><?php echo htmlspecialchars((string) $bodyText, ENT_QUOTES, 'UTF-8'); ?></p>
        <?php endif; ?>
        <?php echo $slot; ?>
    </div>
</div>
