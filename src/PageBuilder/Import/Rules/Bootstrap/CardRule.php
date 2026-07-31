<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Converts .card into a card node.
 * Consumes children: extracts card-img-top, card-body (title, subtitle, text),
 * card-footer into props. Any other elements inside card-body become PB children.
 */
final class CardRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'card')
            && !ClassHelper::hasClass($el, 'accordion')
            && !ClassHelper::hasClass($el, 'list-group');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $props    = ['class' => ClassHelper::extraClasses($el, ['card'])];
        $children = [];

        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            $cls = $child->getAttribute('class');

            if (str_contains($cls, 'card-img-top') || str_contains($cls, 'card-img-bottom') || $child->tagName === 'img') {
                $props['image_src'] = $child->getAttribute('src');
                $props['image_alt'] = $child->getAttribute('alt');

            } elseif (str_contains($cls, 'card-header')) {
                $props['header'] = trim($child->textContent);

            } elseif (str_contains($cls, 'card-body')) {
                foreach ($child->childNodes as $bodyEl) {
                    if (!($bodyEl instanceof \DOMElement)) {
                        continue;
                    }
                    $bCls = $bodyEl->getAttribute('class');
                    if (str_contains($bCls, 'card-title')) {
                        $props['title'] = trim($bodyEl->textContent);
                    } elseif (str_contains($bCls, 'card-subtitle')) {
                        $props['subtitle'] = trim($bodyEl->textContent);
                    } elseif (str_contains($bCls, 'card-text')) {
                        $props['text'] = trim($bodyEl->textContent);
                    } else {
                        // Recurse anything else (e.g. buttons, links)
                        $node = $recurse($bodyEl);
                        if ($node !== null) {
                            $children[] = $node;
                        }
                    }
                }

            } elseif (str_contains($cls, 'card-footer')) {
                $props['footer'] = trim($child->textContent);
            }
        }

        return [
            'type'     => 'div',
            'name'     => 'card',
            'props'    => $props,
            'consumes' => true,
            'children' => $children,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
