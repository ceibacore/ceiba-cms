<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\AttrExtractor;
use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Maps HTML5 semantic block elements to PB 'node' type.
 * Preserves ALL original attributes. Adds pb-semantic-{tag} class prefix for PageBuilder identification.
 */
final class SemanticSectionRule implements RuleInterface
{
    private const SEMANTIC_TAGS = ['header', 'footer', 'nav', 'main', 'aside', 'section', 'article'];

    private const IMPLICIT_ROLES = [
        'header'  => 'banner',
        'footer'  => 'contentinfo',
        'nav'     => 'navigation',
        'main'    => 'main',
        'aside'   => 'complementary',
    ];

    public function matches(\DOMElement $el): bool
    {
        return in_array(strtolower($el->tagName), self::SEMANTIC_TAGS, true);
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag   = strtolower($el->tagName);
        $attrs = AttrExtractor::all($el);

        // Add pb-semantic prefix so PageBuilder can identify semantic regions
        $baseClass     = 'pb-semantic-' . $tag;
        $attrs['class'] = isset($attrs['class']) && $attrs['class'] !== ''
            ? $baseClass . ' ' . $attrs['class']
            : $baseClass;

        // Set implicit ARIA role if the HTML didn't specify one
        if (!isset($attrs['role']) || $attrs['role'] === '') {
            $implicit = self::IMPLICIT_ROLES[$tag] ?? '';
            if ($implicit !== '') {
                $attrs['role'] = $implicit;
            }
        }

        $attrs['tag'] = $tag; // system key — tells the view which HTML tag to emit

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
