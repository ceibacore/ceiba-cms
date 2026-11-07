<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurDB;
use LemurCms\Support\Helpers\UuidHelper;
use Throwable;

/** Explicit, resumable backfill. Invoke from an authorized maintenance command per site connection. */
final class InitializePageRevisions
{
    public function __construct(private readonly LemurDB $db, private readonly string $siteId) {}

    /** @return array{processed:int,created:int,skipped:int,failed:array<string,string>} */
    public function execute(int $batchSize = 100): array
    {
        if (trim($this->siteId) === '' || $batchSize < 1 || $batchSize > 500) {
            throw new InvalidArgumentException('A site ID and batch size from 1 to 500 are required');
        }

        $offset = 0;
        $result = ['processed' => 0, 'created' => 0, 'skipped' => 0, 'failed' => []];
        do {
            $pages = $this->db->query('pages')->orderBy('id', 'ASC')->limit($batchSize, $offset)->get();
            foreach ($pages as $page) {
                $result['processed']++;
                try {
                    if ($this->initializePage($page)) {
                        $result['created']++;
                    } else {
                        $result['skipped']++;
                    }
                } catch (Throwable $error) {
                    $result['failed'][(string) ($page['id'] ?? 'unknown')] = $error->getMessage();
                }
            }
            $offset += count($pages);
        } while (count($pages) === $batchSize);

        return $result;
    }

    private function initializePage(array $page): bool
    {
        if (empty($page['id'])) {
            throw new InvalidArgumentException('Page has no ID');
        }
        return $this->db->transaction(function () use ($page): bool {
            $heads = $this->db->query('page_revision_heads')->where(['page_id' => $page['id']])->first();
            if ($heads !== null) {
                return false;
            }

            $raw = $page['content'] ?? null;
            $content = is_string($raw) ? $raw : json_encode($raw ?? [], JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
            $snapshot = json_encode((object) [
                'schemaVersion' => 0,
                'documentId' => (string) $page['id'],
                'revision' => 1,
                'root' => json_decode($content, false, 512, JSON_THROW_ON_ERROR),
                'settings' => (object) [],
                'resources' => [],
                'pageStatus' => $page['status'] ?? 'draft',
            ], JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
            $revisionId = UuidHelper::v4();
            $now = date('Y-m-d H:i:s');

            $this->db->query('page_revisions')->insert([
                'id' => $revisionId,
                'page_id' => $page['id'],
                'site_id' => $this->siteId,
                'revision' => 1,
                'schema_version' => 0,
                'snapshot' => $snapshot,
                'content_hash' => hash('sha256', $content),
                'author_id' => null,
                'reason' => 'initial',
                'created_at' => $page['updated_at'] ?? $now,
            ]);
            $this->db->query('page_revision_heads')->insert([
                'page_id' => $page['id'],
                'draft_revision_id' => ($page['status'] ?? 'draft') === 'draft' ? $revisionId : null,
                'published_revision_id' => ($page['status'] ?? 'draft') === 'published' ? $revisionId : null,
                'next_revision' => 2,
                'updated_at' => $now,
            ]);
            return true;
        });
    }
}
