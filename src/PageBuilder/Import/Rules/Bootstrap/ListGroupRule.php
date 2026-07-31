<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts .list-group into a list_group node.
 * Extracts list items from .list-group-item children.
 */
final class ListGroupRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'list-group');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $items = [];
        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            if (!ClassHelper::hasClass($child, 'list-group-item')) {
                continue;
            }
            $items[] = [
                'label'  => trim($child->textContent),
                'href'   => $child->getAttribute('href') ?: null,
                'active' => ClassHelper::hasClass($child, 'active'),
            ];
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'list-group',
            'props'    => [
                'items' => $items,
                'class' => ClassHelper::extraClasses($el, ['list-group']),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
