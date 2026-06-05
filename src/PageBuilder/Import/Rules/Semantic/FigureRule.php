<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <figure>:
 *  - If has <img> → image node with optional caption
 *  - Otherwise   → section node (container)
 */
final class FigureRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'figure';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $imgSrc  = null;
        $imgAlt  = '';
        $caption = '';

        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            $tag = strtolower($child->tagName);
            if ($tag === 'img') {
                $imgSrc = $child->getAttribute('src');
                $imgAlt = $child->getAttribute('alt');
            } elseif ($tag === 'figcaption') {
                $caption = trim($child->textContent);
            }
        }

        if ($imgSrc !== null) {
            return [
                'type'     => 'img',
                'name'     => null,
                'props'    => ['src' => $imgSrc, 'alt' => $imgAlt, 'fluid' => true, 'caption' => $caption],
                'consumes' => true,
                'children' => [],
                'warnings' => [],
                'ignored'  => false,
            ];
        }

        // No image — treat as figure container
        return [
            'type'     => 'figure',
            'name'     => null,
            'props'    => [
                'class' => 'pb-semantic-figure ' . trim($el->getAttribute('class')),
                'role'  => '',
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
