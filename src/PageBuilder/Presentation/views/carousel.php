<?php
$id = $props['id'] ?? 'carousel_' . uniqid();
$controls = $props['controls'] ?? true;
$indicators = $props['indicators'] ?? false;
$autoplay = $props['autoplay'] ?? true;
$interval = $props['interval'] ?? 5000;
$fade = $props['fade'] ?? false;
$dark = $props['dark'] ?? false;
$class = $props['class'] ?? '';

$carouselClasses = ['carousel', 'slide'];
if ($fade) {
    $carouselClasses[] = 'carousel-fade';
}
if ($dark) {
    $carouselClasses[] = 'carousel-dark';
}
if ($class !== '') {
    $carouselClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $carouselClasses));
$autoplayAttr = $autoplay ? ' data-bs-ride="carousel"' : '';
$intervalAttr = ' data-bs-interval="' . htmlspecialchars((string) $interval, ENT_QUOTES, 'UTF-8') . '"';

?>
<div id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $classAttr; ?>"<?php echo $autoplayAttr; ?><?php echo $intervalAttr; ?>>
    <?php if ($indicators): ?>
        <!-- Indicators could be dynamically generated here or left for JS depending on BS5 usage -->
    <?php endif; ?>

    <div class="carousel-inner">
        <?php echo $slot; ?>
    </div>

    <?php if ($controls): ?>
        <button class="carousel-control-prev" type="button" data-bs-target="#<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
        </button>
    <?php endif; ?>
</div>
