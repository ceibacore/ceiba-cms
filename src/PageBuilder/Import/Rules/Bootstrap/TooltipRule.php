<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts any element with data-bs-toggle="tooltip" into a tooltip node.
 */
final class TooltipRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return $el->getAttribute('data-bs-toggle') === 'tooltip';
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $text      = $el->getAttribute('data-bs-title') ?: $el->getAttribute('title');
        $placement = $el->getAttribute('data-bs-placement') ?: 'top';

        return [
            'type'     => 'tooltip',
            'props'    => [
                'text'          => $text,
                'placement'     => $placement,
                'trigger_label' => trim($el->textContent),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
