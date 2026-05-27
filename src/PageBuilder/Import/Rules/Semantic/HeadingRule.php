<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class HeadingRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return (bool) preg_match('/^h[1-6]$/', strtolower($el->tagName));
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        return [
            'type'     => 'text',
            'props'    => [
                'tag'     => strtolower($el->tagName),
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
