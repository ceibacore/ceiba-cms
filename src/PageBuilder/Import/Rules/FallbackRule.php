<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ImportWarning;

/**
 * Last-resort rule. Always matches.
 * Produces a node with type = real HTML tag and name = null.
 * For complex/unknown elements, preserves the raw HTML in props._raw_html.
 */
final class FallbackRule implements RuleInterface
{
    private const IGNORED_TAGS = ['script', 'style', 'meta', 'link', 'head', 'noscript', 'title'];

    private const WARNED_TAGS = [
        'video'  => ['Videos no tienen tipo nativo. Preservado como HTML.',             'Considera un componente de embed externo.'],
        'audio'  => ['Audio no tiene tipo nativo. Preservado como HTML.',               'Agrega el audio como nodo HTML.'],
        'iframe' => ['iframes no tienen tipo nativo. Preservado como HTML.',             'Revisa el contenido del iframe manualmente.'],
        'table'  => ['Tablas preservadas como HTML en esta versión.',                 'Candidato para componente nativo en v2.'],
        'svg'    => ['SVG preservado como HTML.',                                       'Considera usar <img> con el SVG como archivo externo.'],
        'canvas' => ['<canvas> preservado como HTML.',                                  'No hay tipo nativo para canvas.'],
    ];

    public function matches(\DOMElement $el): bool
    {
        return true;
    }

    public function priority(): int
    {
        return 0;
    }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $tag      = strtolower($el->tagName);
        $warnings = [];

        // Silently ignored tags
        if (in_array($tag, self::IGNORED_TAGS, true)) {
            if (in_array($tag, ['script', 'style'], true)) {
                $warnings[] = new ImportWarning(
                    element:    "<{$tag}>",
                    reason:     ucfirst($tag) . ' ignorado por seguridad.',
                    severity:   'info',
                    suggestion: '',
                );
            }
            return ['type' => $tag, 'name' => null, 'props' => [], 'consumes' => true, 'children' => [], 'warnings' => $warnings, 'ignored' => true];
        }

        // Tags with specific warnings
        if (isset(self::WARNED_TAGS[$tag])) {
            [$reason, $suggestion] = self::WARNED_TAGS[$tag];
            $warnings[] = new ImportWarning(
                element:    "<{$tag}>",
                reason:     $reason,
                severity:   'warning',
                suggestion: $suggestion,
            );
        }

        return [
            'type'     => $tag,
            'name'     => null,
            'props'    => [
                'class'     => $el->getAttribute('class') ?: null,
                '_raw_html' => $el->ownerDocument->saveHTML($el),
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => $warnings,
            'ignored'  => false,
        ];
    }
}
