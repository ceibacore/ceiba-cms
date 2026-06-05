<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Maps HTML5 semantic block elements to PB 'section' type.
 */
final class SemanticSectionRule implements RuleInterface
{
    private const SEMANTIC_TAGS = ['header', 'footer', 'nav', 'main', 'aside', 'section', 'article'];

    private const ARIA_ROLES = [
        'header'  => 'banner',
        'footer'  => 'contentinfo',
        'nav'     => 'navigation',
        'main'    => 'main',
        'aside'   => 'complementary',
        'section' => '',
        'article' => '',
    ];

    public function matches(\DOMElement $el): bool
    {
        return in_array(strtolower($el->tagName), self::SEMANTIC_TAGS, true);
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag        = strtolower($el->tagName);
        $role       = self::ARIA_ROLES[$tag] ?? '';
        $baseClass  = 'pb-semantic-' . $tag;
        $origClass  = $el->getAttribute('class');
        $finalClass = $origClass ? $baseClass . ' ' . $origClass : $baseClass;

        return [
            'type'     => 'section',
            'props'    => [
                'tag'   => $tag,
                'class' => $finalClass,
                'role'  => $role,
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
