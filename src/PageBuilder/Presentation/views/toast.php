<?php
$id = $props['id'] ?? 'toast_' . uniqid();
$title = $props['title'] ?? 'Notificación';
$message = $props['message'] ?? '';
$time = $props['time'] ?? 'justo ahora';
$variant = $props['variant'] ?? 'primary';
$autohide = $props['autohide'] ?? true;
$class = $props['class'] ?? '';

$toastClasses = ['toast'];
if ($class !== '') {
    $toastClasses[] = $class;
}

$classAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $toastClasses));
$autohideAttr = $autohide ? 'true' : 'false';

?>
<div id="<?php echo htmlspecialchars((string) $id, ENT_QUOTES, 'UTF-8'); ?>" class="<?php echo $classAttr; ?>" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="<?php echo $autohideAttr; ?>">
    <div class="toast-header text-bg-<?php echo htmlspecialchars((string) $variant, ENT_QUOTES, 'UTF-8'); ?>">
        <strong class="me-auto"><?php echo htmlspecialchars((string) $title, ENT_QUOTES, 'UTF-8'); ?></strong>
        <small><?php echo htmlspecialchars((string) $time, ENT_QUOTES, 'UTF-8'); ?></small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
        <?php echo htmlspecialchars((string) $message, ENT_QUOTES, 'UTF-8'); ?>
        <?php echo $slot; ?>
    </div>
</div>
