<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Infrastructure;

use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Domain\SitePartRules;

/**
 * Site parts in the CMS tables (plan 06 D-1): the document is a row of `pages` with its kind, the rules a row of
 * `site_part_rules` with a draft and a published copy and a version for optimistic concurrency.
 */
final class SitePartStore
{
    public function __construct(private readonly \CeibaDB $db, private readonly string $siteId)
    {
        if (trim($siteId) === '') {
            throw new \InvalidArgumentException('A site ID is required');
        }
    }

    public function transaction(callable $operation): mixed
    {
        return $this->db->pdo()->inTransaction() ? $operation() : $this->db->transaction($operation);
    }

    /** Published parts with their published rules and public tree: what visitors may get. @return list<SitePart> */
    public function published(): array
    {
        $rows = $this->rows("p.status = 'published' AND r.published_rules IS NOT NULL");
        return array_values(array_filter(array_map(function (array $row): ?SitePart {
            $tree = json_decode((string) $row['content'], true);
            $tree = is_array($tree) ? ($tree['root'] ?? $tree) : [];
            return $this->part($row, (string) $row['published_rules'], is_array($tree) ? array_values($tree) : []);
        }, $rows)));
    }

    /** Every part with its draft rules (editor, impact). @return list<array<string, mixed>> */
    public function all(): array
    {
        return array_map(fn (array $row): array => [
            'id' => (string) $row['id'], 'kind' => (string) $row['kind'], 'name' => (string) $row['title'],
            'status' => (string) $row['status'], 'rules' => json_decode((string) $row['draft_rules'], true),
            'publishedRules' => $row['published_rules'] === null ? null : json_decode((string) $row['published_rules'], true),
            'version' => (int) $row['version'], 'updatedAt' => (string) $row['updated_at'],
        ], $this->rows('1 = 1'));
    }

    /** @return array<string, mixed>|null */
    public function find(string $id): ?array
    {
        foreach ($this->all() as $part) {
            if ($part['id'] === $id) {
                return $part;
            }
        }
        return null;
    }

    public function insertRules(string $partId, SitePartRules $rules, ?string $actor, string $now): void
    {
        $this->assertOwned($partId);
        $this->db->pdo()->prepare("INSERT INTO {$this->db->getPrefix()}site_part_rules (part_id, draft_rules, published_rules, version, updated_by, updated_at)
            VALUES (?, ?, NULL, 1, ?, ?)")->execute([$partId, json_encode($rules->toArray(), JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES), $actor, $now]);
    }

    /** Saves draft rules when the stored version is $expected; returns the new version, or null on a stale version. */
    public function saveDraftRules(string $partId, SitePartRules $rules, int $expected, ?string $actor, string $now): ?int
    {
        $statement = $this->db->pdo()->prepare("UPDATE {$this->db->getPrefix()}site_part_rules
            SET draft_rules = ?, version = version + 1, updated_by = ?, updated_at = ? WHERE part_id = ? AND version = ?
            AND EXISTS (SELECT 1 FROM {$this->db->getPrefix()}page_revisions rev WHERE rev.page_id = part_id AND rev.site_id = ?)");
        $statement->execute([json_encode($rules->toArray(), JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES), $actor, $now, $partId, $expected, $this->siteId]);
        return $statement->rowCount() === 1 ? $expected + 1 : null;
    }

    /** Copies the draft rules to the published ones (inside the publication transaction). */
    public function publishRules(string $partId): void
    {
        $this->assertOwned($partId);
        $this->db->pdo()->prepare("UPDATE {$this->db->getPrefix()}site_part_rules SET published_rules = draft_rules WHERE part_id = ?")->execute([$partId]);
    }

    /** @return list<array<string, mixed>> */
    private function rows(string $where): array
    {
        $kinds = implode(',', array_map(fn (string $k) => "'{$k}'", SitePartKind::ALL));
        $prefix = $this->db->getPrefix();
        $query = $this->db->pdo()->prepare("SELECT p.id, p.kind, p.title, p.status, p.content, r.draft_rules, r.published_rules, r.version, r.updated_at
            FROM {$prefix}pages p JOIN {$prefix}site_part_rules r ON r.part_id = p.id
            WHERE p.kind IN ({$kinds}) AND p.deleted_at IS NULL AND {$where}
            AND EXISTS (SELECT 1 FROM {$prefix}page_revisions rev WHERE rev.page_id = p.id AND rev.site_id = ?)
            ORDER BY p.kind, p.title, p.id");
        $query->execute([$this->siteId]);
        return $query->fetchAll(\PDO::FETCH_ASSOC);
    }

    private function assertOwned(string $partId): void
    {
        $query = $this->db->pdo()->prepare("SELECT 1 FROM {$this->db->getPrefix()}page_revisions WHERE page_id = ? AND site_id = ?");
        $query->execute([$partId, $this->siteId]);
        if ($query->fetchColumn() === false) {
            throw new \InvalidArgumentException('Part does not belong to this site');
        }
    }

    /** @param array<string, mixed> $row @param list<mixed> $tree */
    private function part(array $row, string $rules, array $tree): ?SitePart
    {
        try {
            // Published rules were checked (host routes included) when saved; anything unreadable is skipped, never guessed.
            $parsed = SitePartRules::from(json_decode($rules, true), (string) $row['kind'], self::routesIn($rules));
        } catch (InvalidRules) {
            return null;
        }
        return new SitePart((string) $row['id'], (string) $row['kind'], (string) $row['title'], $parsed, $tree);
    }

    /** @return list<string> route names a stored rule refers to (they were checked against the host on save) */
    private static function routesIn(string $rules): array
    {
        $decoded = json_decode($rules, true);
        $names = [];
        foreach (['include', 'exclude'] as $list) {
            foreach (is_array($decoded[$list] ?? null) ? $decoded[$list] : [] as $target) {
                if (($target['type'] ?? null) === 'routes' && is_array($target['names'] ?? null)) {
                    array_push($names, ...array_filter($target['names'], 'is_string'));
                }
            }
        }
        return $names;
    }
}
