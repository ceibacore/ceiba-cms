<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Import\Rules\Generic;

use CeibaCms\PageBuilder\Import\AttrExtractor;
use CeibaCms\PageBuilder\Import\Contract\RuleInterface;

final class SpanRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'span';
    }

    public function priority(): int { return 100; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $attrs            = AttrExtractor::all($el);
        $attrs['content'] = trim($el->textContent);

        return [
            'type'     => 'span',
            'name'     => null,
            'props'    => $attrs,
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
