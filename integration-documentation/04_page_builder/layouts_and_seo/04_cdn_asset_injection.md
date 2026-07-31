# CDN & Layout Asset Injection Documentation

This document explains the design and implementation proposal for layout-specific Content Delivery Network (CDN) asset management in Lemur CMS. It details how administrators can define external frameworks (like Bootstrap, Tailwind, or custom styles) and how assets are loaded into the document head and body.

---

## 1. Requirement & Motivation

Currently, the HTML skeleton rendered by the system lacks a flexible mechanism for admins to inject custom CSS libraries, script bundles, or Google Fonts. 

To support complete design freedom, Lemur CMS layouts must allow defining external stylesheet and script links. 
* **Design Goal**: Allow admins to switch from the default Bootstrap 5 framework to other design frameworks (such as Tailwind CSS or Bulma) or simply load additional scripts per layout.
* **Separation of Injection Scope**:
  1. **Head CDN**: Stylesheets, preconnect links, and metadata scripts that must load before page content renders (placed within `<head>`).
  2. **Body CDN**: Interactive script files and widgets that should load asynchronously or run after the DOM is ready (placed right before `</body>`).
* **Fallback Behavior**: If a layout defines no custom CDN settings, the rendering engine must automatically load the default **Bootstrap 5.3 CDN** assets to keep components functional.

---

## 2. Proposed Database Schema Additions

To persist CDN configurations, two text columns should be added to the `page_layouts` table.

```sql
ALTER TABLE page_layouts 
ADD COLUMN head_cdn TEXT NULL AFTER is_default,
ADD COLUMN body_cdn TEXT NULL AFTER head_cdn;
```

### Column Specifications
* **`head_cdn`** (`TEXT`, nullable): Stores raw HTML links (e.g., `<link rel="stylesheet" href="...">`, `<script src="..." defer></script>`).
* **`body_cdn`** (`TEXT`, nullable): Stores raw HTML script tags (e.g., `<script src="..."></script>`).

---

## 3. Proposed Rendering Logic

### 3.1 LayoutRenderer Interface Update
Modify `LayoutRenderer::render()` to accept layout-specific CDNs:

```php
public function render(
    string $contentHtml,
    string $navbarHtml,
    string $footerHtml,
    array  $palette,
    array  $pageMeta,
    bool   $useSystemPalette = true,
    string $customCss = '',
    string $customJs  = '',
    ?string $headCdn  = null,
    ?string $bodyCdn  = null,
): string
```

### 3.2 Dynamic Fallback Configuration
If `$headCdn` or `$bodyCdn` are not defined, fallback to the default Bootstrap 5 asset set.

```php
// Define default fallbacks (Bootstrap 5.3)
$defaultHeadCdn = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">';
$defaultBodyCdn = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>';

$resolvedHeadCdn = ($headCdn !== null && trim($headCdn) !== '') ? $headCdn : $defaultHeadCdn;
$resolvedBodyCdn = ($bodyCdn !== null && trim($bodyCdn) !== '') ? $bodyCdn : $defaultBodyCdn;
```

### 3.3 HTML Document Integration
The resolved links are dynamically placed into the layout template:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
    {$descMeta}
    
    <!-- CDN STYLESHEETS & FONTS -->
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
    
    <!-- CDN INTERACTIVE SCRIPTS -->
    {$resolvedBodyCdn}
    
    {$customJsBlock}
</body>
</html>
```

---

## 4. Administrative Configuration (Mock Layout JSON)

When defining layouts through the administrative panel or seeders, CDNs are added as raw strings. Below is a mock payload for an admin saving a layout configured with Tailwind CSS (Play CDN) and Google Fonts:

```json
{
  "name": "Custom Tailwind Theme",
  "menu_slug": "main-navigation",
  "use_system_palette": false,
  "head_cdn": "<script src=\"https://cdn.tailwindcss.com\"></script>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap\" rel=\"stylesheet\">",
  "body_cdn": "<script src=\"https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js\" defer></script>",
  "footer_tree": []
}
```
In this scenario:
* Bootstrap 5 CSS is **not** loaded.
* Tailwind compiler is injected in `<head>` along with Inter Google Font.
* AlpineJS is loaded at the end of the `<body>` tag.
* Components automatically adapt classes to match Tailwind rules instead of Bootstrap.
