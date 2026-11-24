<?php

declare(strict_types=1);

namespace CeibaCms\Media\Application\Library;

use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;

/**
 * Where an asset is used (plan 05-A), so it cannot be deleted while something still draws it: pages (working
 * revision or public content), layout footers and the site design (working or published).
 */
final class FindMediaUsages
{
    public function __construct(
        private readonly \CeibaDB $db,
        private readonly GetPageWorkingRevision $working,
        private readonly ?GetSiteDesign $designs = null,
    ) {}

    /** @return array{pages: list<array{pageId: string, title: string}>, layouts: list<array{layoutId: string, name: string}>, design: bool} */
    public function execute(string $assetId): array
    {
        $pages = [];
        $rows = $this->db->pdo()->query("SELECT id, title, content FROM {$this->db->getPrefix()}pages WHERE deleted_at IS NULL")
            ->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as $page) {
            $public = is_string($page['content']) ? json_decode($page['content'], true) : null;
            $trees = [$this->working->execute((string) $page['id'])['root'] ?? [], is_array($public) ? ($public['root'] ?? $public) : []];
            foreach ($trees as $tree) {
                if (is_array($tree) && in_array($assetId, MediaReferences::collect(array_values($tree)), true)) {
                    $pages[] = ['pageId' => (string) $page['id'], 'title' => (string) ($page['title'] ?? '')];
                    break;
                }
            }
        }
        return ['pages' => $pages, 'layouts' => $this->inLayouts($assetId), 'design' => $this->inDesign($assetId)];
    }

    public function isUsed(string $assetId): bool
    {
        $usages = $this->execute($assetId);
        return $usages['pages'] !== [] || $usages['layouts'] !== [] || $usages['design'];
    }

    /** @return list<array{layoutId: string, name: string}> */
    private function inLayouts(string $assetId): array
    {
        $layouts = [];
        $rows = $this->db->pdo()->query("SELECT id, name, footer_tree FROM {$this->db->getPrefix()}page_layouts")->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            $tree = is_string($row['footer_tree']) ? json_decode($row['footer_tree'], true) : null;
            if (is_array($tree) && in_array($assetId, MediaReferences::collect(array_values($tree)), true)) {
                $layouts[] = ['layoutId' => (string) $row['id'], 'name' => (string) $row['name']];
            }
        }
        return $layouts;
    }

    private function inDesign(string $assetId): bool
    {
        if ($this->designs === null) {
            return false;
        }
        foreach ([$this->designs->working()['design'], $this->designs->published()] as $design) {
            if (in_array($assetId, MediaReferences::inValues($design), true)) {
                return true;
            }
        }
        return false;
    }
}
