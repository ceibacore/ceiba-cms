<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Style;

use CeibaCms\PageBuilder\Domain\Style\StyleCompiler;
use CeibaCms\PageBuilder\Domain\Style\StyledNodes;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

/**
 * The PHP compiler gives, byte for byte, the CSS and diagnostics of fixtures/styles, which the editor's TypeScript
 * compiler also has to give (plan 04 D-5). A difference fails both CIs.
 */
final class StyleFixturesTest extends TestCase
{
    /** @return iterable<string, array{array<string, mixed>}> */
    public static function fixtures(): iterable
    {
        foreach (glob(dirname(__DIR__, 3) . '/fixtures/styles/*.json') ?: [] as $file) {
            yield basename($file, '.json') => [json_decode((string) file_get_contents($file), true, 512, JSON_THROW_ON_ERROR)];
        }
    }

    #[DataProvider('fixtures')]
    public function testCompilerMatchesTheSharedFixture(array $fixture): void
    {
        $compiled = StyleCompiler::compile($fixture['design'], $fixture['nodes']);
        self::assertSame($fixture['css'], $compiled->css);
        self::assertSame($fixture['diagnostics'], $compiled->diagnostics);
    }

    public function testTheSameInputAlwaysGivesTheSameOutput(): void
    {
        foreach (self::fixtures() as [$fixture]) {
            self::assertEquals(StyleCompiler::compile($fixture['design'], $fixture['nodes']),
                StyleCompiler::compile($fixture['design'], $fixture['nodes']));
        }
    }

    public function testStyledNodesAndTheirClassesComeFromTheDocument(): void
    {
        $root = [['id' => 'a', 'type' => 'div', 'styles' => ['classes' => ['hero', 'gone'], 'base' => ['color' => '#fff']], 'children' => [
            ['_id' => 'b', 'type' => 'p', 'styles' => ['classes' => ['hero']], 'children' => []],
            ['id' => 'c', 'type' => 'p', 'children' => []],
        ]]];
        $nodes = StyledNodes::collect($root);
        self::assertSame(['a', 'b'], array_column($nodes, 'id'));
        $design = ['classes' => ['hero' => ['styles' => []]]];
        self::assertSame(['cms-c-hero', 'cms-n-a'], StyledNodes::classNames('a', $nodes[0]['styles'], $design));
        self::assertSame(['cms-c-hero'], StyledNodes::classNames('b', $nodes[1]['styles'], $design));
    }
}
