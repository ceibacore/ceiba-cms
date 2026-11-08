<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Application\PublishPageRevision;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Presentation\Api\EditorApiController;
use PHPUnit\Framework\TestCase;

final class EditorPublishRevisionTest extends TestCase
{
    public function testPublishesWithPermissionAndIdempotency(): void
    {
        [$controller, $db, $prefix] = $this->fixture(['pages.publish'], true);
        self::assertTrue($controller->capabilities()['data']['features']['revisionPublish']);
        $first = $controller->publishRevision('page-1', '{"revision":2}', 'request-1');
        $second = $controller->publishRevision('page-1', '{"revision":2}', 'request-1');
        self::assertTrue($first['success']);
        self::assertSame($first['data'], $second['data']);
        self::assertSame('draft-2', $first['data']['revisionId']);
        self::assertSame(1, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());
        self::assertSame('published', $db->pdo()->query("SELECT status FROM {$prefix}pages")->fetchColumn());
        $keyConflict = $controller->publishRevision('page-1', '{"revision":3}', 'request-1');
        self::assertSame(409, $keyConflict['status']);
        self::assertSame('IDEMPOTENCY_CONFLICT', $keyConflict['error']['code']);
    }

    public function testDeniesWithoutBothCapabilityAndHostPermission(): void
    {
        foreach ([[[], true], [['pages.publish'], false]] as [$capabilities, $allowed]) {
            [$controller, $db, $prefix] = $this->fixture($capabilities, $allowed);
            if ($capabilities === []) {
                self::assertFalse($controller->capabilities()['data']['features']['revisionPublish']);
            }
            $result = $controller->publishRevision('page-1', '{"revision":2}', 'request-1');
            self::assertSame(403, $result['status']);
            self::assertSame(0, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());
        }
    }

    public function testRejectsMissingKeyInvalidBodyAndStaleRevision(): void
    {
        [$controller, $db, $prefix] = $this->fixture(['pages.publish'], true);
        self::assertSame(428, $controller->publishRevision('page-1', '{"revision":2}', null)['status']);
        self::assertSame(422, $controller->publishRevision('page-1', '{"revision":"2"}', 'request-1')['status']);
        $conflict = $controller->publishRevision('page-1', '{"revision":3}', 'request-1');
        self::assertSame(409, $conflict['status']);
        self::assertSame('2', $conflict['error']['fieldErrors']['currentRevision']);
        self::assertSame(0, (int) $db->pdo()->query("SELECT COUNT(*) FROM {$prefix}page_publication_outbox")->fetchColumn());
    }

    private function fixture(array $capabilities, bool $allowed): array
    {
        $prefix = 'api_pub_' . bin2hex(random_bytes(4)) . '_';
        $db = \LemurDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}pages (id TEXT PRIMARY KEY, content TEXT, status TEXT, published_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revision_heads (page_id TEXT PRIMARY KEY, draft_revision_id TEXT, published_revision_id TEXT, next_revision INTEGER, updated_at TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_revisions (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision INTEGER, snapshot TEXT)");
        $pdo->exec("CREATE TABLE {$prefix}page_publication_outbox (id TEXT PRIMARY KEY, page_id TEXT, site_id TEXT, revision_id TEXT, idempotency_key TEXT, created_at TEXT, delivered_at TEXT, UNIQUE(site_id,idempotency_key))");
        $pdo->exec("INSERT INTO {$prefix}pages VALUES ('page-1','[]','draft',NULL)");
        $pdo->exec("INSERT INTO {$prefix}page_revision_heads VALUES ('page-1','draft-2',NULL,3,'2026-11-07 10:00:00')");
        $snapshot = json_encode(['root' => [['id' => 'title', 'type' => 'h1']]], JSON_THROW_ON_ERROR);
        $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES ('draft-2','page-1','site-1',2,?)")->execute([$snapshot]);
        $pdo->prepare("INSERT INTO {$prefix}page_revisions VALUES ('other-3','page-1','site-1',3,?)")->execute([$snapshot]);

        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturn(['id' => 'page-1']);
        $media = $this->createMock(MediaRepositoryInterface::class);
        $updateAuth = $this->createMock(DocumentAuthorization::class);
        $publishAuth = $this->createMock(PagePublicationAuthorization::class);
        $publishAuth->method('canPublish')->willReturn($allowed);
        $controller = new EditorApiController(
            '/api/builder/v1', 'site-1', $pages, $media, $updateAuth,
            new DocumentMigrator(), new ValidatePageDocument('site-1', $pages, $media, $updateAuth),
            ComponentCatalogue::createDefault(),
            static fn () => new HostContext('site-1', 'actor-1', 'es', $capabilities),
            null, $db, new PublishPageRevision($db, 'site-1'), $publishAuth
        );
        return [$controller, $db, $prefix];
    }
}
