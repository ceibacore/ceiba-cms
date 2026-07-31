<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

/**
 * Converts .toast into a toast node.
 * Skips .toast-container (wrapper only).
 */
final class ToastRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'toast')
            && !ClassHelper::hasClass($el, 'toast-container');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $title   = '';
        $body    = '';
        $variant = '';

        // bg-* variant
        foreach (ClassHelper::classes($el) as $cls) {
            if (str_starts_with($cls, 'bg-')) {
                $variant = substr($cls, 3);
                break;
            }
        }

        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            $cls = $child->getAttribute('class');
            if (str_contains($cls, 'toast-header')) {
                foreach ($child->childNodes as $hEl) {
                    if ($hEl instanceof \DOMElement && in_array(strtolower($hEl->tagName), ['strong', 'span'], true)) {
                        $title = trim($hEl->textContent);
                        break;
                    }
                }
            } elseif (str_contains($cls, 'toast-body')) {
                $body = trim($child->textContent);
            }
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'toast',
            'props'    => [
                'id'      => $el->getAttribute('id'),
                'title'   => $title,
                'body'    => $body,
                'variant' => $variant,
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
