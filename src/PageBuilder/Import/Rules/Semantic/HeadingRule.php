<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

final class HeadingRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return (bool) preg_match('/^h[1-6]$/', strtolower($el->tagName));
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $attrs        = AttrExtractor::all($el);
        $attrs['tag'] = strtolower($el->tagName);

        // If heading contains child elements (e.g. <span class="gradient">), recurse as node
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                return [
                    'type'     => 'node',
                    'props'    => $attrs,
                    'consumes' => false,
                    'children' => null,
                    'warnings' => [],
                    'ignored'  => false,
                ];
            }
        }

        $attrs['content'] = trim($el->textContent);
        return [
            'type'     => 'text',
            'props'    => $attrs,
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
