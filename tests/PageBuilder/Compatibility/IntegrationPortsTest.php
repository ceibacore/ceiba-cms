<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use DateTimeImmutable;
use InvalidArgumentException;
use LemurCms\Auth\Application\CheckPermission;
use LemurCms\Auth\Domain\Repository\UserRepositoryInterface;
use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Contract\Clock;
use LemurCms\PageBuilder\Domain\Contract\ContentSource;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Contract\JobDispatcher;
use LemurCms\PageBuilder\Domain\Contract\MailDelivery;
use LemurCms\PageBuilder\Domain\Contract\MediaStorage;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Domain\Service\DataProviderInterface;
use LemurCms\PageBuilder\Domain\Service\LoopResolver;
use LemurCms\PageBuilder\Infrastructure\CmsDocumentAuthorization;
use LemurCms\PageBuilder\Infrastructure\LocalMediaStorage;
use LemurCms\PageBuilder\Infrastructure\LoopResolverContentSource;
use LemurCms\PageBuilder\Infrastructure\NullMailDelivery;
use LemurCms\PageBuilder\Infrastructure\SyncJobDispatcher;
use LemurCms\PageBuilder\Infrastructure\SystemClock;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use RuntimeException;

final class IntegrationPortsTest extends TestCase
{
    public function testHostContextHoldsServerResolvedIdentity(): void
    {
        $context = new HostContext('site-1', 'user-42', 'es', ['pages.read', 'pages.update']);

        self::assertSame('site-1', $context->siteId);
        self::assertSame('user-42', $context->actorId);
        self::assertSame('es', $context->locale);
        self::assertSame(['pages.read', 'pages.update'], $context->capabilities);
    }

    public static function invalidContexts(): iterable
    {
        yield 'empty site' => ['', 'user-1', 'es', ['pages.read']];
        yield 'whitespace site' => ['   ', 'user-1', 'es', ['pages.read']];
        yield 'empty actor' => ['site-1', '', 'es', ['pages.read']];
        yield 'whitespace actor' => ['site-1', '  ', 'es', ['pages.read']];
        yield 'empty locale' => ['site-1', 'user-1', '', ['pages.read']];
        yield 'whitespace locale' => ['site-1', 'user-1', " \t ", ['pages.read']];
        yield 'associative capabilities' => ['site-1', 'user-1', 'es', ['cap' => 'pages.read']];
        yield 'empty capability string' => ['site-1', 'user-1', 'es', ['']];
        yield 'whitespace capability string' => ['site-1', 'user-1', 'es', ['  ']];
    }

    #[DataProvider('invalidContexts')]
    public function testRejectsInvalidHostContext(string $siteId, string $actorId, string $locale, array $capabilities): void
    {
        $this->expectException(InvalidArgumentException::class);
        new HostContext($siteId, $actorId, $locale, $capabilities);
    }

    public function testSystemClockProvidesCurrentTime(): void
    {
        $clock = new SystemClock();
        self::assertInstanceOf(Clock::class, $clock);

        $before = new DateTimeImmutable();
        $now = $clock->now();
        $after = new DateTimeImmutable();

        self::assertGreaterThanOrEqual($before->getTimestamp(), $now->getTimestamp());
        self::assertLessThanOrEqual($after->getTimestamp(), $now->getTimestamp());
    }

    public function testCmsDocumentAuthorizationDelegatesToExistingPermissions(): void
    {
        $users = $this->createMock(UserRepositoryInterface::class);
        $users->method('checkPermission')->willReturnCallback(
            fn(string $userId, string $permission) => $userId === 'user-allowed' && $permission === 'pages.update'
        );

        $checkPermission = new CheckPermission($users);
        $auth = new CmsDocumentAuthorization('site-central', $checkPermission);
        self::assertInstanceOf(DocumentAuthorization::class, $auth);

        $allowedContext = new HostContext('site-central', 'user-allowed', 'en', ['pages.update']);
        $deniedContext = new HostContext('site-central', 'user-denied', 'en', ['pages.read']);
        $alienContext = new HostContext('site-other', 'user-allowed', 'en', ['pages.update']);

        self::assertTrue($auth->canUpdate($allowedContext, 'page-10'));
        self::assertFalse($auth->canUpdate($deniedContext, 'page-10'));
        self::assertFalse($auth->canUpdate($alienContext, 'page-10'), 'Cross-site request must be rejected');
    }

    public function testLoopResolverContentSourceDelegatesToLoopResolver(): void
    {
        $loopResolver = new LoopResolver();
        $provider = $this->createMock(DataProviderInterface::class);
        $provider->method('getData')->with(['category' => 'books'])->willReturn([
            ['id' => 1, 'name' => 'Book 1'],
            ['id' => 2, 'name' => 'Book 2'],
        ]);
        $loopResolver->register('books_catalog', $provider);

        $source = new LoopResolverContentSource($loopResolver);
        self::assertInstanceOf(ContentSource::class, $source);

        $context = new HostContext('site-1', 'actor-1', 'es', []);
        $items = iterator_to_array($source->fetch($context, 'books_catalog', ['category' => 'books']));

        self::assertCount(2, $items);
        self::assertSame('Book 1', $items[0]['name']);
    }

