<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class ButtonGroupRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasAnyClass($el, 'btn-group', 'btn-group-vertical');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $vertical = ClassHelper::hasClass($el, 'btn-group-vertical');
        $size     = '';
        $excludes = ['btn-group', 'btn-group-vertical'];

        foreach (ClassHelper::classes($el) as $cls) {
            if (preg_match('/^btn-group-(sm|lg)$/', $cls, $m)) {
                $size       = $m[1];
                $excludes[] = $cls;
            }
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'button-group',
            'props'    => [
                'vertical' => $vertical,
                'size'     => $size,
                'class'    => ClassHelper::extraClasses($el, $excludes),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
