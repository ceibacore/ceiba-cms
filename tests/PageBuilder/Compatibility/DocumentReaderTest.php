<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class DocumentReaderTest extends TestCase
{
    public static function fixtures(): iterable
    {
        foreach (['campus-editor', 'legacy-body', 'seeded-hero'] as $name) {
            yield $name => [$name];
        }
    }

    #[DataProvider('fixtures')]
    public function testLegacyTreeCanBeReopenedAsVersionOne(string $name): void
    {
        $path = dirname(__DIR__, 2) . '/Fixtures/PageBuilder/' . $name . '.json';
        $tree = json_decode(file_get_contents($path), false, 512, JSON_THROW_ON_ERROR)->tree;
        $reader = DocumentEnvelope::fromJson(json_encode($tree, JSON_THROW_ON_ERROR), 'page-1');
        self::assertSame(0, $reader->sourceVersion);

        $json = $reader->toJson();
        $envelope = json_decode($json, false, 512, JSON_THROW_ON_ERROR);
        self::assertSame(1, $envelope->schemaVersion);
        self::assertSame('page-1', $envelope->documentId);
        self::assertSame(0, $envelope->revision);
        self::assertEquals($tree, $envelope->root);
        self::assertInstanceOf(\stdClass::class, $envelope->settings);
        self::assertSame([], $envelope->resources);

        $reopened = DocumentEnvelope::fromJson($json);
        self::assertSame(1, $reopened->sourceVersion);
        self::assertJsonStringEqualsJsonString($json, $reopened->toJson());
    }

    public function testStoredBodyBecomesRenderableHtml(): void
    {
        $document = DocumentEnvelope::fromJson('{"body":"<p>Contenido anterior</p>"}', 'page-1');
        self::assertSame([[
            'type' => 'html', 'props' => ['content' => '<p>Contenido anterior</p>'], 'children' => [],
        ]], $document->root());
    }

    public function testRoundTripPreservesJsonObjectAndArrayShapesInsideExtensions(): void
    {
        $json = <<<'JSON'
        {
            "schemaVersion":1, "documentId":"versioned", "revision":2,
            "root":[{"id":"section","type":"section","props":{},"bindings":{},
                "children":[],"plugin":{"0":{},"1":[[],{},false,null]}}],
            "settings":{"0":{},"1":[]}, "resources":["image-1"]
        }
        JSON;
        $reader = DocumentEnvelope::fromJson($json, 'unused-legacy-id');
        self::assertSame(1, $reader->sourceVersion);
        $result = json_decode($reader->toJson(), false, 512, JSON_THROW_ON_ERROR);
        self::assertEquals(json_decode($json, false, 512, JSON_THROW_ON_ERROR), $result);
        self::assertInstanceOf(\stdClass::class, $result->root[0]->props);
        self::assertInstanceOf(\stdClass::class, $result->root[0]->plugin);
        self::assertSame([], $result->settings->{'1'});
    }

    public static function invalidDocuments(): iterable
    {
        $fields = [
            'schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => 0,
            'root' => [], 'settings' => (object) [], 'resources' => [],
        ];
        $changes = [
            'future version' => ['schemaVersion' => 2],
            'string version' => ['schemaVersion' => '1'],
            'negative revision' => ['revision' => -1],
            'empty document ID' => ['documentId' => ''],
            'object as root list' => ['root' => (object) []],
            'list as settings map' => ['settings' => []],
            'object as resource list' => ['resources' => (object) []],
            'non-string resource' => ['resources' => [42]],
            'unrecognized envelope key' => ['futureSetting' => true],
            'node missing type' => ['root' => [(object) ['id' => 'id']]],
            'object as children list' => ['root' => [['type' => 'p', 'children' => (object) []]]],
        ];
        foreach ($changes as $case => $changeset) {
            $document = array_replace($fields, $changeset);
            yield $case => [json_encode($document, JSON_THROW_ON_ERROR), 'page-1'];
        }
        unset($fields['schemaVersion']);
        yield 'missing version on object' => [json_encode($fields, JSON_THROW_ON_ERROR), 'page-1'];
        yield 'empty object is not a legacy list' => ['{}', 'page-1'];
        yield 'empty legacy tree requires identity' => ['[]', null];
        yield 'scalar root' => ['false', 'page-1'];
        yield 'scalar node' => ['[42]', 'page-1'];
    }

    #[DataProvider('invalidDocuments')]
    public function testRejectsUnsupportedDocuments(string $json, ?string $pageId): void
    {
        $this->expectException(InvalidArgumentException::class);
        DocumentEnvelope::fromJson($json, $pageId);
    }
}
