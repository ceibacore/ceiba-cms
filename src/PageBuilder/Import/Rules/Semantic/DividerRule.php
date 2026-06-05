<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class DividerRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'hr';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $spacing = '';
        foreach (ClassHelper::classes($el) as $cls) {
            if (preg_match('/^my-(\d+)$/', $cls, $m)) {
                $spacing = $m[1];
                break;
            }
        }

        return [
            'type'     => 'hr',
            'name'     => 'divider',
            'props'    => [
                'class'   => $el->getAttribute('class'),
                'spacing' => $spacing,
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
