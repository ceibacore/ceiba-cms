<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <picture> → image node (uses the inner <img> src).
 */
final class PictureRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'picture';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $src = '';
        $alt = '';
        foreach ($el->getElementsByTagName('img') as $img) {
            $src = $img->getAttribute('src');
            $alt = $img->getAttribute('alt');
            break;
        }

        return [
            'type'     => 'img',
            'name'     => null,
            'props'    => ['src' => $src, 'alt' => $alt, 'fluid' => true],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
