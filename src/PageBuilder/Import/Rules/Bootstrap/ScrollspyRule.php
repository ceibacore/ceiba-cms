<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class ScrollspyRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return $el->getAttribute('data-bs-spy') === 'scroll';
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $rawTarget = $el->getAttribute('data-bs-target');
        $navTarget = ltrim($rawTarget, '#');

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'scrollspy',
            'props'    => [
                'id'            => $el->getAttribute('id'),
                'nav_target_id' => $navTarget,
                'offset'        => $el->getAttribute('data-bs-offset') ?: null,
                'class'         => ClassHelper::extraClasses($el, []),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
