<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\Page\Application\PagePublicationKeyConflict;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Support\Helpers\UuidHelper;
use CeibaCms\Support\Infrastructure\TransactionScope;

/** Atomic, idempotent publication of the selected documents and their draft rules. */
final class PublishSiteParts
{
    public function __construct(private readonly \CeibaDB $db, private readonly string $siteId,
        private readonly SitePartStore $store, private readonly PublishPageRevision $publish,
        private readonly PublicationGuard $guard) {}

    /** @param list<array{id: string, revision: int, rulesVersion: int}> $changes @return array<string, string> */
    public function execute(array $changes, string $key, ?string $actor): array
    {
        $changes = $this->normalize($changes, $key);
        $hash = hash('sha256', json_encode($changes, JSON_THROW_ON_ERROR));
        return TransactionScope::run($this->db, function () use ($changes, $key, $hash, $actor): array {
            $pdo = $this->db->pdo();
            $p = $this->db->getPrefix();
            $mysql = $pdo->getAttribute(\PDO::ATTR_DRIVER_NAME) !== 'sqlite';
            $insert = $mysql ? 'INSERT IGNORE' : 'INSERT OR IGNORE';
            $pdo->prepare("{$insert} INTO {$p}site_part_publication_locks (site_id) VALUES (?)")->execute([$this->siteId]);
            $lock = $pdo->prepare("SELECT site_id FROM {$p}site_part_publication_locks WHERE site_id = ?" . ($mysql ? ' FOR UPDATE' : ''));
            $lock->execute([$this->siteId]);
            $existing = $pdo->prepare("SELECT request_hash, result FROM {$p}site_part_publication_batches WHERE site_id = ? AND idempotency_key = ?");
            $existing->execute([$this->siteId, $key]);
            if ($row = $existing->fetch(\PDO::FETCH_ASSOC)) {
                if (!hash_equals($row['request_hash'], $hash)) {
                    throw new PagePublicationKeyConflict();
                }
                return json_decode($row['result'], true, 512, JSON_THROW_ON_ERROR);
            }
            foreach ($changes as $change) {
                $this->lockPart($change, $mysql);
            }
            $this->guard->assertNoConflicts($changes);
            $result = [];
            foreach ($changes as $change) {
                $partKey = 'sitepart:' . hash('sha256', $this->siteId . "\0" . $key . "\0" . $change['id']);
                $result[$change['id']] = $this->publish->execute($change['id'], $change['revision'], $partKey, $actor);
                $this->store->publishRules($change['id']);
            }
            $pdo->prepare("INSERT INTO {$p}site_part_publication_batches (id, site_id, idempotency_key, request_hash, result) VALUES (?, ?, ?, ?, ?)")
                ->execute([UuidHelper::v4(), $this->siteId, $key, $hash, json_encode($result, JSON_THROW_ON_ERROR)]);
            return $result;
        });
    }

    private function lockPart(array $change, bool $mysql): void
    {
        $p = $this->db->getPrefix();
        $sql = "SELECT r.version FROM {$p}site_part_rules r JOIN {$p}page_revision_heads h ON h.page_id = r.part_id
            JOIN {$p}page_revisions rev ON rev.id = COALESCE(h.draft_revision_id, h.published_revision_id)
            WHERE r.part_id = ? AND rev.site_id = ?" . ($mysql ? ' FOR UPDATE' : '');
        $query = $this->db->pdo()->prepare($sql);
        $query->execute([$change['id'], $this->siteId]);
        $version = $query->fetchColumn();
        if ($version === false) {
            throw new InvalidRules('id', 'NOT_FOUND');
        }
        if ((int) $version !== $change['rulesVersion']) {
            throw new RulesConflict((int) $version);
        }
    }

    private function normalize(array $changes, string $key): array
    {
        if ($this->siteId === '' || $key === '' || strlen($key) > 191 || !array_is_list($changes) || $changes === [] || count($changes) > 20) {
            throw new \InvalidArgumentException('Invalid publication batch');
        }
        $normalized = [];
        foreach ($changes as $change) {
            if (!is_array($change) || array_diff(array_keys($change), ['id', 'revision', 'rulesVersion']) !== []
                || !is_string($change['id'] ?? null) || !preg_match('/^[A-Za-z0-9-]{1,36}$/D', $change['id'])
                || !is_int($change['revision'] ?? null) || $change['revision'] < 1
                || !is_int($change['rulesVersion'] ?? null) || $change['rulesVersion'] < 1
                || isset($normalized[$change['id']])) {
                throw new \InvalidArgumentException('Invalid publication member');
            }
            $normalized[$change['id']] = ['id' => $change['id'], 'revision' => $change['revision'], 'rulesVersion' => $change['rulesVersion']];
        }
        ksort($normalized, SORT_STRING);
        return array_values($normalized);
    }
}
