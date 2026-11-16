<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Import\Rules\Semantic;

use CeibaCms\PageBuilder\Import\Contract\RuleInterface;
use CeibaCms\PageBuilder\Import\ClassHelper;

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
