<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\UpdatePage;
use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Entity\Node;
use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\LoopResolver;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;
use LemurCms\PageBuilder\Domain\Service\TreeValidator;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Domain\Service\VariableInterpolator;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use LemurCms\PageBuilder\Import\HtmlImporter;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class LegacyDocumentCompatibilityTest extends TestCase
{
    public static function legacyTrees(): iterable
    {
        foreach (['campus-editor', 'legacy-body', 'seeded-hero'] as $name) {
            yield $name => [self::fixture($name)];
        }
    }

    #[DataProvider('legacyTrees')]
    public function testDirectCreateAndUpdatePreserveLegacyPayloads(array $tree): void
    {
        $this->assertSavedWithoutChanges($tree);
    }

    private function assertSavedWithoutChanges(array $tree): void
    {
        $payload = ['title' => 'Compatibility fixture', 'content' => $tree];
        $repo = $this->createMock(PageRepositoryInterface::class);
        $repo->method('findById')->with('page-fixture')->willReturn($payload);
        $saved = [];
        $repo->expects(self::exactly(2))->method('save')
            ->willReturnCallback(static function (array $data) use (&$saved): string {
                $saved[] = $data;
                return 'page-fixture';
            });

        self::assertSame('page-fixture', (new CreatePage($repo, new TreeNormalizer()))->execute($payload));
        (new UpdatePage($repo, new TreeNormalizer()))->execute('page-fixture', $payload);

        self::assertSame($payload, $saved[0]);
        self::assertSame($payload + ['id' => 'page-fixture'], $saved[1]);
    }

    public function testCampusIdentifiersAreNotCurrentlyAcceptedByNode(): void
    {
        $tree = self::fixture('campus-editor');
        self::assertNotEmpty((new TreeValidator())->validate($tree));
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Node missing id');
        Node::fromArray($tree[0]);
    }

    public function testLegacyHtmlWithoutIdentifiersStillRenders(): void
    {
        $tree = self::fixture('legacy-body');
        self::assertSame('<p>Contenido anterior</p>', $this->renderer()->renderPage($tree));
        self::assertNotEmpty((new TreeValidator())->validate($tree));
    }

    public function testSeededComponentTypesNeedMigrationBeforeHtmlTagValidation(): void
    {
        $tree = self::fixture('seeded-hero');
        self::assertSame('container', Node::fromArray($tree[0])->type);
        self::assertStringContainsString("unknown HTML tag 'container'", implode('; ', (new TreeValidator())->validate($tree)));
        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        $html = $this->renderer($registry)->renderPage($tree);
        self::assertStringContainsString('Construye algo increíble', $html);
        self::assertStringContainsString('Comenzar ahora', $html);
        self::assertStringNotContainsString('<container', $html);
    }

    public function testImportedSemanticNodesSurviveSaveAndBothRenderers(): void
    {
        $html = '<section class="intro"><h1>Ejemplo</h1><p>Contenido</p></section>';
        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        foreach ([null, $registry] as $framework) {
            $tree = (new HtmlImporter($framework))->import($html)->toArray()['tree'];
            self::assertSame([], (new TreeValidator())->validate($tree));
            self::assertNotEmpty(Node::fromArray($tree[0])->id);
            $this->assertSavedWithoutChanges($tree);
            $rendered = new \DOMDocument();
            $rendered->loadHTML($this->renderer($framework)->renderPage($tree), LIBXML_NOERROR);
            $xpath = new \DOMXPath($rendered);
            self::assertSame(1, $xpath->query('//section')->length);
            self::assertSame('Ejemplo', $xpath->evaluate('string(//section/h1)'));
            self::assertSame('Contenido', $xpath->evaluate('string(//section/p)'));
            self::assertSame(1, $xpath->query('//section[contains(concat(" ", normalize-space(@class), " "), " intro ")]')->length);
        }
    }

    public function testDirectSavePreservesUnknownNestedExtensions(): void
    {
        $tree = self::fixture('campus-editor');
        $tree[0]['extension'] = ['version' => 2, 'enabled' => false];
        $tree[0]['children'][0]['extension'] = ['locale' => 'es', 'values' => [0, null, '']];
        $this->assertSavedWithoutChanges($tree);
    }

    private static function fixture(string $name): array
    {
        $path = dirname(__DIR__, 2) . '/Fixtures/PageBuilder/' . $name . '.json';
        return json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR)['tree'];
    }

    private function renderer(?UiFrameworkRegistry $registry = null): BladeRenderer
    {
        return new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $registry);
    }
}
