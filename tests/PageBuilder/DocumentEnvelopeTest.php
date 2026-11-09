<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder;

use InvalidArgumentException;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use PHPUnit\Framework\TestCase;

final class DocumentEnvelopeTest extends TestCase
{
    private const TREE = [[
        'id' => 'root', 'type' => 'section', 'name' => null,
        'props' => ['class' => 'hero'],
        'futureExtension' => ['value' => 17],
        'children' => [['id' => 'title', 'type' => 'h1', 'children' => []]],
    ]];

    public function testLegacyTreeWrapsWithoutLosingNodeData(): void
    {
        $document = DocumentEnvelope::fromArray(self::TREE, 'page-1');
        self::assertSame(self::TREE, $document->toArray()['root']);
        self::assertSame(0, $document->revision);
        self::assertSame(DocumentEnvelope::VERSION, $document->toArray()['schemaVersion']);
    }

    public function testVersionedDocumentRoundTrips(): void
    {
        $data = [
            'schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => 3,
            'root' => self::TREE, 'settings' => ['locale' => 'es'],
            'resources' => ['media-1'],
        ];
        self::assertSame($data, DocumentEnvelope::fromArray($data)->toArray());
    }

    public function testRejectsInvalidOrFutureDocuments(): void
    {
        $valid = DocumentEnvelope::fromArray(self::TREE, 'page-1')->toArray();
        foreach ([
            array_replace($valid, ['schemaVersion' => 2]),
            array_replace($valid, ['extra' => 'lost']),
            array_replace($valid, ['root' => [['id' => 'a', 'type' => 'div'], ['id' => 'a', 'type' => 'div']]]),
            array_replace($valid, ['root' => [['id' => 'a', 'type' => 'div', 'children' => ['bad']]]]),
        ] as $invalid) {
            try {
                DocumentEnvelope::fromArray($invalid);
                self::fail('Expected invalid document to be rejected');
            } catch (InvalidArgumentException) {
                self::assertTrue(true);
            }
        }
    }
}
