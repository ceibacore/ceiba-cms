<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Import\Rules\Semantic;

use CeibaCms\PageBuilder\Import\AttrExtractor;
use CeibaCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <form> into a form node with children parsed recursively.
 * Preserves all attributes on the form element.
 */
final class FormRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'form';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $attrs = AttrExtractor::all($el);

        return [
            'type'     => 'form',
            'name'     => null,
            'props'    => $attrs,
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
