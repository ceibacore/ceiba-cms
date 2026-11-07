<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\Media\Domain\Repository\MediaRepositoryInterface;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Application\ValidatePageDocument;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Catalogue\ComponentDescriptor;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Document\DocumentMigrator;
use LemurCms\PageBuilder\Domain\Document\HostContext;
use LemurCms\PageBuilder\Presentation\Api\EditorApiController;
use LemurCms\PageBuilder\Presentation\Api\EditorError;
use LemurCms\PageBuilder\Presentation\Api\NegotiatedCapabilities;
use PHPUnit\Framework\TestCase;

final class EditorApiAndCatalogueTest extends TestCase
{
    public function testComponentDescriptorValidatesVersionAndName(): void
    {
        $descriptor = new ComponentDescriptor(
            name: 'hero_banner',
            version: 1,
            label: 'Hero Banner',
            category: 'marketing',
            propsSchema: ['title' => ['type' => 'string']],
            allowedChildren: ['button', 'text'],
            allowedParents: ['container'],
            editorControls: ['title' => ['type' => 'text']],
            capabilities: ['styles', 'responsive'],
            isContainer: true
        );

        self::assertSame('hero_banner', $descriptor->name);
        self::assertSame(1, $descriptor->version);
        self::assertTrue($descriptor->isContainer);
        self::assertSame(['button', 'text'], $descriptor->allowedChildren);

        $array = $descriptor->toArray();
        self::assertSame('hero_banner', $array['name']);
        self::assertSame('marketing', $array['category']);

        $this->expectException(InvalidArgumentException::class);
        new ComponentDescriptor(name: '', version: 1, label: 'Invalid', category: 'basic');
    }

    public function testComponentDescriptorRejectsInvalidVersion(): void
    {
        $this->expectException(InvalidArgumentException::class);
        new ComponentDescriptor(name: 'valid_name', version: 0, label: 'Invalid', category: 'basic');
    }

    public function testComponentCatalogueRegistersAndDiagnosesComponents(): void
    {
        $catalogue = ComponentCatalogue::createDefault();

        self::assertTrue($catalogue->has('container'));
        self::assertTrue($catalogue->has('heading'));
        self::assertTrue($catalogue->has('html'));
        self::assertFalse($catalogue->has('unknown_custom_plugin'));

        // Known component has null diagnosis
        self::assertNull($catalogue->diagnose('container'));

        // Unknown component produces recoverable diagnostic to retain data without mutation
        $diag = $catalogue->diagnose('unknown_custom_plugin');
        self::assertNotNull($diag);
        self::assertSame('unknown_custom_plugin', $diag['type']);
        self::assertFalse($diag['isKnown']);
        self::assertSame('retained_as_data', $diag['status']);
        self::assertTrue($diag['recoverable']);
    }

    public function testEditorErrorFormatsStructuredSanitizedEnvelope(): void
    {
        $error = EditorError::create(
            code: 'VALIDATION_FAILED',
            message: 'Invalid tree depth',
            fieldErrors: ['root[0].children' => 'Depth exceeds 15 levels'],
            requestId: 'req_test_123'
        );

        $payload = $error->toArray();
        self::assertArrayHasKey('error', $payload);
        self::assertSame('VALIDATION_FAILED', $payload['error']['code']);
        self::assertSame('Invalid tree depth', $payload['error']['message']);
        self::assertSame('req_test_123', $payload['error']['requestId']);
        self::assertArrayHasKey('root[0].children', $payload['error']['fieldErrors']);
        self::assertArrayNotHasKey('trace', $payload['error']);
        self::assertArrayNotHasKey('file', $payload['error']);
    }

    public function testNegotiatedCapabilitiesReturnsVersionAndPermissions(): void
    {
        $context = new HostContext('site-1', 'user-editor', 'es', ['pages.read', 'pages.update']);
        $catalogue = ComponentCatalogue::createDefault();

        $negotiated = NegotiatedCapabilities::negotiate($context, $catalogue);
        $array = $negotiated->toArray();

        self::assertSame('site-1', $array['siteId']);
        self::assertSame('user-editor', $array['actorId']);
        self::assertSame('es', $array['locale']);
        self::assertSame([1], $array['supportedSchemaVersions']);
        self::assertSame(['pages.read', 'pages.update'], $array['effectivePermissions']);
        self::assertNotEmpty($array['components']);
        self::assertTrue($array['features']['retainedUnknownComponents']);
    }

