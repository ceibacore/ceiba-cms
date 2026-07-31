<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <p> into a p node.
 * If it contains child elements, recurses into them.
 * Otherwise captures the text content in props.content.
 */
final class ParagraphRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'p';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $attrs = AttrExtractor::all($el);

        // Check for child elements (inline formatting, links, etc.)
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                return [
                    'type'     => 'p',
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
            'type'     => 'p',
            'name'     => null,
            'props'    => $attrs,
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
