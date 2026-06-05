<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts <a> (not .btn) into a node or text node preserving ALL attributes.
 * - With child elements: type 'node', tag 'a', recurses into children.
 * - Text-only anchor: type 'text', tag 'a', content = textContent.
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
        $attrs        = AttrExtractor::all($el);
        $attrs['tag'] = 'a';

        // Check for child DOMElement nodes
        $hasChildren = false;
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                $hasChildren = true;
                break;
            }
        }

        if ($hasChildren) {
            return [
                'type'     => 'node',
                'props'    => $attrs,
                'consumes' => false,
                'children' => null,
                'warnings' => [],
                'ignored'  => false,
            ];
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