    public function testLocalMediaStorageSavesAndDeletesScopedToSite(): void
    {
        $tempDir = sys_get_temp_dir() . '/cms_test_media_' . bin2hex(random_bytes(6));
        $storage = new LocalMediaStorage($tempDir);
        self::assertInstanceOf(MediaStorage::class, $storage);

        $context = new HostContext('site-alpha', 'actor-1', 'es', []);
        $content = 'image-binary-sample-content';
        $stream = fopen('php://memory', 'r+');
        fwrite($stream, $content);
        rewind($stream);

        $storageKey = $storage->write($context, $stream, 'image/png');
        fclose($stream);

        self::assertStringEndsWith('.png', $storageKey);
        $expectedPath = $tempDir . '/site-alpha/' . $storageKey;
        self::assertFileExists($expectedPath);
        self::assertSame($content, file_get_contents($expectedPath));

        $storage->delete($context, $storageKey);
        self::assertFileDoesNotExist($expectedPath);

        // Cleanup temp root
        @rmdir($tempDir . '/site-alpha');
        @rmdir($tempDir);
    }

    public function testLocalMediaStoragePreventsPathTraversal(): void
    {
        $tempDir = sys_get_temp_dir() . '/cms_test_media_' . bin2hex(random_bytes(6));
        $storage = new LocalMediaStorage($tempDir);
        $context = new HostContext('site-alpha', 'actor-1', 'es', []);

        $this->expectException(InvalidArgumentException::class);
        $storage->delete($context, '../malicious.png');
    }

    public function testSyncJobDispatcherExecutesRegisteredHandlers(): void
    {
        $dispatcher = new SyncJobDispatcher();
        self::assertInstanceOf(JobDispatcher::class, $dispatcher);

        $executed = false;
        $capturedPayload = [];
        $dispatcher->register('cache.invalidate', function (HostContext $ctx, array $payload) use (&$executed, &$capturedPayload): void {
            $executed = true;
            $capturedPayload = $payload;
        });

        $context = new HostContext('site-1', 'user-1', 'en', []);
        $dispatcher->dispatch($context, 'cache.invalidate', ['tag' => 'pages']);

        self::assertTrue($executed);
        self::assertSame(['tag' => 'pages'], $capturedPayload);
        self::assertCount(1, $dispatcher->getDispatched());
    }

    public function testNullMailDeliveryRecordsDispatchedEmails(): void
    {
        $mailer = new NullMailDelivery();
        self::assertInstanceOf(MailDelivery::class, $mailer);

        $context = new HostContext('site-1', 'user-1', 'en', []);
        $mailer->send($context, 'user@example.com', 'Welcome', 'Body content');

        $sent = $mailer->getSent();
        self::assertCount(1, $sent);
        self::assertSame('user@example.com', $sent[0]['recipient']);
        self::assertSame('Welcome', $sent[0]['subject']);
        self::assertSame('Body content', $sent[0]['textBody']);
    }

