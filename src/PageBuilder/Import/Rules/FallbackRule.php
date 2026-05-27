<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ImportWarning;

/**
 * Last-resort rule. Always matches. Converts anything unrecognised to html node.
 */
final class FallbackRule implements RuleInterface
{
    private const IGNORED_TAGS = ['script', 'style', 'meta', 'link', 'head', 'noscript', 'title'];

    private const WARNED_TAGS = [
        'video'  => ['Videos no tienen tipo nativo. Convertido a HTML.',             'Considera un componente de embed externo.'],
        'audio'  => ['Audio no tiene tipo nativo. Convertido a HTML.',               'Agrega el audio como nodo HTML.'],
        'iframe' => ['iframes no tienen tipo nativo. Convertido a HTML.',             'Revisa el contenido del iframe manualmente.'],
        'table'  => ['Tablas no tienen tipo nativo en esta versión.',                 'Usa nodo HTML para tablas. Candidato para v2.'],
        'form'   => ['Formularios requieren nodo HTML.',                              'Los campos de formulario se preservan como HTML.'],
        'svg'    => ['SVG preservado como HTML.',                                    'Considera usar <img> con el SVG como archivo externo.'],
        'canvas' => ['<canvas> preservado como HTML.',                               'No hay tipo nativo para canvas.'],
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
            return ['type' => '', 'props' => [], 'consumes' => true, 'children' => [], 'warnings' => $warnings, 'ignored' => true];
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
        } elseif (!empty($el->getAttribute('class'))) {
            $cls = $el->getAttribute('class');
            $warnings[] = new ImportWarning(
                element:    '<' . $tag . ' class="' . $cls . '">',
                reason:     "Elemento <{$tag}> con clase no reconocida. Convertido a bloque HTML.",
                severity:   'warning',
                suggestion: 'Revisar en el editor o crear una Rule personalizada.',
            );
        }

        return [
            'type'     => 'html',
            'props'    => ['content' => $el->ownerDocument->saveHTML($el)],
            'consumes' => true,
            'children' => [],
            'warnings' => $warnings,
            'ignored'  => false,
        ];
    }
}
