<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts <a> (not .btn) into an inline text/span node.
 */
final class AnchorRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'a'
            && !ClassHelper::hasClass($el, 'btn');
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        return [
            'type'     => 'text',
            'props'    => [
                'tag'     => 'span',
                'content' => trim($el->textContent),
                'href'    => $el->getAttribute('href') ?: null,
                'target'  => $el->getAttribute('target') ?: null,
                'class'   => $el->getAttribute('class'),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
