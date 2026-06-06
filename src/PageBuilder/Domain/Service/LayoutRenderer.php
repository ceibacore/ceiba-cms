<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

/**
 * Wraps page content HTML with navbar + footer into a full layout document.
 *
 * palette keys map to CSS custom properties:
 *   primary, secondary, background, surface, text, border, accent
 */
class LayoutRenderer
{
    /**
     * @param string   $contentHtml      Rendered inner content (from BladeRenderer)
     * @param string   $navbarHtml       Rendered navigation markup (from LemurMenuRenderer)
     * @param string   $footerHtml       Rendered footer markup (from BladeRenderer for footer_tree)
     * @param array    $palette          CSS variable map: ['primary' => '#3b5cc4', ...]
     * @param array    $pageMeta         Page metadata: title, description, slug, etc.
     * @param bool     $useSystemPalette When true, $palette is ignored
     * @param string   $customCss        Additional CSS to inject before </head> (global + page, session-aware)
     * @param string   $customJs         Additional JS to inject before </body> (global + page, session-aware)
     */
    public function render(
        string  $contentHtml,
        string  $navbarHtml,
        string  $footerHtml,
        array   $palette,
        array   $pageMeta,
        bool    $useSystemPalette = true,
        string  $customCss = '',
        string  $customJs  = '',
        string  $lang = 'es',
        ?string $headCdn = null,
        ?string $bodyCdn = null,
    ): string {
        $title       = htmlspecialchars($pageMeta['title']       ?? 'Page', ENT_QUOTES, 'UTF-8');
        $rawDesc     = $pageMeta['description'] ?? '';
        $description = htmlspecialchars($rawDesc, ENT_QUOTES, 'UTF-8');
        $descMeta    = $description !== '' ? "<meta name=\"description\" content=\"{$description}\">" : '';

        // Dynamic Language Attribute
        $langAttr = htmlspecialchars($lang, ENT_QUOTES, 'UTF-8');

        // SEO Link Canonical
        $canonicalHtml = '';
        if (!empty($pageMeta['canonical_url'])) {
            $canonicalUrl = htmlspecialchars((string) $pageMeta['canonical_url'], ENT_QUOTES, 'UTF-8');
            $canonicalHtml = "\n    <link rel=\"canonical\" href=\"{$canonicalUrl}\">";
        }

        // SEO Robots Directives
        $robotsVal = $pageMeta['robots'] ?? 'index,follow';
        $robots = htmlspecialchars((string) $robotsVal, ENT_QUOTES, 'UTF-8');
        $robotsHtml = "\n    <meta name=\"robots\" content=\"{$robots}\">";

        // SEO OpenGraph Tags
        $ogTitleVal = $pageMeta['og_title'] ?? $pageMeta['title'] ?? '';
        $ogTitleHtml = '';
        if ($ogTitleVal !== '') {
            $ogTitle = htmlspecialchars((string) $ogTitleVal, ENT_QUOTES, 'UTF-8');
            $ogTitleHtml = "\n    <meta property=\"og:title\" content=\"{$ogTitle}\">";
        }

        $ogDescVal = $pageMeta['og_description'] ?? $pageMeta['description'] ?? '';
        $ogDescHtml = '';
        if ($ogDescVal !== '') {
            $ogDesc = htmlspecialchars((string) $ogDescVal, ENT_QUOTES, 'UTF-8');
            $ogDescHtml = "\n    <meta property=\"og:description\" content=\"{$ogDesc}\">";
        }

        $ogImageHtml = '';
        if (!empty($pageMeta['og_image'])) {
            $ogImage = htmlspecialchars((string) $pageMeta['og_image'], ENT_QUOTES, 'UTF-8');
            $ogImageHtml = "\n    <meta property=\"og:image\" content=\"{$ogImage}\">";
        }

        $ogTypeHtml = "\n    <meta property=\"og:type\" content=\"website\">";

        // SEO JSON-LD Schema
        $schemaHtml = '';
        if (!empty($pageMeta['schema_json'])) {
            $schemaVal = is_array($pageMeta['schema_json'])
                ? json_encode($pageMeta['schema_json'])
                : (string) $pageMeta['schema_json'];
            $schemaHtml = "\n    <script type=\"application/ld+json\">\n" . $schemaVal . "\n    </script>";
        }

        // CDN Assets Fallback (Bootstrap 5.3)
        $defaultHeadCdn = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">';
        $defaultBodyCdn = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>';

        $resolvedHeadCdn = ($headCdn !== null && trim($headCdn) !== '') ? $headCdn : $defaultHeadCdn;
        $resolvedBodyCdn = ($bodyCdn !== null && trim($bodyCdn) !== '') ? $bodyCdn : $defaultBodyCdn;

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

        $customCssBlock = $customCss !== '' ? "<style data-lemur-custom>\n{$customCss}\n</style>" : '';
        $customJsBlock  = $customJs  !== '' ? "<script data-lemur-custom>\n{$customJs}\n</script>" : '';

        return <<<HTML
        <!DOCTYPE html>
        <html lang="{$langAttr}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{$title}</title>
            {$descMeta}{$canonicalHtml}{$robotsHtml}{$ogTitleHtml}{$ogDescHtml}{$ogImageHtml}{$ogTypeHtml}{$schemaHtml}
            
            {$resolvedHeadCdn}
            
            {$paletteStyle}
            {$customCssBlock}
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
            
            {$resolvedBodyCdn}
            {$customJsBlock}
        </body>
        </html>
        HTML;
    }
}