    public function testValidatePageDocumentAuthorizesAndValidatesDocument(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturnMap([
            ['page-1', ['id' => 'page-1', 'title' => 'Sample Page']],
            ['page-missing', null],
        ]);

        $media = $this->createMock(MediaRepositoryInterface::class);
        $media->method('findById')->willReturnMap([
            ['res-1', ['id' => 'res-1', 'filename' => 'hero.jpg']],
            ['res-alien', null],
        ]);

        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturnCallback(
            fn(HostContext $ctx, string $pageId) => $ctx->siteId === 'site-1' && $pageId === 'page-1'
        );

        $useCase = new ValidatePageDocument('site-1', $pages, $media, $auth);

        $validJson = json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-1',
            'revision' => 0,
            'root' => [
                ['id' => 'node-1', 'type' => 'container', 'props' => new \stdClass(), 'children' => []],
            ],
            'settings' => new \stdClass(),
            'resources' => ['res-1'],
        ], JSON_THROW_ON_ERROR);

        $document = DocumentEnvelope::fromJson($validJson);
        $authorizedContext = new HostContext('site-1', 'user-admin', 'es', ['pages.update']);

        // Should execute without exception
        $useCase->execute($authorizedContext, $document);
        self::assertSame('page-1', $document->documentId);
    }

    public function testValidatePageDocumentRejectsAlienSiteEvenWithValidPageId(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturn(['id' => 'page-1', 'title' => 'Sample']);

        $media = $this->createMock(MediaRepositoryInterface::class);
        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(true);

        $useCase = new ValidatePageDocument('site-tenant-a', $pages, $media, $auth);

        $document = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-1',
            'revision' => 0,
            'root' => [['id' => 'n1', 'type' => 'p', 'props' => new \stdClass(), 'children' => []]],
            'settings' => new \stdClass(),
            'resources' => [],
        ], JSON_THROW_ON_ERROR));

        // Context presents site-tenant-b targeting tenant-a connection
        $contextFromTenantB = new HostContext('site-tenant-b', 'user-1', 'es', ['pages.update']);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Page unavailable for this operation');
        $useCase->execute($contextFromTenantB, $document);
    }

    public function testValidatePageDocumentRejectsMissingCapability(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturn(['id' => 'page-1']);
        $media = $this->createMock(MediaRepositoryInterface::class);
        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(true);

        $useCase = new ValidatePageDocument('site-1', $pages, $media, $auth);

        $document = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-1',
            'revision' => 0,
            'root' => [['id' => 'n1', 'type' => 'p', 'props' => new \stdClass(), 'children' => []]],
            'settings' => new \stdClass(),
            'resources' => [],
        ], JSON_THROW_ON_ERROR));

        $contextWithoutUpdate = new HostContext('site-1', 'user-1', 'es', ['pages.read']);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Page unavailable for this operation');
        $useCase->execute($contextWithoutUpdate, $document);
    }

    public function testValidatePageDocumentRejectsUnverifiedMediaResource(): void
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturn(['id' => 'page-1']);
        $media = $this->createMock(MediaRepositoryInterface::class);
        $media->method('findById')->with('alien-media')->willReturn(null);

        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(true);

        $useCase = new ValidatePageDocument('site-1', $pages, $media, $auth);

        $document = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-1',
            'revision' => 0,
            'root' => [['id' => 'n1', 'type' => 'p', 'props' => new \stdClass(), 'children' => []]],
            'settings' => new \stdClass(),
            'resources' => ['alien-media'],
        ], JSON_THROW_ON_ERROR));

        $context = new HostContext('site-1', 'user-1', 'es', ['pages.update']);

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Resource is unavailable for this site');
        $useCase->execute($context, $document);
    }

    public function testTwoDistinctHostsUseSameCoreWithoutChangingDomainEntities(): void
    {
        // Host A: e.g. Ceiba Campus tenant connection
        $hostAPages = $this->createMock(PageRepositoryInterface::class);
        $hostAPages->method('findById')->willReturnMap([['page-campus', ['id' => 'page-campus']]]);
        $hostAMedia = $this->createMock(MediaRepositoryInterface::class);
        $hostAAuth = $this->createMock(DocumentAuthorization::class);
        $hostAAuth->method('canUpdate')->willReturn(true);
        $useCaseHostA = new ValidatePageDocument('tenant-campus', $hostAPages, $hostAMedia, $hostAAuth);

        // Host B: e.g. Standalone host connection
        $hostBPages = $this->createMock(PageRepositoryInterface::class);
        $hostBPages->method('findById')->willReturnMap([['page-standalone', ['id' => 'page-standalone']]]);
        $hostBMedia = $this->createMock(MediaRepositoryInterface::class);
        $hostBAuth = $this->createMock(DocumentAuthorization::class);
        $hostBAuth->method('canUpdate')->willReturn(true);
        $useCaseHostB = new ValidatePageDocument('standalone-site', $hostBPages, $hostBMedia, $hostBAuth);

        // Contexts resolved by respective hosts
        $contextA = new HostContext('tenant-campus', 'admin-a', 'es', ['pages.update']);
        $contextB = new HostContext('standalone-site', 'admin-b', 'en', ['pages.update']);

        $docA = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-campus',
            'revision' => 0,
            'root' => [['id' => 'node-a', 'type' => 'section', 'props' => new \stdClass(), 'children' => []]],
            'settings' => new \stdClass(),
            'resources' => [],
        ], JSON_THROW_ON_ERROR));

        $docB = DocumentEnvelope::fromJson(json_encode([
            'schemaVersion' => 1,
            'documentId' => 'page-standalone',
            'revision' => 0,
            'root' => [['id' => 'node-b', 'type' => 'article', 'props' => new \stdClass(), 'children' => []]],
            'settings' => new \stdClass(),
            'resources' => [],
        ], JSON_THROW_ON_ERROR));

        // Both hosts successfully use the core use case
        $useCaseHostA->execute($contextA, $docA);
        $useCaseHostB->execute($contextB, $docB);

        // Cross-host invocation A -> Host B fails
        try {
            $useCaseHostB->execute($contextA, $docA);
            self::fail('Host B should have rejected Context A');
        } catch (RuntimeException $e) {
            self::assertSame('Page unavailable for this operation', $e->getMessage());
        }

        // Cross-host invocation B -> Host A fails
        try {
            $useCaseHostA->execute($contextB, $docB);
            self::fail('Host A should have rejected Context B');
        } catch (RuntimeException $e) {
            self::assertSame('Page unavailable for this operation', $e->getMessage());
        }
    }
}
