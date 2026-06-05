<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts <a> (not .btn) into an anchor node preserving ALL attributes.
 * - With child elements: recurses into children.
 * - Text-only anchor: captures text content in props.content.
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
        $attrs = AttrExtractor::all($el);

        // Check for child DOMElement nodes
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                return [
                    'type'     => 'a',
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
            'type'     => 'a',
            'name'     => null,
            'props'    => $attrs,
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
