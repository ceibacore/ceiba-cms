<?php
$itemId = 'item_' . uniqid();
$headId = 'head_' . $itemId;
$title = $props['title'] ?? 'Ítem';
$open = $props['open'] ?? false;
$class = $props['class'] ?? '';
$parentId = $props['_parent_id'] ?? null;
$alwaysOpen = $props['always_open'] ?? false;

$parentAttr = '';
if (!$alwaysOpen && !empty($parentId)) {
    $parentAttr = ' data-bs-parent="#' . htmlspecialchars((string) $parentId, ENT_QUOTES, 'UTF-8') . '"';
}

$itemClasses = ['accordion-item'];
if ($class !== '') {
    $itemClasses[] = $class;
}
$itemClassAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $itemClasses));
?>
<div class="<?php echo $itemClassAttr; ?>">
    <h2 class="accordion-header" id="<?php echo htmlspecialchars((string) $headId, ENT_QUOTES, 'UTF-8'); ?>">
        <button class="accordion-button<?php echo $open ? '' : ' collapsed'; ?>"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#<?php echo htmlspecialchars((string) $itemId, ENT_QUOTES, 'UTF-8'); ?>"
                aria-expanded="<?php echo $open ? 'true' : 'false'; ?>"
                aria-controls="<?php echo htmlspecialchars((string) $itemId, ENT_QUOTES, 'UTF-8'); ?>">
            <?php echo htmlspecialchars((string) $title, ENT_QUOTES, 'UTF-8'); ?>
        </button>
    </h2>
    <div id="<?php echo htmlspecialchars((string) $itemId, ENT_QUOTES, 'UTF-8'); ?>"
         class="accordion-collapse collapse<?php echo $open ? ' show' : ''; ?>"
         aria-labelledby="<?php echo htmlspecialchars((string) $headId, ENT_QUOTES, 'UTF-8'); ?>"<?php echo $parentAttr; ?>>
        <div class="accordion-body">
            <?php echo $slot; ?>
        </div>
    </div>
</div>
