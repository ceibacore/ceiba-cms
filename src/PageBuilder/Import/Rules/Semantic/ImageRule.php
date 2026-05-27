<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Import\Rules\Semantic;

use LemurCms\PageBuilder\Import\Contract\RuleInterface;
use LemurCms\PageBuilder\Import\ClassHelper;
use LemurCms\PageBuilder\Import\ImportWarning;

final class ImageRule implements RuleInterface
{
    public function matches(\DOMElement $el): bool
    {
        return strtolower($el->tagName) === 'img';
    }

    public function priority(): int { return 200; }

    public function extract(\DOMElement $el, callable $recurse): array
    {
        $src      = $el->getAttribute('src');
        $warnings = [];

        // Warn for relative paths that might break in PB context
        if ($src !== '' && !preg_match('/^https?:\/\//', $src) && !str_starts_with($src, '/')) {
            $warnings[] = new ImportWarning(
                element:    '<img src="' . $src . '">',
                reason:     'Ruta de imagen relativa detectada. Puede no funcionar en el PageBuilder.',
                severity:   'warning',
                suggestion: 'Usa una URL absoluta o una ruta desde la raíz del sitio (ej: /images/foto.jpg).',
            );
        }

        return [
            'type'     => 'image',
            'props'    => [
                'src'     => $src,
                'alt'     => $el->getAttribute('alt'),
                'fluid'   => ClassHelper::hasClass($el, 'img-fluid'),
                'rounded' => ClassHelper::hasClass($el, 'rounded'),
                'class'   => ClassHelper::extraClasses($el, ['img-fluid', 'rounded']),
                'width'   => $el->getAttribute('width') ?: null,
                'height'  => $el->getAttribute('height') ?: null,
            ],
            'consumes' => true,
            'children' => [],
            'warnings' => $warnings,
            'ignored'  => false,
        ];
    }
}