    public function testEditorApiControllerCapabilitiesAndComponents(): void
    {
        $controller = $this->createController('site-1', static function (): HostContext {
            self::assertSame([], func_get_args());
            return new HostContext('site-1', 'actor-test', 'en', ['pages.read']);
        });

        $forgedHeaders = [
            'X-Site-Id' => 'other-site',
            'X-Actor-Id' => 'admin',
            'X-Locale' => 'es',
            'X-Capabilities' => 'pages.read,pages.update',
        ];
        $capRes = $controller->capabilities($forgedHeaders);

        self::assertTrue($capRes['success']);
        self::assertSame('site-1', $capRes['data']['siteId']);
        self::assertSame('actor-test', $capRes['data']['actorId']);
        self::assertSame('en', $capRes['data']['locale']);
        self::assertSame(['pages.read'], $capRes['data']['effectivePermissions']);
        self::assertFalse($controller->migratePage('page-abc', $forgedHeaders)['success']);

        $compRes = $controller->components();
        self::assertTrue($compRes['success']);
        self::assertNotEmpty($compRes['data']['components']);

        $knownDiag = $controller->diagnoseComponent('container');
        self::assertTrue($knownDiag['success']);
        self::assertTrue($knownDiag['data']['isKnown']);

        $unknownDiag = $controller->diagnoseComponent('non_existent_widget');
        self::assertTrue($unknownDiag['success']);
        self::assertFalse($unknownDiag['data']['isKnown']);
        self::assertSame('retained_as_data', $unknownDiag['data']['status']);
    }

    public function testEditorApiControllerValidatesDocumentSuccessfully(): void
    {
        $controller = $this->createController('site-1', static fn () => new HostContext('site-1', 'user-1', 'es', ['pages.update']));

        $validPayload = [
            'schemaVersion' => 1,
            'documentId'    => 'page-abc',
            'revision'      => 0,
            'root'          => [
                ['id' => 'hero-1', 'type' => 'container', 'props' => (object) [], 'children' => []],
            ],
            'settings'      => (object) [],
            'resources'     => ['res-logo'],
        ];

        $res = $controller->validatePage('page-abc', $validPayload);

        self::assertTrue($res['success']);
        self::assertTrue($res['data']['valid']);
        self::assertSame('page-abc', $res['data']['documentId']);
    }

    public function testEditorApiControllerRejectsInvalidDocumentWithStructuredError(): void
    {
        $controller = $this->createController('site-1', static fn () => new HostContext('site-1', 'user-1', 'es', ['pages.update']));

        // Document has nodes missing ID (rejected by v1 validator)
        $invalidPayload = [
            'schemaVersion' => 1,
            'documentId'    => 'page-abc',
            'revision'      => 0,
            'root'          => [
                ['type' => 'container', 'children' => []],
            ],
            'settings'      => (object) [],
            'resources'     => [],
        ];

        $res = $controller->validatePage('page-abc', $invalidPayload);

        self::assertFalse($res['success']);
        self::assertSame(422, $res['status']);
        self::assertArrayHasKey('error', $res);
        self::assertSame('VALIDATION_FAILED', $res['error']['code']);
        self::assertNotEmpty($res['error']['requestId']);
    }

