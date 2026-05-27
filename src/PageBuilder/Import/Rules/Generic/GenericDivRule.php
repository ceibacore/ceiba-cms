<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Generic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ImportWarning;

/**
 * Maps unclassified <div> elements to section nodes.
 * Engine will recurse into children.
 */
final class GenericDivRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'div';
    }

    public function priority(): int { return 100; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $class    = $el->getAttribute('class');
        $warnings = [];

        if ($class !== '') {
            $warnings[] = new ImportWarning(
                element:    '<div class="' . $class . '">',
                reason:     'Clase de div no reconocida. Mapeado a sección genérica.',
                severity:   'info',
                suggestion: 'Verifica si corresponde a un componente Bootstrap conocido.',
            );
        }

        return [
            'type'     => 'section',
            'props'    => ['class' => $class],
            'consumes' => false,
            'children' => null,
            'warnings' => $warnings,
            'ignored'  => false,
        ];
    }
}
