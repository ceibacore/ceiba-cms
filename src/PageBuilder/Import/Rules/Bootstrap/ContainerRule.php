<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class ContainerRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasAnyClass($el, 'container', 'container-fluid')
            || ClassHelper::hasPrefixedClass($el, 'container-');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $fluid      = ClassHelper::hasClass($el, 'container-fluid');
        $excludes   = ['container', 'container-fluid'];

        foreach (ClassHelper::classes($el) as $cls) {
            if (preg_match('/^container-(sm|md|lg|xl|xxl)$/', $cls)) {
                $excludes[] = $cls;
            }
        }

        return [
            'type'     => 'container',
            'props'    => ['fluid' => $fluid, 'class' => ClassHelper::extraClasses($el, $excludes)],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
