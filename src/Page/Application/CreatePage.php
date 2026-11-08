<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use LemurCms\Support\Helpers\UuidHelper;

/**
 * Creates a page with its first revision and revision head in one transaction,
 * so every page is versioned from birth. A page created as 'published' also
 * records its publication outbox event.
 */
final class CreatePage
{
    private const STATUSES = ['draft', 'published', 'archived'];
    private const RESERVED = ['id', 'content', 'published_at'];
    private const ID_PATTERN = '/^[A-Za-z0-9-]{1,36}$/D';

    private readonly Clock $clock;
    private readonly PageRevisionAuditLog $audit;

    public function __construct(
        private readonly LemurDB $db,
        private readonly string $siteId,
        private readonly TreeNormalizer $normalizer = new TreeNormalizer(),
        private readonly DocumentMigrator $migrator = new DocumentMigrator(),
        ?Clock $clock = null,
    ) {
        if (trim($siteId) === '') {
            throw new InvalidArgumentException('A site ID is required to create pages');
        }
        $this->clock = $clock ?? new SystemClock();
        $this->audit = new PageRevisionAuditLog($db, $siteId, $this->clock);
    }

    /** @param array<string, mixed> $data Page metadata plus optional 'content' (editor tree or HTML). */
    public function execute(array $data, ?string $actorId = null): string
    {
        $status = $data['status'] ?? 'draft';
        if (!in_array($status, self::STATUSES, true)) {
            throw new InvalidArgumentException('Invalid page status');
        }
        // Hosts may supply the ID (idempotent creation); it must be a safe identifier.
        $pageId = $data['id'] ?? UuidHelper::v4();
        if (!is_string($pageId) || !preg_match(self::ID_PATTERN, $pageId)) {
            throw new InvalidArgumentException('Invalid page ID');
        }
        $content = $this->normalizer->preparePageContent($data['content'] ?? []);
        $report = $this->migrator->migrate($content, $pageId);
        if (!$report->isSuccessful || $report->migratedDocument === null) {
            throw new InvalidArgumentException('Invalid page content');
        }
        $snapshot = json_decode($report->migratedDocument->toJson(), false, 512, JSON_THROW_ON_ERROR);
        $snapshot->revision = 1;
        $document = DocumentEnvelope::fromJson(json_encode($snapshot, JSON_THROW_ON_ERROR));
        $documentJson = $document->toJson();
        $publicContent = json_encode($document->root(), JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);

        $now = $this->clock->now()->format('Y-m-d H:i:s');
        $row = array_diff_key($data, array_flip(self::RESERVED));
        $row['id'] = $pageId;
        $row['status'] = $status;
        $row['content'] = $publicContent;
        $row['published_at'] = $status === 'published' ? $now : null;
        $row['created_at'] ??= $now;
        $row['updated_at'] ??= $now;

        return $this->db->transaction(function () use ($row, $pageId, $status, $documentJson, $publicContent, $now, $actorId): string {
            $prefix = $this->db->getPrefix();
            $pdo = $this->db->pdo();
            $this->db->query('pages')->insert($row);
            $revisionId = UuidHelper::v4();
            $pdo->prepare("INSERT INTO {$prefix}page_revisions
                (id, page_id, site_id, revision, schema_version, snapshot, content_hash, author_id, reason, pinned, created_at)
                VALUES (?, ?, ?, 1, ?, ?, ?, ?, 'create', 0, ?)")
                ->execute([$revisionId, $pageId, $this->siteId, DocumentEnvelope::VERSION, $documentJson,
                    hash('sha256', $documentJson), $actorId, $now]);
            $published = $status === 'published';
            $pdo->prepare("INSERT INTO {$prefix}page_revision_heads
                (page_id, draft_revision_id, published_revision_id, next_revision, public_content_hash, updated_at)
                VALUES (?, ?, ?, 2, ?, ?)")
                ->execute([$pageId, $published ? null : $revisionId, $published ? $revisionId : null,
                    PublicContentFingerprint::of($publicContent), $now]);
            if ($published) {
                $pdo->prepare("INSERT INTO {$prefix}page_publication_outbox
                    (id, page_id, site_id, revision_id, event_type, idempotency_key, attempts, created_at)
                    VALUES (?, ?, ?, ?, 'published', ?, 0, ?)")
                    ->execute([UuidHelper::v4(), $pageId, $this->siteId, $revisionId, 'create:' . $pageId, $now]);
            }
            $this->audit->record($pageId, 'create', 'success', $actorId, null, $revisionId, ['status' => $status]);
            return $pageId;
        });
    }
}
