<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\Support\Helpers\UuidHelper;
use CeibaDB;

/** Storage of the site design revisions (design_revisions, design_heads) shared by the design use cases. */
final class SiteDesignStore
{
    public function __construct(private readonly CeibaDB $db, private readonly string $siteId) {}

    public function db(): CeibaDB
    {
        return $this->db;
    }

    public function siteId(): string
    {
        return $this->siteId;
    }

    private function table(string $name): string
    {
        return $this->db->getPrefix() . $name;
    }

    /** @return array{draft_revision: ?int, published_revision: ?int, next_revision: int}|null */
    public function head(bool $lock = false): ?array
    {
        $pdo = $this->db->pdo();
        $heads = $this->table('design_heads');
        $sqlite = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) === 'sqlite';
        if ($lock && $sqlite) {
            $pdo->prepare("UPDATE {$heads} SET next_revision = next_revision WHERE site_id = ?")->execute([$this->siteId]);
        }
        $sql = "SELECT draft_revision, published_revision, next_revision FROM {$heads} WHERE site_id = ?";
        $query = $pdo->prepare($lock && !$sqlite ? $sql . ' FOR UPDATE' : $sql);
        $query->execute([$this->siteId]);
        $row = $query->fetch(\PDO::FETCH_ASSOC);
        if ($row === false) {
            return null;
        }
        return [
            'draft_revision' => $row['draft_revision'] === null ? null : (int) $row['draft_revision'],
            'published_revision' => $row['published_revision'] === null ? null : (int) $row['published_revision'],
            'next_revision' => (int) $row['next_revision'],
        ];
    }

    /** Head row of the site, created on first write (inside the caller's transaction). */
    public function lockedHead(): array
    {
        $head = $this->head(true);
        if ($head !== null) {
            return $head;
        }
        try {
            $this->db->pdo()->prepare("INSERT INTO {$this->table('design_heads')} (site_id, next_revision, updated_at) VALUES (?, 1, ?)")
                ->execute([$this->siteId, gmdate('Y-m-d H:i:s')]);
        } catch (\PDOException) {
            // Another request created it first; its row is locked below.
        }
        return $this->head(true) ?? ['draft_revision' => null, 'published_revision' => null, 'next_revision' => 1];
    }

    /** Snapshot of a revision of this site, or null. @return array<string, mixed>|null */
    public function snapshot(int $revision): ?array
    {
        $query = $this->db->pdo()->prepare("SELECT snapshot FROM {$this->table('design_revisions')} WHERE site_id = ? AND revision = ?");
        $query->execute([$this->siteId, $revision]);
        $json = $query->fetchColumn();
        $design = is_string($json) ? json_decode($json, true) : null;
        return is_array($design) ? $design : null;
    }

    /** @param array<string, mixed> $design */
    public function insert(int $revision, array $design, ?string $actorId): void
    {
        $this->db->pdo()->prepare("INSERT INTO {$this->table('design_revisions')} (id, site_id, revision, snapshot, content_hash, author_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
            ->execute([UuidHelper::v4(), $this->siteId, $revision, json_encode($design, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                SiteDesign::hash($design), $actorId, gmdate('Y-m-d H:i:s')]);
    }

    public function moveHead(?int $draft, ?int $published, int $next): void
    {
        $this->db->pdo()->prepare("UPDATE {$this->table('design_heads')} SET draft_revision = ?, published_revision = ?, next_revision = ?, updated_at = ? WHERE site_id = ?")
            ->execute([$draft, $published, $next, gmdate('Y-m-d H:i:s'), $this->siteId]);
    }
}