    public function testTwoDistinctHostsConsumeSameCoreWithoutChangingDomainEntities(): void
    {
        // Host 1: Ceiba Campus (tenant 'tenant_moodle_101')
        $campusPages = $this->createMock(PageRepositoryInterface::class);
        $campusPages->method('findById')->willReturnMap([
            ['campus_home', ['id' => 'campus_home', 'content' => [['type' => 'p', 'props' => ['content' => 'Campus Home']]]]],
        ]);
        $campusMedia = $this->createMock(MediaRepositoryInterface::class);
        $campusMedia->method('findById')->willReturnMap([
            ['campus_logo', ['id' => 'campus_logo']],
        ]);
        $campusAuth = $this->createMock(DocumentAuthorization::class);
        $campusAuth->method('canUpdate')->willReturn(true);
        $campusCatalogue = ComponentCatalogue::createDefault();

        $campusValidator = new ValidatePageDocument('tenant_moodle_101', $campusPages, $campusMedia, $campusAuth);
        $campusContext = new HostContext('tenant_moodle_101', 'prof_1', 'es', ['pages.read', 'pages.update']);
        $campusController = new EditorApiController(
            prefix: '/api/builder/v1',
            siteId: 'tenant_moodle_101',
            pages: $campusPages,
            media: $campusMedia,
            authorization: $campusAuth,
            migrator: new DocumentMigrator(),
            validator: $campusValidator,
            catalogue: $campusCatalogue,
            contextResolver: static fn () => $campusContext
        );

        // Host 2: Standalone headless store ('headless_store_prod')
        $storePages = $this->createMock(PageRepositoryInterface::class);
        $storePages->method('findById')->willReturnMap([
            ['store_home', ['id' => 'store_home', 'content' => [['type' => 'heading', 'props' => ['text' => 'Store Front']]]]],
        ]);
        $storeMedia = $this->createMock(MediaRepositoryInterface::class);
        $storeMedia->method('findById')->willReturnMap([
            ['product_img', ['id' => 'product_img']],
        ]);
        $storeAuth = $this->createMock(DocumentAuthorization::class);
        $storeAuth->method('canUpdate')->willReturn(true);
        $storeCatalogue = ComponentCatalogue::createDefault();

        $storeValidator = new ValidatePageDocument('headless_store_prod', $storePages, $storeMedia, $storeAuth);
        $activeContext = new HostContext('headless_store_prod', 'merchant_9', 'en', ['pages.read', 'pages.update']);
        $storeController = new EditorApiController(
            prefix: '/cms/v1/editor', // Configurable prefix in Host 2!
            siteId: 'headless_store_prod',
            pages: $storePages,
            media: $storeMedia,
            authorization: $storeAuth,
            migrator: new DocumentMigrator(),
            validator: $storeValidator,
            catalogue: $storeCatalogue,
            contextResolver: static function () use (&$activeContext): HostContext { return $activeContext; }
        );

        // 1. Host 1 negotiates capabilities and validates its own page
        $campusCaps = $campusController->capabilities();
        self::assertTrue($campusCaps['success']);
        self::assertSame('tenant_moodle_101', $campusCaps['data']['siteId']);

        $campusValidRes = $campusController->validatePage('campus_home', [
            'schemaVersion' => 1,
            'documentId'    => 'campus_home',
            'revision'      => 0,
            'root'          => [['id' => 'n1', 'type' => 'container', 'props' => (object) [], 'children' => []]],
            'settings'      => (object) [],
            'resources'     => ['campus_logo'],
        ]);
        self::assertTrue($campusValidRes['success']);

        // 2. Host 2 negotiates capabilities and validates its own page
        $storeCaps = $storeController->capabilities();
        self::assertTrue($storeCaps['success']);
        self::assertSame('/cms/v1/editor', $storeController->prefix);

        $storeValidRes = $storeController->validatePage('store_home', [
            'schemaVersion' => 1,
            'documentId'    => 'store_home',
            'revision'      => 0,
            'root'          => [['id' => 's1', 'type' => 'container', 'props' => (object) [], 'children' => []]],
            'settings'      => (object) [],
            'resources'     => ['product_img'],
        ]);
        self::assertTrue($storeValidRes['success']);

        // 3. Cross-host intrusion attempt: Host 1 actor targets Host 2 connection with valid page ID
        $activeContext = $campusContext;
        $intrusionRes = $storeController->validatePage('store_home', [
            'schemaVersion' => 1,
            'documentId'    => 'store_home',
            'revision'      => 0,
            'root'          => [['id' => 's1', 'type' => 'container', 'props' => (object) [], 'children' => []]],
            'settings'      => (object) [],
            'resources'     => ['product_img'],
        ]);

        self::assertFalse($intrusionRes['success'], 'Cross-site request must be rejected even with valid page ID');
        self::assertSame(403, $intrusionRes['status']);
        self::assertSame('AUTHORIZATION_DENIED', $intrusionRes['error']['code']);
    }

    public function testMissingServerContextDeniesProtectedOperationsDespiteHeaders(): void
    {
        $controller = $this->createController('site-1', null);
        $headers = ['X-Site-Id' => 'site-1', 'X-Actor-Id' => 'admin', 'X-Capabilities' => 'pages.read,pages.update'];
        foreach ([
            $controller->capabilities($headers),
            $controller->showPage('page-abc', $headers),
            $controller->migratePage('page-abc', $headers),
            $controller->validatePage('page-abc', [], $headers),
        ] as $response) {
            self::assertFalse($response['success']);
            self::assertArrayNotHasKey('data', $response);
        }
    }

    private function createController(string $siteId, ?callable $contextResolver): EditorApiController
    {
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findById')->willReturnMap([
            ['page-abc', ['id' => 'page-abc', 'title' => 'Sample Page', 'content' => []]],
        ]);

        $media = $this->createMock(MediaRepositoryInterface::class);
        $media->method('findById')->willReturnMap([
            ['res-logo', ['id' => 'res-logo', 'filename' => 'logo.png']],
        ]);

        $auth = $this->createMock(DocumentAuthorization::class);
        $auth->method('canUpdate')->willReturn(true);

        $validator = new ValidatePageDocument($siteId, $pages, $media, $auth);
        $migrator = new DocumentMigrator();
        $catalogue = ComponentCatalogue::createDefault();

        return new EditorApiController(
            prefix: '/api/builder/v1',
            siteId: $siteId,
            pages: $pages,
            media: $media,
            authorization: $auth,
            migrator: $migrator,
            validator: $validator,
            catalogue: $catalogue,
            contextResolver: $contextResolver
        );
    }
}
