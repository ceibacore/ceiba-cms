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

        $switcherCss = <<<CSS
<style data-cms-language-switcher>
.cms-language-select-wrapper {
    position: relative;
    display: inline-block;
    font-family: system-ui, -apple-system, sans-serif;
}
.cms-language-floating {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}
.cms-language-floating .cms-language-btn {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #1e293b;
}
.cms-language-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #334155;
    outline: none;
    box-sizing: border-box;
}
.cms-language-btn:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
}
.cms-language-dropdown {
    display: none;
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
    min-width: 160px;
    padding: 6px;
    list-style: none;
    z-index: 10000;
    box-sizing: border-box;
}
#cms-language-switcher:not(.cms-language-floating) .cms-language-dropdown {
    bottom: auto;
    top: 100%;
    margin-top: 8px;
    margin-bottom: 0;
}
.cms-language-dropdown.show {
    display: block;
}
.cms-language-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #334155;
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    box-sizing: border-box;
}
.cms-language-item:hover {
    background: #f1f5f9;
    color: #0f172a;
}
.cms-language-item.active {
    background: #e0f2fe;
    color: #0369a1;
}
</style>
CSS;

        $switcherJs = <<<JS
<script data-cms-language-switcher>
(function() {
    const switcher = document.getElementById('cms-language-switcher') || document.getElementById('floating-language-switcher');
    if (!switcher) return;

    const DB_NAME = 'lemur_dashboard_storage';
    const STORE_NAME = 'ui_state';

    function getStoredLocale() {
        return new Promise((resolve) => {
            try {
                const req = indexedDB.open(DB_NAME, 2);
                req.onsuccess = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        resolve(null);
                        return;
                    }
                    const tx = db.transaction(STORE_NAME, 'readonly');
                    const store = tx.objectStore(STORE_NAME);
                    const getReq = store.get('public:visitor:locale');
                    getReq.onsuccess = () => {
                        const entry = getReq.result;
                        resolve(entry && entry.state ? entry.state.locale : null);
                    };
                    getReq.onerror = () => resolve(null);
                };
                req.onerror = () => resolve(null);
            } catch (err) {
                resolve(null);
            }
        });
    }

    function saveStoredLocale(locale) {
        return new Promise((resolve) => {
            try {
                const req = indexedDB.open(DB_NAME, 2);
                req.onsuccess = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) {
                        resolve();
                        return;
                    }
                    const tx = db.transaction(STORE_NAME, 'readwrite');
                    const store = tx.objectStore(STORE_NAME);
                    const entry = {
                        key: 'public:visitor:locale',
                        namespace: 'public',
                        userId: 'visitor',
                        moduleId: 'locale',
                        state: { locale: locale },
                        savedAt: Date.now(),
                        version: 1
                    };
                    store.put(entry);
                    tx.oncomplete = () => resolve();
                };
                req.onerror = () => resolve();
            } catch (err) {
                resolve();
            }
        });
    }

    function setLocaleCookie(locale) {
        const d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        document.cookie = "lemur_locale=" + locale + ";path=/;expires=" + d.toUTCString();
    }

    async function init() {
        try {
            const res = await fetch('/api/public/languages');
            const data = await res.json();
            if (!data.success || !data.languages || data.languages.length === 0) return;

            const currentLocale = document.documentElement.lang || 'es';

            const stored = await getStoredLocale();
            if (stored !== currentLocale) {
                await saveStoredLocale(currentLocale);
                setLocaleCookie(currentLocale);
            }

            const activeLang = data.languages.find(l => l.code === currentLocale) || data.languages[0];

            switcher.className = switcher.className + ' cms-language-select-wrapper';
            
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cms-language-btn';
            btn.innerHTML = `<span>\${activeLang.flag || '🌐'}</span> <span>\${activeLang.label}</span>`;
            
            const dropdown = document.createElement('ul');
            dropdown.className = 'cms-language-dropdown';
            
            data.languages.forEach(lang => {
                const li = document.createElement('li');
                const btnItem = document.createElement('button');
                btnItem.type = 'button';
                btnItem.className = 'cms-language-item' + (lang.code === currentLocale ? ' active' : '');
                btnItem.innerHTML = `<span>\${lang.flag || '🌐'}</span> <span>\${lang.label}</span>`;
                btnItem.onclick = async () => {
                    if (lang.code === currentLocale) return;
                    await saveStoredLocale(lang.code);
                    setLocaleCookie(lang.code);
                    const url = new URL(window.location.href);
                    url.searchParams.set('lang', lang.code);
                    window.location.href = url.toString();
                };
                li.appendChild(btnItem);
                dropdown.appendChild(li);
            });

            btn.onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            };

            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            switcher.appendChild(btn);
            switcher.appendChild(dropdown);
        } catch (e) {
            console.error('Error in language switcher init:', e);
        }
    }

    init();
})();
</script>
JS;

        $html = <<<HTML
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
            {$switcherCss}
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
            {$switcherJs}
        </body>
        </html>
        HTML;

        // Automatically replace placeholders for the floating language switcher
        $floatingContainer = '<div id="cms-language-switcher" class="cms-language-floating"></div>';
        $html = str_ireplace('{{FLOATING_LENGUAJE}}', $floatingContainer, $html);
        $html = str_ireplace('{{FLOATING_LANGUAGE}}', $floatingContainer, $html);

        return $html;
    }
}
