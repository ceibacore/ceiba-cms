<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\UpdatePage;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;
use LemurCms\PageBuilder\Domain\Document\DocumentEnvelope;
use LemurCms\PageBuilder\Domain\Document\DocumentWriteValidator;
use PHPUnit\Framework\TestCase;

final class DocumentWriteValidatorTest extends TestCase
{
    public function testCreateRejectsRecursivePhpTreeBeforeNormalization(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->expects(self::never())->method('save');
        $tree = [['type' => 'div', 'id' => 'node']];
        $tree[0]['children'] = &$tree;
        $this->expectException(InvalidArgumentException::class);
        (new CreatePage($repo, new TreeNormalizer()))->execute(['content' => $tree]);
    }

    public function testUpdateRejectsDuplicateIdsInSerializedContentBeforeSave(): void
    {
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findById')->willReturn(['id' => 'page']);
        $repo->expects(self::never())->method('save');
        $this->expectException(InvalidArgumentException::class);
        (new UpdatePage($repo, new TreeNormalizer()))->execute('page', [
            'content' => '[{"type":"p","id":"shared"},{"type":"p","_id":"shared"}]',
        ]);
    }

    public function testAcceptsBothIdentifierFormatsAndChecksEveryResource(): void
    {
        $tree = [['id' => 'section', 'type' => 'section', 'children' => [
            ['_id' => 'campus001', 'type' => 'p'],
        ]]];
        $seen = [];
        (new DocumentWriteValidator())->validate(self::document($tree, ['logo', 'cover']), static function (string $id) use (&$seen): bool {
            $seen[] = $id;
            return true;
        });
        self::assertEqualsCanonicalizing(['logo', 'cover'], $seen);
    }

    public function testRejectsAReferenceOutsideTheSite(): void
    {
        $document = self::document([], ['logo', 'foreign-cover']);
        $this->expectException(InvalidArgumentException::class);
        (new DocumentWriteValidator())->validate($document, static fn (string $id): bool => $id === 'logo');
    }

    public function testRejectsANodeWithoutEitherIdentifier(): void
    {
        $document = self::document([['type' => 'p']]);
        $this->expectException(InvalidArgumentException::class);
        $this->validate($document);
    }

    public function testRejectsDuplicateIdentifiersAcrossRootAndNestedNodes(): void
    {
        $document = self::document([
            ['id' => 'shared', 'type' => 'h1'],
            ['id' => 'container', 'type' => 'section', 'children' => [
                ['_id' => 'shared', 'type' => 'p'],
            ]],
        ]);
        $this->expectException(InvalidArgumentException::class);
        $this->validate($document);
    }

    public function testCountsAllNodesIncludingChildren(): void
    {
        $children = [];
        for ($index = 1; $index < 500; $index++) {
            $children[] = ['id' => "child-{$index}", 'type' => 'p'];
        }
        $tree = [['id' => 'parent', 'type' => 'section', 'children' => $children]];
        $this->validate(self::document($tree));

        $tree[0]['children'][] = ['id' => 'child-500', 'type' => 'p'];
        $this->expectException(InvalidArgumentException::class);
        $this->validate(self::document($tree));
    }

    public function testRootDepthIsZeroAndDepthFifteenIsAccepted(): void
    {
        $tree = [['id' => 'leaf', 'type' => 'p']];
        for ($index = 1; $index <= 15; $index++) {
            $tree = [['id' => "level-{$index}", 'type' => 'div', 'children' => $tree]];
        }
        $this->validate(self::document($tree));

        $tree = [['id' => 'extra', 'type' => 'div', 'children' => $tree]];
        $this->expectException(InvalidArgumentException::class);
        $this->validate(self::document($tree));
    }

    public function testCountsSerializedBytesIncludingMultibyteText(): void
    {
        $tree = [['id' => 'copy', 'type' => 'p', 'props' => ['text' => 'á']]];
        $padding = 2_000_000 - strlen(self::document($tree)->toJson());
        $tree[0]['props']['text'] .= str_repeat('x', $padding);
        $atLimit = self::document($tree);
        self::assertSame(2_000_000, strlen($atLimit->toJson()));
        $this->validate($atLimit);

        $tree[0]['props']['text'] .= 'x';
        $this->expectException(InvalidArgumentException::class);
        $this->validate(self::document($tree));
    }

    private function validate(DocumentEnvelope $document): void
    {
        (new DocumentWriteValidator())->validate($document, static fn (string $id): bool => true);
    }

    private static function document(array $tree, array $resources = []): DocumentEnvelope
    {
        $data = [
            'schemaVersion' => 1, 'documentId' => 'page-1', 'revision' => 0,
            'root' => $tree, 'settings' => (object) [], 'resources' => $resources,
        ];
        return DocumentEnvelope::fromJson(json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE));
    }
}
