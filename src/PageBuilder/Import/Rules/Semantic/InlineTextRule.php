<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Maps inline/phrasing content elements to text or tooltip nodes.
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
        $tag     = strtolower($el->tagName);
        $content = trim($el->textContent);
        $class   = $el->getAttribute('class');

        switch ($tag) {
            case 'abbr':
                return [
                    'type'     => 'tooltip',
                    'props'    => [
                        'text'          => $el->getAttribute('title'),
                        'trigger_label' => $content,
                        'placement'     => 'top',
                    ],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'blockquote':
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'p', 'content' => $content, 'class' => trim('blockquote ' . $class)],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'cite':
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'span', 'content' => $content, 'class' => trim('blockquote-footer ' . $class)],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'strong':
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'span', 'content' => $content, 'class' => trim('fw-bold ' . $class)],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'em':
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'span', 'content' => $content, 'class' => trim('fst-italic ' . $class)],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'mark':
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'span', 'content' => $content, 'class' => trim('mark ' . $class)],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            case 'time':
                $datetime = $el->getAttribute('datetime');
                $display  = $datetime ? "{$content} ({$datetime})" : $content;
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => 'span', 'content' => $display, 'class' => $class],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];

            default:
                // kbd, samp, var, dfn, q, ins, del, s, u, sub, sup, small
                return [
                    'type'     => 'text',
                    'props'    => ['tag' => $tag, 'content' => $content, 'class' => $class],
                    'consumes' => true,
                    'children' => [],
                    'warnings' => [],
                    'ignored'  => false,
                ];
        }
    }
}
