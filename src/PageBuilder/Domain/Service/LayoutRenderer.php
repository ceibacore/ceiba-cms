<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

/**
 * Wraps page content HTML with navbar + footer into a full layout document.
 *
 * palette keys map to CSS custom properties:
 *   primary, secondary, background, surface, text, border, accent
 */
final class LayoutRenderer
{
    /**
     * @param string   $contentHtml  Rendered inner content (from BladeRenderer)
     * @param string   $navbarHtml   Rendered navigation markup (from LemurMenuRenderer)
     * @param string   $footerHtml   Rendered footer markup (from BladeRenderer for footer_tree)
     * @param array    $palette      CSS variable map: ['primary' => '#3b5cc4', ...]
     * @param array    $pageMeta     Page metadata: title, description, slug, etc.
     * @param bool     $useSystemPalette  When true, $palette is ignored
     */
    public function render(
        string $contentHtml,
        string $navbarHtml,
        string $footerHtml,
        array  $palette,
        array  $pageMeta,
        bool   $useSystemPalette = true,
    ): string {
        $title       = htmlspecialchars($pageMeta['title']       ?? 'Page', ENT_QUOTES, 'UTF-8');
        $rawDesc     = $pageMeta['description'] ?? '';
        $description = htmlspecialchars($rawDesc, ENT_QUOTES, 'UTF-8');
        $descMeta    = $description !== '' ? "<meta name=\"description\" content=\"{$description}\">" : '';

        $paletteStyle = '';
        if (!$useSystemPalette && !empty($palette)) {
            $vars = '';
            foreach ($palette as $key => $value) {
                $cssVar = '--lemur-' . preg_replace('/[^a-z0-9-]/', '-', strtolower((string) $key));
                $cssVal = htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
                $vars  .= "    {$cssVar}: {$cssVal};\n";
            }
            $paletteStyle = "<style>:root {\n{$vars}}</style>\n";
        }

        return <<<HTML
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{$title}</title>
            {$descMeta}
            {$paletteStyle}
        </head>
        <body>
            <header role="banner">
                {$navbarHtml}
            </header>
            <main id="main-content">
                {$contentHtml}
            </main>
            <footer role="contentinfo">
                {$footerHtml}
            </footer>
        </body>
        </html>
        HTML;
    }
}
