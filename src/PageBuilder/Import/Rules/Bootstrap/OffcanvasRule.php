<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Bootstrap;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;

final class OffcanvasRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return ClassHelper::hasPrefixedClass($el, 'offcanvas');
    }

    public function priority(): int { return 300; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $placement = '';
        $excludes  = ['offcanvas'];
        foreach (['offcanvas-start', 'offcanvas-end', 'offcanvas-top', 'offcanvas-bottom'] as $cls) {
            if (ClassHelper::hasClass($el, $cls)) {
                $placement  = str_replace('offcanvas-', '', $cls);
                $excludes[] = $cls;
                break;
            }
        }

        $title = '';
        foreach ($el->childNodes as $child) {
            if (!($child instanceof \DOMElement)) {
                continue;
            }
            if (str_contains($child->getAttribute('class'), 'offcanvas-header')) {
                foreach ($child->childNodes as $hEl) {
                    if ($hEl instanceof \DOMElement && in_array(strtolower($hEl->tagName), ['h1','h2','h3','h4','h5','h6'], true)) {
                        $title = trim($hEl->textContent);
                        break;
                    }
                }
            }
        }

        return [
            'type'     => strtolower($el->tagName),
            'name'     => 'offcanvas',
            'props'    => [
                'id'        => $el->getAttribute('id'),
                'title'     => $title,
                'placement' => $placement,
                'class'     => ClassHelper::extraClasses($el, $excludes),
            ],
            'consumes' => false,
            'children' => null,
            'warnings' => [],
            'ignored'  => false,
        ];
    }
}
