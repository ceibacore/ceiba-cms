<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class ButtonRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'btn')
            && in_array(strtolower($el->tagName), ['a', 'button', 'input'], true);
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag   = strtolower($el->tagName);
        $label = $tag === 'input' ? $el->getAttribute('value') : trim($el->textContent);

        $excludes = ['btn', 'btn-sm', 'btn-lg', 'btn-block'];
        $variant  = ClassHelper::btnVariant($el);
        // Remove the variant class too
        $excludes[] = 'btn-' . $variant;
        if (str_starts_with($variant, 'outline-')) {
            $excludes[] = 'btn-' . $variant;
        }

        return [
            'type'     => $tag,
            'name'     => 'button',
            'props'    => [
                'label'   => $label,
                'href'    => $el->getAttribute('href') ?: null,
                'variant' => $variant,
                'size'    => ClassHelper::btnSize($el),
                'target'  => $el->getAttribute('target') ?: null,
                'class'   => ClassHelper::extraClasses($el, $excludes),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
