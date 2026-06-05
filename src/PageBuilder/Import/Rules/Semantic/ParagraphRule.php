<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <p> into text node (plain) or html node (if it contains child elements).
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
        $hasChildElements = false;
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                $hasChildElements = true;
                break;
            }
        }

        if ($hasChildElements) {
            return [
                'type'     => 'html',
                'props'    => ['content' => $el->ownerDocument->saveHTML($el)],
                'consumes' => true,
                'children' => [],
                'warnings' => [],
                'ignored'  => false,
            ];
        }

        $attrs            = AttrExtractor::all($el);
        $attrs['tag']     = 'p';
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
