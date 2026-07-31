<?php
$title = $props['title'] ?? '';
$subtitle = $props['subtitle'] ?? '';
$text = $props['text'] ?? '';
$imageSrc = $props['image_src'] ?? '';
$imageAlt = $props['image_alt'] ?? '';
$footer = $props['footer'] ?? '';
$class = $props['class'] ?? '';

$cardClasses = ['card'];
if ($class !== '') {
    $cardClasses[] = $class;
}
$cardClassStr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $cardClasses));
?>
<div class="<?php echo $cardClassStr; ?>">
    <?php if ($imageSrc !== ''): ?>
        <img src="<?php echo htmlspecialchars((string) $imageSrc, ENT_QUOTES, 'UTF-8'); ?>" class="card-img-top" alt="<?php echo htmlspecialchars((string) $imageAlt, ENT_QUOTES, 'UTF-8'); ?>">
    <?php endif; ?>
    <div class="card-body">
        <?php if ($title !== ''): ?>
            <h5 class="card-title"><?php echo htmlspecialchars((string) $title, ENT_QUOTES, 'UTF-8'); ?></h5>
        <?php endif; ?>
        <?php if ($subtitle !== ''): ?>
            <h6 class="card-subtitle mb-2 text-muted"><?php echo htmlspecialchars((string) $subtitle, ENT_QUOTES, 'UTF-8'); ?></h6>
        <?php endif; ?>
        <?php if ($text !== ''): ?>
            <p class="card-text"><?php echo nl2br(htmlspecialchars((string) $text, ENT_QUOTES, 'UTF-8')); ?></p>
        <?php endif; ?>
        <?php echo $slot; ?>
    </div>
    <?php if ($footer !== ''): ?>
        <div class="card-footer text-muted">
            <?php echo htmlspecialchars((string) $footer, ENT_QUOTES, 'UTF-8'); ?>
        </div>
    <?php endif; ?>
</div>
