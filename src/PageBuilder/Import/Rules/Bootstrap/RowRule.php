<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class RowRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasClass($el, 'row');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $gutter  = '';
        $align   = '';
        $justify = '';
        $excludes = ['row'];

        foreach (ClassHelper::classes($el) as $cls) {
            if (preg_match('/^g[xy]?-(\d+)$/', $cls, $m)) {
                $gutter     = $cls;
                $excludes[] = $cls;
            } elseif (preg_match('/^align-items-(\w+)$/', $cls, $m)) {
                $align      = $m[1];
                $excludes[] = $cls;
            } elseif (preg_match('/^justify-content-(\w+)$/', $cls, $m)) {
                $justify    = $m[1];
                $excludes[] = $cls;
            }
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'row',
            'props'    => [
                'gutter'  => $gutter,
                'align'   => $align,
                'justify' => $justify,
                'class'   => ClassHelper::extraClasses($el, $excludes),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
