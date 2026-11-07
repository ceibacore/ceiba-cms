<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Application\MigratePageDocument;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Domain\Document\MigrationIncompatibility;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use RuntimeException;

final class DocumentMigratorTest extends TestCase
{
    private DocumentMigrator $migrator;

    protected function setUp(): void
    {
        parent::setUp();
        $this->migrator = new DocumentMigrator();
    }

    public static function fixtureNames(): iterable
    {
        yield 'campus-editor' => ['campus-editor'];
        yield 'legacy-body'   => ['legacy-body'];
        yield 'seeded-hero'   => ['seeded-hero'];
    }

    #[DataProvider('fixtureNames')]
    public function testMigratesLegacyFixturesToValidV1Envelope(string $fixtureName): void
    {
        $path = dirname(__DIR__, 2) . '/Fixtures/PageBuilder/' . $fixtureName . '.json';
        $fixtureContent = file_get_contents($path);
        $fixtureTree = json_decode($fixtureContent, false, 512, JSON_THROW_ON_ERROR)->tree;

        $report = $this->migrator->migrate($fixtureTree, 'page-' . $fixtureName);

        self::assertTrue($report->isSuccessful);
        self::assertFalse($report->hasErrors());
        self::assertNotNull($report->migratedDocument);
        self::assertSame('page-' . $fixtureName, $report->documentId);

        // Verify that original snapshot was preserved
        self::assertNotEmpty($report->originalSnapshot);

        $envelope = $report->migratedDocument;
        self::assertInstanceOf(DocumentEnvelope::class, $envelope);
        self::assertSame(1, $envelope->sourceVersion);
        self::assertSame('page-' . $fixtureName, $envelope->documentId);

        // Verify it passes DocumentWriteValidator with all nodes having identifiers
        (new DocumentWriteValidator())->validate($envelope, fn(string $id): bool => true);
    }

    public function testMigrationIsPureAndDeterministic(): void
    {
        $legacyTree = [
            ['type' => 'container', 'children' => [
                ['type' => 'row', 'children' => [
                    ['type' => 'col', 'children' => [
                        ['type' => 'heading', 'props' => ['text' => 'Title']],
                    ]],
                ]],
            ]],
        ];

        $report1 = $this->migrator->migrate($legacyTree, 'deterministic-page');
        $report2 = $this->migrator->migrate($legacyTree, 'deterministic-page');

        self::assertTrue($report1->isSuccessful);
        self::assertTrue($report2->isSuccessful);
        self::assertSame(
            $report1->migratedDocument?->toJson(),
            $report2->migratedDocument?->toJson(),
            'Migration must produce bit-for-bit identical JSON for identical input'
        );
        self::assertSame($report1->stats, $report2->stats);
        self::assertSame(
            array_column($report1->incompatibilities, 'code'),
            array_column($report2->incompatibilities, 'code')
        );
    }

    public function testMigratesPlainTextBodyToCanonicalHtmlNode(): void
    {
        $rawHtml = '<article class="prose"><h1>Noticia destacada</h1><p>Texto antiguo</p></article>';
        $report = $this->migrator->migrate($rawHtml, 'news-page');

        self::assertTrue($report->isSuccessful);
        self::assertSame($rawHtml, $report->originalSnapshot);

        $root = $report->migratedDocument?->root();
        self::assertCount(1, $root);
        self::assertSame('html', $root[0]['type']);
        self::assertSame($rawHtml, $root[0]['props']['content']);
        self::assertNotEmpty($root[0]['id']);

        // Check report recorded adaptation
        $codes = array_map(fn(MigrationIncompatibility $i) => $i->code, $report->incompatibilities);
        self::assertContains('LEGACY_HTML_BODY', $codes);
    }

    public function testMigratesLegacyBodyObject(): void
    {
        $json = '{"body":"<p>Contenido del body legacy</p>"}';
        $report = $this->migrator->migrate($json, 'body-obj-page');

        self::assertTrue($report->isSuccessful);
        $root = $report->migratedDocument?->root();
        self::assertCount(1, $root);
        self::assertSame('html', $root[0]['type']);
        self::assertSame('<p>Contenido del body legacy</p>', $root[0]['props']['content']);
    }

