<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class ColRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        foreach (ClassHelper::classes($el) as $cls) {
            if ($cls === 'col' || preg_match('/^col(-(?:xs|sm|md|lg|xl|xxl))?(-\d+)?$/', $cls)) {
                return true;
            }
        }
        return false;
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $bp       = ClassHelper::colBreakpoints($el);
        $excludes = [];

        foreach (ClassHelper::classes($el) as $cls) {
            if ($cls === 'col' || preg_match('/^col(-(?:xs|sm|md|lg|xl|xxl))?(-\d+|-auto)?$/', $cls)) {
                $excludes[] = $cls;
            }
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'col',
            'props'    => array_merge($bp, ['class' => ClassHelper::extraClasses($el, $excludes)]),
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
