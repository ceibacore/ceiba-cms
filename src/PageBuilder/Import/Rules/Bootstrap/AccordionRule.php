<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Converts .accordion into accordion node with accordion_item children.
 */
final class AccordionRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'accordion');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $id          = $el->getAttribute('id') ?: UuidHelper::v4();
        $flush       = ClassHelper::hasClass($el, 'accordion-flush');
        $alwaysOpen  = $el->hasAttribute('data-bs-parent') === false && ClassHelper::hasClass($el, 'accordion');
        $children    = [];

        // Walk .accordion-item children
        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            if (!ClassHelper::hasClass($child, 'accordion-item')) {
                continue;
            }

            $title   = '';
            $content = '';
            $open    = false;

            foreach ($child->childNodes as $part) {
                if (!($part instanceof \DOMElement)) {
                    continue;
                }
                $partCls = $part->getAttribute('class');
                if (str_contains($partCls, 'accordion-header')) {
                    $title = trim($part->textContent);
                } elseif (str_contains($partCls, 'accordion-collapse')) {
                    $open    = ClassHelper::hasClass($part, 'show');
                    $content = '';
                    foreach ($part->childNodes as $body) {
                        if ($body instanceof \DOMElement && str_contains($body->getAttribute('class'), 'accordion-body')) {
                            $content = trim($body->textContent);
                        }
                    }
                }
            }

            $children[] = [
                'id'       => UuidHelper::v4(),
                'type'     => 'accordion_item',
                'props'    => ['title' => $title, 'content' => $content, 'open' => $open],
                'loop'     => null,
                'children' => [],
            ];
        }

        return [
            'type'     => 'accordion',
            'props'    => [
                'id'          => $id,
                'flush'       => $flush,
                'always_open' => $alwaysOpen,
                'class'       => ClassHelper::extraClasses($el, ['accordion', 'accordion-flush']),
            ],
            'consumes' => true,
            'children' => $children,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