    public function testDeduplicatesIdenticalNodeIdsInLegacyTree(): void
    {
        $treeWithDuplicates = [
            ['id' => 'hero-banner', 'type' => 'section', 'children' => []],
            ['id' => 'hero-banner', 'type' => 'section', 'children' => []],
            ['id' => 'hero-banner', 'type' => 'section', 'children' => []],
        ];

        $report = $this->migrator->migrate($treeWithDuplicates, 'dedup-page');

        self::assertTrue($report->isSuccessful);
        self::assertTrue($report->hasWarnings());
        self::assertSame(2, $report->stats['deduplicatedIdsCount']);

        $root = $report->migratedDocument?->root();
        self::assertCount(3, $root);

        $ids = array_column($root, 'id');
        self::assertSame('hero-banner', $ids[0]);
        self::assertNotSame('hero-banner', $ids[1]);
        self::assertNotSame('hero-banner', $ids[2]);
        self::assertCount(3, array_unique($ids), 'All node IDs must be strictly unique');

        // DocumentWriteValidator must pass with no duplicate exceptions
        (new DocumentWriteValidator())->validate($report->migratedDocument, fn(string $id): bool => true);
    }

    public function testExtractsMediaResourcesFromNodeProps(): void
    {
        $tree = [
            [
                'id' => 'img-1',
                'type' => 'image',
                'props' => ['src' => 'photos/banner.jpg'],
                'children' => [],
            ],
            [
                'id' => 'card-1',
                'type' => 'card',
                'props' => ['mediaId' => 'res_998877', 'background_image' => 'textures/bg.png'],
                'children' => [],
            ],
            [
                'id' => 'ext-1',
                'type' => 'image',
                'props' => ['src' => 'https://example.com/external.jpg'], // Should not be registered as site resource
                'children' => [],
            ],
        ];

        $report = $this->migrator->migrate($tree, 'media-page');

        self::assertTrue($report->isSuccessful);
        $resources = $report->migratedDocument?->resources();

        self::assertContains('photos/banner.jpg', $resources);
        self::assertContains('res_998877', $resources);
        self::assertContains('textures/bg.png', $resources);
        self::assertNotContains('https://example.com/external.jpg', $resources);
        self::assertSame(3, $report->stats['resourcesCount']);
    }

    public function testRejectsCircularReferencesGracefully(): void
    {
        $recursiveNode = ['type' => 'div', 'children' => []];
        $recursiveNode['children'][] = &$recursiveNode;

        $report = $this->migrator->migrate($recursiveNode, 'cycle-page');

        self::assertFalse($report->isSuccessful);
        self::assertTrue($report->hasErrors());
        self::assertNull($report->migratedDocument);

        $codes = array_map(fn(MigrationIncompatibility $i) => $i->code, $report->incompatibilities);
        self::assertContains('CYCLE_DETECTED', $codes);
    }

    public function testRejectsTreesExceedingDepthLimit(): void
    {
        // Build 17 levels deep
        $deepTree = ['type' => 'level-0', 'children' => []];
        $current = &$deepTree;
        for ($i = 1; $i <= 17; $i++) {
            $child = ['type' => "level-{$i}", 'children' => []];
            $current['children'][] = $child;
            $current = &$current['children'][0];
        }

        $report = $this->migrator->migrate([$deepTree], 'deep-page');

        self::assertFalse($report->isSuccessful);
        self::assertTrue($report->hasErrors());
        self::assertNull($report->migratedDocument);

        $codes = array_map(fn(MigrationIncompatibility $i) => $i->code, $report->incompatibilities);
        self::assertContains('LIMIT_EXCEEDED', $codes);
    }

    public function testRejectsEmptyDocumentId(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->migrator->migrate([], '');
    }

    public function testMigratePageDocumentUseCaseDryRunAndExecute(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->with('page-100')->willReturn([
            'id' => 'page-100',
            'title' => 'Sample Page',
            'content' => [
                ['type' => 'p', 'props' => ['content' => 'Legacy paragraph']],
            ],
        ]);

        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(true);

        $useCase = new MigratePageDocument('site-alpha', $pages, $auth, $this->migrator);
        $context = new HostContext('site-alpha', 'admin-1', 'es', ['pages.update']);

        // 1. Dry-run without persistence
        $dryReport = $useCase->dryRun($context, 'page-100');
        self::assertTrue($dryReport->isSuccessful);
        self::assertNotNull($dryReport->migratedDocument);
        self::assertNotEmpty($dryReport->originalSnapshot);

        // 2. Execution with persistence
        $pages->expects(self::once())->method('update')->with(
            'page-100',
            self::callback(function (array $data): bool {
                return $data['id'] === 'page-100'
                    && is_array($data['content'])
                    && isset($data['content'][0]['id'])
                    && !empty($data['legacy_snapshot']);
            })
        );

        $execReport = $useCase->execute($context, 'page-100', true);
        self::assertTrue($execReport->isSuccessful);
    }

    public function testMigratePageDocumentUseCaseRejectsUnauthorizedAccess(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(false);

        $useCase = new MigratePageDocument('site-alpha', $pages, $auth, $this->migrator);
        $context = new HostContext('site-alpha', 'unauthorized-user', 'es', ['pages.update']);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Page unavailable for this operation');
        $useCase->dryRun($context, 'page-100');
    }
}
