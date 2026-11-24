<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\PageBuilder\Domain\Entity\PageLayout;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Infrastructure\SitePartStore;

/**
 * Layouts → site parts (plan 06 D-3): each layout's footer tree becomes a footer part, and its menu a header part
 * with a site_menu, both with the rule «pages with this layout». Layouts are left untouched; a layout already
 * migrated (a part of that kind whose rules are exactly that rule) is skipped. Parts are drafts unless published
 * here, through the same conflict guard as the editor.
 */
final class MigrateLayoutsToParts
{
    public function __construct(
        private readonly ManageSiteParts $manage,
        private readonly SitePartStore $store,
        private readonly ?PublishSiteParts $publish = null,
    ) {}

    /**
     * @param list<PageLayout> $layouts
     * @return array{created: list<array<string, string>>, skipped: list<array<string, string>>, notes: list<string>, published: bool}
     */
    public function execute(array $layouts, ?string $actor, bool $publish = false, bool $dryRun = false): array
    {
        $report = ['created' => [], 'skipped' => [], 'notes' => [], 'published' => false];
        foreach ($layouts as $layout) {
            $rules = ['include' => [['type' => 'layouts', 'ids' => [$layout->id]]]];
            $candidates = [
                SitePartKind::FOOTER => array_values($layout->footerTree),
                SitePartKind::HEADER => ($layout->menuSlug ?? '') === '' ? [] : [[
                    'id' => 'menu-' . substr(hash('sha256', $layout->id), 0, 12), 'type' => 'site_menu',
                    'props' => ['slug' => $layout->menuSlug, 'label' => 'Main'], 'children' => [],
                ]],
            ];
            foreach ($candidates as $kind => $root) {
                $entry = ['layoutId' => $layout->id, 'layout' => $layout->name, 'kind' => $kind];
                if ($root === []) {
                    $report['skipped'][] = $entry + ['reason' => 'EMPTY'];
                } elseif ($this->migrated($kind, $rules)) {
                    $report['skipped'][] = $entry + ['reason' => 'ALREADY_MIGRATED'];
                } else {
                    $name = ($kind === SitePartKind::FOOTER ? 'Footer · ' : 'Header · ') . $layout->name;
                    $report['created'][] = $entry + ['partId' => $dryRun ? '' : $this->manage->import($kind, $name, $root, $rules, $actor)];
                }
            }
        }
        if (array_filter($report['created'], fn (array $c) => $c['kind'] === SitePartKind::HEADER) !== []) {
            $report['notes'][] = 'HEADER_IN_SITE_MENU: the menu is drawn inside a <nav class="cms-site-menu"> landmark of the header part';
        }
        if ($publish && !$dryRun && $report['created'] !== [] && $this->publish !== null) {
            $ids = array_column($report['created'], 'partId');
            $this->publish->execute(array_map(fn (string $id) => ['id' => $id, 'revision' => 1, 'rulesVersion' => 1], $ids),
                'layouts-migration:' . hash('sha256', implode(',', $ids)), $actor);
            $report['published'] = true;
        }
        return $report;
    }

    /** @param array<string, mixed> $rules */
    private function migrated(string $kind, array $rules): bool
    {
        foreach ($this->store->all() as $part) {
            if ($part['kind'] === $kind && ($part['rules']['include'] ?? null) === $rules['include']) {
                return true;
            }
        }
        return false;
    }
}
