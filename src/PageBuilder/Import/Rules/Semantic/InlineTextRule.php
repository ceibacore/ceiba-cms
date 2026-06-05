<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Maps inline/phrasing content elements to text nodes.
 * Agnostic: keeps original tag and ALL attributes without framework-specific additions.
 */
final class InlineTextRule implements RuleInterface
{
    private const MATCHED_TAGS = [
        'mark', 'time', 'small', 'strong', 'em', 'blockquote',
        'cite', 'abbr', 'q', 'kbd', 'samp', 'var', 'dfn',
        'ins', 'del', 's', 'u', 'sub', 'sup',
    ];

    public function matches(\DOMElement $el): bool
    {
        return in_array(strtolower($el->tagName), self::MATCHED_TAGS, true);
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag   = strtolower($el->tagName);
        $attrs = AttrExtractor::all($el);

        if ($tag === 'abbr') {
            // <abbr title="..."> → abbr element with tooltip semantics
            return [
                'type'     => 'abbr',
                'name'     => 'tooltip',
                'props'    => [
                    'text'          => $attrs['title'] ?? '',
                    'trigger_label' => trim($el->textContent),
                    'placement'     => 'top',
                    'class'         => $attrs['class'] ?? '',
                ],
                'consumes' => true,
                'children' => [],
                'warnings' => [],
                'ignored'  => false,
            ];
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
