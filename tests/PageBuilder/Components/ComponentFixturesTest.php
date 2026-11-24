<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Components;

use CeibaCms\Media\Domain\Resolver\MediaPropsDecorator;
use CeibaCms\Media\Domain\Resolver\ResolvedMedia;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

/**
 * The Bootstrap 5 views give the markup of fixtures/components, which the editor canvas also has to give
 * (plan 05-B: "el mismo resultado en el lienzo y en la vista del servidor").
 */
final class ComponentFixturesTest extends TestCase
{
    /** @return iterable<string, array{array<string, mixed>, array<string, mixed>}> */
    public static function cases(): iterable
    {
        foreach (glob(dirname(__DIR__, 3) . '/fixtures/components/*.json') ?: [] as $file) {
            $fixture = json_decode((string) file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
            foreach ($fixture['cases'] as $i => $case) {
                yield "{$fixture['name']} #" . ($i + 1) => [$fixture['media'], $case];
            }
        }
    }

    public static function render(array $tree, array $media): string
    {
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $resolved = [];
        foreach ($media as $id => $m) {
            $resolved[$id] = new ResolvedMedia($id, $m['url'], $m['width'], $m['height'], $m['alt'], $m['variants']);
        }
        $html = (new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks))
            ->renderPage((new MediaPropsDecorator($resolved))->apply($tree), []);
        return trim((string) preg_replace('/>\s+</', '><', $html));
    }

    #[DataProvider('cases')]
    public function testTheViewGivesTheSharedMarkup(array $media, array $case): void
    {
        self::assertSame($case['html'], self::render([$case['node']], $media));
    }

    public function testEveryContentComponentHasFixtures(): void
    {
        $covered = array_map(fn (array $c) => $c[1]['node']['type'], iterator_to_array(self::cases(), false));
        foreach (['image', 'divider', 'spacer', 'list', 'quote', 'card', 'gallery', 'video'] as $type) {
            self::assertContains($type, $covered);
        }
    }
}
