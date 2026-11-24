<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\SitePartRules;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

/** Plan 06 D-4: a closed rule vocabulary; anything unknown is refused with a path and a code. */
final class SitePartRulesTest extends TestCase
{
    public function testValidRulesAreNormalized(): void
    {
        $rules = SitePartRules::from(['include' => [['type' => 'path_prefix', 'value' => '/cursos/'], ['type' => 'routes', 'names' => ['portal', 'portal']]],
            'exclude' => [['type' => 'pages', 'ids' => ['p-1']]], 'locales' => ['es', 'en-US'], 'session' => 'with', 'priority' => 5], 'header', ['portal']);
        self::assertSame([['type' => 'path_prefix', 'value' => '/cursos'], ['type' => 'routes', 'names' => ['portal']]], $rules->include);
        self::assertSame(['es', 'en-US'], $rules->locales);
        self::assertSame(5, $rules->priority);
        self::assertSame(['include' => [['type' => 'site']], 'exclude' => [], 'locales' => [], 'session' => 'any', 'priority' => 0],
            SitePartRules::default()->toArray());
    }

    /** @return iterable<string, array{mixed, string, string, string}> */
    public static function refused(): iterable
    {
        yield 'not an object' => [['a'], 'header', '', 'SHAPE'];
        yield 'unknown key' => [['include' => [['type' => 'site']], 'when' => 'x'], 'header', '', 'SHAPE'];
        yield 'nothing included' => [['include' => []], 'footer', 'include', 'REQUIRED'];
        yield 'unknown target' => [['include' => [['type' => 'audience']]], 'header', 'include.0', 'UNKNOWN_TARGET'];
        yield 'extra field' => [['include' => [['type' => 'site', 'ids' => ['x']]]], 'header', 'include.0', 'SHAPE'];
        yield 'bad page id' => [['include' => [['type' => 'pages', 'ids' => ['x y']]]], 'header', 'include.0.ids.0', 'INVALID_VALUE'];
        yield 'route not registered' => [['include' => [['type' => 'routes', 'names' => ['admin']]]], 'header', 'include.0.names.0', 'UNKNOWN_ROUTE'];
        yield 'traversal prefix' => [['include' => [['type' => 'path_prefix', 'value' => '/a/../b']]], 'header', 'include.0.value', 'INVALID_VALUE'];
        yield 'relative prefix' => [['include' => [['type' => 'path_prefix', 'value' => 'cursos']]], 'header', 'include.0.value', 'INVALID_VALUE'];
        yield 'page target for 404' => [['include' => [['type' => 'site']], 'exclude' => [['type' => 'home']]], 'not_found', 'exclude.0', 'NOT_FOR_404'];
        yield 'bad locale' => [['include' => [['type' => 'site']], 'locales' => ['spanish']], 'header', 'locales.0', 'INVALID_VALUE'];
        yield 'bad session' => [['include' => [['type' => 'site']], 'session' => 'admin'], 'header', 'session', 'INVALID_VALUE'];
        yield 'priority range' => [['include' => [['type' => 'site']], 'priority' => 1000], 'header', 'priority', 'INVALID_VALUE'];
        yield 'priority type' => [['include' => [['type' => 'site']], 'priority' => '1'], 'header', 'priority', 'INVALID_VALUE'];
    }

    #[DataProvider('refused')]
    public function testUnknownOrMalformedRulesAreRefused(mixed $rules, string $kind, string $path, string $reason): void
    {
        try {
            SitePartRules::from($rules, $kind, ['portal']);
            self::fail('Accepted');
        } catch (InvalidRules $invalid) {
            self::assertSame([$path, $reason], [$invalid->path, $invalid->reason]);
        }
    }
}
