<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Generic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ImportWarning;

/**
 * Maps unclassified <div> elements to section nodes.
 * Engine will recurse into children.
 */
final class GenericDivRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'div';
    }

    public function priority(): int { return 100; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $class = $el->getAttribute('class');

        return [
            'type'     => 'section',
            'props'    => ['tag' => 'div', 'class' => $class],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
