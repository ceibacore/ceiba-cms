<?php
$imageSrc = $props['image_src'] ?? '';
$imageAlt = $props['image_alt'] ?? '';
$captionTitle = $props['caption_title'] ?? '';
$captionText = $props['caption_text'] ?? '';
$interval = $props['interval'] ?? 0;
$active = $props['active'] ?? false;

$itemClasses = ['carousel-item'];
if ($active) {
    $itemClasses[] = 'active';
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $itemClasses));
$intervalAttr = $interval > 0 ? ' data-bs-interval="' . htmlspecialchars((string) $interval, ENT_QUOTES, 'UTF-8') . '"' : '';

?>
<div class="<?php echo $classAttr; ?>"<?php echo $intervalAttr; ?>>
    <?php if ($imageSrc !== ''): ?>
        <img src="<?php echo htmlspecialchars((string) $imageSrc, ENT_QUOTES, 'UTF-8'); ?>" class="d-block w-100" alt="<?php echo htmlspecialchars((string) $imageAlt, ENT_QUOTES, 'UTF-8'); ?>">
    <?php endif; ?>
    <?php echo $slot; ?>
    <?php if ($captionTitle !== '' || $captionText !== ''): ?>
        <div class="carousel-caption d-none d-md-block">
            <?php if ($captionTitle !== ''): ?>
                <h5><?php echo htmlspecialchars((string) $captionTitle, ENT_QUOTES, 'UTF-8'); ?></h5>
            <?php endif; ?>
            <?php if ($captionText !== ''): ?>
                <p><?php echo htmlspecialchars((string) $captionText, ENT_QUOTES, 'UTF-8'); ?></p>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</div>
