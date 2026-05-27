<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

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
        // Check for child elements (inline markup like <strong>, <a>, etc.)
        $hasChildElements = false;
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement) {
                $hasChildElements = true;
                break;
            }
        }

        if ($hasChildElements) {
            // Preserve rich markup
            return [
                'type'     => 'html',
                'props'    => ['content' => $el->ownerDocument->saveHTML($el)],
                'consumes' => true,
                'children' => [],
                'warnings' => [],
                'ignored'  => false,
            ];
        }

        return [
            'type'     => 'text',
            'props'    => [
                'tag'     => 'p',
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
