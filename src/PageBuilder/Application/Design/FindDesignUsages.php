<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Domain\Style\StyledNodes;
use CeibaDB;

/**
 * Pages that use a design token or a site class (plan 04-D), in their working revision or in their public content,
 * so neither can be deleted while a page still needs it.
 */
final class FindDesignUsages
{
    public function __construct(private readonly CeibaDB $db, private readonly GetPageWorkingRevision $working) {}

    /** @return list<array{pageId: string, title: string}> */
    public function execute(string $kind, string $id): array
    {
        $usages = [];
        $pages = $this->db->pdo()->query("SELECT id, title, content FROM {$this->db->getPrefix()}pages WHERE deleted_at IS NULL")
            ->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($pages as $page) {
            $public = is_string($page['content']) ? json_decode($page['content'], true) : null;
            $trees = [$this->working->execute((string) $page['id'])['root'] ?? [], is_array($public) ? ($public['root'] ?? $public) : []];
            foreach ($trees as $tree) {
                if (is_array($tree) && $this->uses(StyledNodes::collect(array_values($tree)), $kind, $id)) {
                    $usages[] = ['pageId' => (string) $page['id'], 'title' => (string) ($page['title'] ?? '')];
                    break;
                }
            }
        }
        return $usages;
    }

    /** @param list<array{id: string, styles: array<string, mixed>}> $nodes */
    private function uses(array $nodes, string $kind, string $id): bool
    {
        foreach ($nodes as $node) {
            if ($kind === 'class' && in_array($id, is_array($node['styles']['classes'] ?? null) ? $node['styles']['classes'] : [], true)) {
                return true;
            }
            if ($kind === 'token' && str_contains((string) json_encode($node['styles'], JSON_UNESCAPED_SLASHES), '{"token":' . json_encode($id) . '}')) {
                return true;
            }
        }
        return false;
    }
}
