<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class CollapseRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'collapse')
            && !ClassHelper::hasClass($el, 'accordion-collapse')
            && !ClassHelper::hasClass($el, 'navbar-collapse');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'collapse',
            'props'    => [
                'id'    => $el->getAttribute('id'),
                'open'  => !ClassHelper::hasClass($el, 'd-none'),
                'class' => ClassHelper::extraClasses($el, ['collapse', 'show']),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
