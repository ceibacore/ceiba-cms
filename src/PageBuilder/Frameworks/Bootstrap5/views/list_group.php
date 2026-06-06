<?php
$flush = $props['flush'] ?? false;
$horizontal = $props['horizontal'] ?? '';
$numbered = $props['numbered'] ?? false;
$asLink = $props['item_as_link'] ?? false;
$class = $props['class'] ?? '';
$items = $props['items'] ?? [];

$tag = $numbered ? 'ol' : 'ul';

$groupClasses = ['list-group'];
if ($flush) {
    $groupClasses[] = 'list-group-flush';
}
if ($horizontal !== '') {
    $groupClasses[] = 'list-group-' . $horizontal;
}
if ($numbered) {
    $groupClasses[] = 'list-group-numbered';
}
if ($class !== '') {
    $groupClasses[] = $class;
}

$groupClassAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $groupClasses));
?>
<<?php echo $tag; ?> class="<?php echo $groupClassAttr; ?>">
    <?php foreach ($items as $item): ?>
        <?php
        $itemClassList = ['list-group-item'];
        if ($asLink) {
            $itemClassList[] = 'list-group-item-action';
        }
        if (!empty($item['variant'])) {
            $itemClassList[] = 'list-group-item-' . $item['variant'];
        }
        if (!empty($item['active'])) {
            $itemClassList[] = 'active';
        }
        if (!empty($item['disabled'])) {
            $itemClassList[] = 'disabled';
        }

        $itemClassAttr = implode(' ', array_map(fn($c) => htmlspecialchars((string) $c, ENT_QUOTES, 'UTF-8'), $itemClassList));
        $itemTag = ($asLink && !empty($item['href'])) ? 'a' : 'li';
        
        $hrefAttr = '';
        if ($itemTag === 'a') {
            $hrefAttr = ' href="' . htmlspecialchars((string) ($item['href'] ?? '#'), ENT_QUOTES, 'UTF-8') . '"';
        }

        $activeAttr = !empty($item['active']) ? ' aria-current="true"' : '';
        $disabledAttr = (!empty($item['disabled']) && $itemTag === 'a') ? ' aria-disabled="true" tabindex="-1"' : '';
        ?>
        <<?php echo $itemTag; ?> class="<?php echo $itemClassAttr; ?> d-flex justify-content-between align-items-center"<?php echo $hrefAttr; ?><?php echo $activeAttr; ?><?php echo $disabledAttr; ?>>
            <?php echo htmlspecialchars((string) ($item['label'] ?? ''), ENT_QUOTES, 'UTF-8'); ?>
            <?php if (!empty($item['badge'])): ?>
                <span class="badge bg-<?php echo htmlspecialchars((string) ($item['badge_variant'] ?? 'primary'), ENT_QUOTES, 'UTF-8'); ?> rounded-pill">
                    <?php echo htmlspecialchars((string) $item['badge'], ENT_QUOTES, 'UTF-8'); ?>
                </span>
            <?php endif; ?>
        </<?php echo $itemTag; ?>>
    <?php endforeach; ?>
</<?php echo $tag; ?>>
