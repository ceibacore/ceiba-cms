<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Generic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Maps <div> elements to a 'section' node type, preserving ALL attributes.
 * Recurses into children.
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
        $attrs        = AttrExtractor::all($el);

        return [
            'type'     => 'div',
            'name'     => null,
            'props'    => $attrs,
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
