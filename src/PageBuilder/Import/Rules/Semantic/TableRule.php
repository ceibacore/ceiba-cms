<?php

declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Maps standard HTML table tags to the PageBuilder.
 * Supports table, thead, tbody, tfoot, tr, th, td.
 */
final class TableRule implements RuleInterface
{
    private const SUPPORTED_TAGS = ['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'];

    public function matches(\DOMElement $el): bool
    {
        return in_array(strtolower($el->tagName), self::SUPPORTED_TAGS, true);
    }

    public function priority(): int
    {
        return 200;
    }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag   = strtolower($el->tagName);
        $attrs = AttrExtractor::all($el);

        $baseClass     = 'pb-semantic-' . $tag;
        $attrs['class'] = isset($attrs['class']) && $attrs['class'] !== ''
            ? $baseClass . ' ' . $attrs['class']
            : $baseClass;

        $attrs['tag'] = $tag;

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
