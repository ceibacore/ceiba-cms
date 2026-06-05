<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts .breadcrumb (ol/ul) into a breadcrumb node.
 */
final class BreadcrumbRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'breadcrumb');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $items = [];
        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            if (!ClassHelper::hasAnyClass($child, 'breadcrumb-item')) {
                continue;
            }
            $href   = null;
            $label  = trim($child->textContent);
            $active = ClassHelper::hasClass($child, 'active');

            // Find anchor for href
            foreach ($child->childNodes as $inner) {
                if ($inner instanceof \DOMElement && $inner->tagName === 'a') {
                    $href  = $inner->getAttribute('href');
                    $label = trim($inner->textContent);
                    break;
                }
            }

            $items[] = ['label' => $label, 'href' => $href, 'active' => $active];
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'breadcrumb',
            'props'    => [
                'items' => $items,
                'class' => ClassHelper::extraClasses($el, ['breadcrumb']),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
