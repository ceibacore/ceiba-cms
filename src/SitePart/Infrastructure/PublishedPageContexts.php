<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Infrastructure;

use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;

/** Public page contexts for the current site, using the same layout fallback as public rendering. */
final class PublishedPageContexts
{
    public function __construct(private readonly \CeibaDB $db, private readonly string $siteId,
        private readonly GetLayoutById $layouts, private readonly GetDefaultLayout $defaultLayout) {}

    /** @return list<array{path: string, pageId: string, layoutId: ?string, isHome: bool}> */
    public function list(): array
    {
        $p = $this->db->getPrefix();
        $query = $this->db->pdo()->prepare("SELECT p.id, p.slug, p.layout_id FROM {$p}pages p
            WHERE p.kind = 'page' AND p.status = 'published' AND p.deleted_at IS NULL
            AND EXISTS (SELECT 1 FROM {$p}page_revisions r WHERE r.page_id = p.id AND r.site_id = ?)
            ORDER BY p.slug, p.id");
        $query->execute([$this->siteId]);
        $rows = $query->fetchAll(\PDO::FETCH_ASSOC);
        $defaultId = $this->defaultLayout->execute()?->id;
        $bySlug = [];
        $contexts = [];
        foreach ($rows as $row) {
            $layout = !empty($row['layout_id']) ? $this->layouts->execute((string) $row['layout_id']) : null;
            $entry = ['path' => '/' . ltrim((string) $row['slug'], '/'), 'pageId' => (string) $row['id'],
                'layoutId' => $layout?->id ?? $defaultId, 'isHome' => false];
            $contexts[] = $entry;
            $bySlug[$row['slug']] = $entry;
        }
        foreach (['home', 'inicio', 'index'] as $slug) {
            if (isset($bySlug[$slug])) {
                $contexts[] = [...$bySlug[$slug], 'path' => '/', 'isHome' => true];
                break;
            }
        }
        return $contexts;
    }
}
