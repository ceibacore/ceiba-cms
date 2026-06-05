<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts h1–h6 into a node with type = real HTML tag, name = null.
 * If the heading contains child elements (e.g. <span class="gradient">),
 * it recurses into children. Otherwise captures the text content.
 */
final class HeadingRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return (bool) preg_match('/^h[1-6]$/', strtolower($el->tagName));
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag   = strtolower($el->tagName);
        $attrs = AttrExtractor::all($el);

        // If heading contains child elements (e.g. <span class="gradient">), recurse
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                return [
                    'type'     => $tag,
                    'name'     => null,
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
            'type'     => $tag,
            'name'     => null,
            'props'    => $attrs,
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
