<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Generic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

final class SpanRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'span';
    }

    public function priority(): int { return 100; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        return [
            'type'     => 'text',
            'props'    => [
                'tag'     => 'span',
                'content' => trim($el->textContent),
                'class'   => $el->getAttribute('class'),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
