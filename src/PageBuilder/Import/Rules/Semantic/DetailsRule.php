<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;

/**
 * Converts <details> into a collapse node.
 * <summary> becomes the trigger_label.
 */
final class DetailsRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'details';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $label = '';
        foreach ($el->childNodes as $child) {
            if ($child instanceof \DOMElement && strtolower($child->tagName) === 'summary') {
                $label = trim($child->textContent);
                break;
            }
        }

        return [
            'type'     => 'details',
            'name'     => 'collapse',
            'props'    => [
                'trigger_label' => $label,
                'open'          => $el->hasAttribute('open'),
                'class'         => $el->getAttribute('class'),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
