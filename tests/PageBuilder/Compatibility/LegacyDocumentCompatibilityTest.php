<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Compatibility;

use InvalidArgumentException;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\SavePageContent;
use LemurCms\Page\Application\SavePageDraft;
use LemurCms\Tests\Support\RevisionSchema;
use LemurCms\PageBuilder\Domain\Entity\Node;
use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\LoopResolver;
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
    public function testCreateAndSaveKeepEditorPayloadsWithoutLoss(array $tree): void
    {
        $this->savedCanonicalTree($tree);
    }

    /**
     * Creates the page through CreatePage, saves the same tree again through
     * SavePageContent and returns the canonical root stored in the revisions.
     * Fails if saving is not stable or loses any scalar value of the editor tree.
     */
    private function savedCanonicalTree(array $tree): array
    {
        $db = RevisionSchema::create();
        $id = (new CreatePage($db, 'site-1'))->execute(['title' => 'Compatibility fixture', 'slug' => 'fixture', 'content' => $tree]);
        (new SavePageContent(new SavePageDraft($db, 'site-1')))->execute($id, $tree, 1, 'editor-1');
        $roots = array_map(static fn (string $snapshot) => json_decode($snapshot, true)['root'],
            $db->pdo()->query("SELECT snapshot FROM {$db->getPrefix()}page_revisions ORDER BY revision")->fetchAll(\PDO::FETCH_COLUMN));
        self::assertCount(2, $roots);
        self::assertSame($roots[0], $roots[1], 'Saving the same tree twice must be stable');
        self::assertSame($roots[0], json_decode($db->pdo()->query("SELECT content FROM {$db->getPrefix()}pages")->fetchColumn(), true));
        $scalars = static function (array $node) use (&$scalars): array {
            $values = [];
            array_walk_recursive($node, static function ($value) use (&$values): void {
                if ($value !== null && $value !== '' && !is_bool($value)) {
                    $values[] = (string) $value;
                }
            });
            return $values;
        };
        $stored = json_encode($roots[0], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        foreach ($scalars($tree) as $value) {
            // Compare in JSON-escaped form so quotes and backslashes match the stored encoding.
            self::assertStringContainsString(trim(json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), '"'), $stored);
        }
        return $roots[0];
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
            $stored = $this->savedCanonicalTree($tree);
            $rendered = new \DOMDocument();
            $rendered->loadHTML($this->renderer($framework)->renderPage($stored), LIBXML_NOERROR);
            $xpath = new \DOMXPath($rendered);
            self::assertSame(1, $xpath->query('//section')->length);
            self::assertSame('Ejemplo', $xpath->evaluate('string(//section/h1)'));
            self::assertSame('Contenido', $xpath->evaluate('string(//section/p)'));
            self::assertSame(1, $xpath->query('//section[contains(concat(" ", normalize-space(@class), " "), " intro ")]')->length);
        }
    }

    public function testSavePreservesUnknownNestedExtensions(): void
    {
        $tree = self::fixture('campus-editor');
        $tree[0]['extension'] = ['version' => 2, 'enabled' => false];
        $tree[0]['children'][0]['extension'] = ['locale' => 'es', 'values' => [0, null, '']];
        $stored = $this->savedCanonicalTree($tree);
        self::assertSame(['version' => 2, 'enabled' => false], $stored[0]['extension']);
        self::assertSame(['locale' => 'es', 'values' => [0, null, '']], $stored[0]['children'][0]['extension']);
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
