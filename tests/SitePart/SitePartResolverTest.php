<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartResolver;
use CeibaCms\SitePart\Domain\SitePartRules;
use PHPUnit\Framework\TestCase;

/** Plan 06 D-5: the same input always chooses the same parts; exclusions win; ties choose nothing. */
final class SitePartResolverTest extends TestCase
{
    private static function part(string $id, string $kind, array $include, array $more = []): SitePart
    {
        return new SitePart($id, $kind, $id, SitePartRules::from(['include' => $include, ...$more], $kind, ['portal']));
    }

    /** @return list<SitePart> */
    private static function parts(): array
    {
        return [
            self::part('h-site', 'header', [['type' => 'site']]),
            self::part('h-courses', 'header', [['type' => 'path_prefix', 'value' => '/cursos']], ['exclude' => [['type' => 'pages', 'ids' => ['p-free']]]]),
            self::part('h-deep', 'header', [['type' => 'path_prefix', 'value' => '/cursos/pro']]),
            self::part('h-home', 'header', [['type' => 'home']]),
            self::part('h-members', 'header', [['type' => 'site']], ['session' => 'with']),
            self::part('h-campaign', 'header', [['type' => 'layouts', 'ids' => ['l-land']]], ['priority' => 10]),
            self::part('f-site', 'footer', [['type' => 'site']]),
            self::part('f-en', 'footer', [['type' => 'site']], ['locales' => ['en']]),
            self::part('f-portal', 'footer', [['type' => 'routes', 'names' => ['portal']]]),
            self::part('nf-site', 'not_found', [['type' => 'site']]),
        ];
    }

    private static function chosen(RenderContext $context, ?array $parts = null): array
    {
        return SitePartResolver::resolve($parts ?? self::parts(), $context)->toArray()['parts'];
    }

    public function testEachRequestGetsTheMostSpecificPartOfHighestPriority(): void
    {
        self::assertSame(['header' => 'h-home', 'footer' => 'f-site'], self::chosen(new RenderContext('/', 'p-home', true)));
        self::assertSame('h-courses', self::chosen(new RenderContext('/cursos/php', 'p-1'))['header']);
        self::assertSame('h-deep', self::chosen(new RenderContext('/cursos/pro/x', 'p-2'))['header'], 'a longer prefix is more specific');
        self::assertSame('h-site', self::chosen(new RenderContext('/cursos/free', 'p-free'))['header'], 'the exclusion wins');
        self::assertSame('h-site', self::chosen(new RenderContext('/cursosX', 'p-3'))['header'], 'a prefix matches whole segments');
        self::assertSame('h-members', self::chosen(new RenderContext('/blog', 'p-4', hasSession: true))['header'], 'a session filter adds specificity');
        self::assertSame('h-campaign', self::chosen(new RenderContext('/cursos/pro/a', 'p-5', layoutId: 'l-land'))['header'], 'priority comes first');
        self::assertSame('f-en', self::chosen(new RenderContext('/blog', 'p-4', locale: 'en-GB'))['footer'], 'a locale matches its primary tag');
        self::assertSame('f-portal', self::chosen(new RenderContext('/portal', routeName: 'portal'))['footer']);
    }

    public function testTheNotFoundPartOnlyAppliesToRequestsWithoutAPage(): void
    {
        self::assertArrayNotHasKey('not_found', self::chosen(new RenderContext('/x', 'p-1')));
        self::assertSame(['header' => 'h-site', 'footer' => 'f-site', 'not_found' => 'nf-site'],
            self::chosen(RenderContext::notFound('/nope', 'es', false)));
    }

    public function testAnExactTieChoosesNothingAndIsReported(): void
    {
        $parts = [...self::parts(), self::part('h-site-2', 'header', [['type' => 'site']])];
        $resolution = SitePartResolver::resolve($parts, new RenderContext('/blog', 'p-4'));
        self::assertNull($resolution->part('header'));
        self::assertSame(['header' => ['h-site', 'h-site-2']], $resolution->conflicts);
        self::assertSame('f-site', $resolution->part('footer')?->id);
    }

    public function testTargetSpecificityFollowsTheAgreedOrder(): void
    {
        $parts = [self::part('home', 'header', [['type' => 'home']]),
            self::part('layout', 'header', [['type' => 'layouts', 'ids' => ['layout']]]),
            self::part('prefix', 'header', [['type' => 'path_prefix', 'value' => '/']]),
            self::part('page', 'header', [['type' => 'pages', 'ids' => ['page']]])];
        $context = new RenderContext('/', 'page', true, layoutId: 'layout');
        self::assertSame('page', self::chosen($context, $parts)['header']);
        array_pop($parts);
        self::assertSame('prefix', self::chosen($context, $parts)['header']);
        array_pop($parts);
        self::assertSame('layout', self::chosen($context, $parts)['header']);
    }

    public function testTheOrderOfThePartsNeverChangesTheResult(): void
    {
        $contexts = [new RenderContext('/', 'p-home', true), new RenderContext('/cursos/pro', 'p-2', hasSession: true, locale: 'en'),
            RenderContext::notFound('/x', 'en', true), new RenderContext('/a', 'p-9', layoutId: 'l-land')];
        foreach ($contexts as $context) {
            $expected = SitePartResolver::resolve(self::parts(), $context)->toArray();
            for ($i = 0; $i < 10; $i++) {
                $shuffled = self::parts();
                shuffle($shuffled);
                self::assertSame($expected, SitePartResolver::resolve($shuffled, $context)->toArray());
            }
        }
    }
}
