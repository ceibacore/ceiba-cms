<?php
declare(strict_types=1);

namespace CeibaCms\Http\Controllers;

use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;

/** Pieces of the public page response that do not depend on the content (split from PageRenderController). */
final class PublicPageResponses
{
    /** SEO metadata of a page: the SEO record wins over the page fields. @return array<string, mixed> */
    public static function meta(array $page, ?array $seo, string $slug): array
    {
        return [
            'title'          => $seo['meta_title']       ?? $page['title']            ?? '',
            'description'    => $seo['meta_description'] ?? $page['meta_description'] ?? '',
            'slug'           => $page['slug']            ?? $slug,
            'canonical_url'  => $seo['canonical_url']    ?? null,
            'robots'         => $seo['robots']           ?? 'index,follow',
            'og_title'       => $seo['og_title']         ?? null,
            'og_description' => $seo['og_description']   ?? null,
            'og_image'       => $seo['og_image']         ?? null,
            'schema_json'    => $seo['schema_json']      ?? null,
        ];
    }

    /** Head and body CDN markup: the layout's, else the site's. @return array{0: ?string, 1: ?string} */
    public static function cdns(?object $layout, ?SettingsRepositoryInterface $settings): array
    {
        $pick = static fn (?string $layoutValue, string $key): ?string => ($layoutValue !== null && trim($layoutValue) !== '')
            ? $layoutValue : $settings?->get($key, null);
        return [$pick($layout?->headCdn ?? null, 'global_head_cdn'), $pick($layout?->bodyCdn ?? null, 'global_body_cdn')];
    }

    /** Response when a page condition fails. @param array<string, mixed> $fallback */
    public static function fallback(array $fallback): void
    {
        switch ($fallback['action'] ?? 'abort') {
            case 'redirect':
                header('Location: ' . ($fallback['to'] ?? '/'));
                break;
            case 'json':
                http_response_code($fallback['status'] ?? 401);
                header('Content-Type: application/json');
                echo json_encode($fallback['body'] ?? ['error' => 'Unauthorized']);
                break;
            default:
                http_response_code($fallback['status'] ?? 403);
                header('Content-Type: text/html; charset=UTF-8');
                echo '<h1>' . htmlspecialchars($fallback['message'] ?? 'Acceso Denegado') . '</h1>';
        }
    }

    public static function notFound(): void
    {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        echo '<h1>404 — Page Not Found</h1>';
    }
}
