<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\ContentRoutes;
use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Application\DynamicContent;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use CeibaCms\SitePart\Application\AssembleContentPage;
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\RuleMatcher;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 07-D: records, archives and the site search of data sources, with their site parts. */
final class ContentPagesTest extends TestCase
{
    private \CeibaDB $db;
    private SitePartStore $store;
    private AssembleContentPage $pages;
    private ContentRoutes $routes;
    /** @var array<string, ?string> */
    private array $settings = [];

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        $this->store = new SitePartStore($this->db, 'site-1');
        $settings = $this->createMock(SettingsRepositoryInterface::class);
        $settings->method('get')->willReturnCallback(fn (string $k, ?string $d = null) => $this->settings[$k] ?? $d);
        $settings->method('set')->willReturnCallback(function (string $k, ?string $v): void { $this->settings[$k] = $v; });
        $this->routes = new ContentRoutes($settings);
        $this->routes->save(['host:courses' => ['prefix' => 'cursos', 'search' => true]]);
        $registry = new DataSourceRegistry();
        $registry->register(new FakeCoursesSource([
            ['id' => 'php', 'title' => 'PHP desde cero', 'level' => 'basic', 'body' => '<p>Hola<script>x</script></p>', 'secret' => 'nunca'],
            ['id' => 'ux', 'title' => 'UX', 'level' => 'advanced', 'secret' => 'nunca'],
        ]));
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $context = fn () => new QueryContext('site-1');
        $assembler = new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign(new SiteDesignStore($this->db, 'site-1')), new CustomCode(null), null,
            new DynamicContent($registry, routes: $this->routes), $context);
        $this->pages = new AssembleContentPage(new AssembleSitePage($assembler, $this->store), $this->store, $registry, $this->routes, $context);
    }

    private function part(string $kind, array $tree, array $rules): void
    {
        $id = (new CreatePage($this->db, 'site-1'))->execute(['kind' => $kind, 'title' => $kind, 'slug' => "{$kind}-" . uniqid(), 'content' => $tree]);
        $this->store->insertRules($id, SitePartRules::from($rules, $kind), null, '2026-01-01');
        (new PublishPageRevision($this->db, 'site-1'))->execute($id, 1, "pub-{$id}");
        $this->store->publishRules($id);
    }

    public function testRoutesAreOptInUniqueAndNeverPrivate(): void
    {
        self::assertSame(['content' => 'archive', 'source' => 'host:courses', 'slug' => null], $this->routes->match('/cursos'));
        self::assertSame(['content' => 'record', 'source' => 'host:courses', 'slug' => 'php'], $this->routes->match('/cursos/php/'));
        self::assertSame('search', $this->routes->match('/buscar')['content']);
        self::assertNull($this->routes->match('/cursos/php/extra'));
        self::assertNull($this->routes->match('/blog'));
        self::assertSame('/cursos/a%20b', $this->routes->urlFor('host:courses', 'a b'));
        foreach ([['host:a' => ['prefix' => 'x'], 'host:b' => ['prefix' => 'x']], ['host:a' => ['prefix' => 'Bad/Prefix']], ['bad' => ['prefix' => 'x']]] as $invalid) {
            try {
                $this->routes->save($invalid);
                self::fail('Accepted');
            } catch (InvalidDataQuery $e) {
                self::assertContains($e->errorCode, ['ROUTE_PREFIX', 'ROUTE_SOURCE']);
            }
        }
    }

    public function testDefaultRecordArchiveAndSearchPages(): void
    {
        $record = $this->pages->render('/cursos/php', [], 'es', false);
        self::assertSame([200, 'PHP desde cero'], [$record['status'], $record['title']]);
        self::assertStringContainsString('<h1>PHP desde cero</h1>', $record['html']);
        self::assertStringContainsString('<p>Hola</p>', $record['html']);
        self::assertStringNotContainsString('<script', $record['html']);
        self::assertStringNotContainsString('nunca', $record['html']);
        self::assertSame(404, $this->pages->render('/cursos/missing', [], 'es', false)['status']);

        $archive = $this->pages->render('/cursos', ['q' => 'UX'], 'es', false)['html'];
        self::assertStringContainsString('href="/cursos/ux"', $archive, 'items link to their record');
        self::assertStringNotContainsString('/cursos/php', $archive);

        $nothing = $this->pages->render('/buscar', [], 'es', false)['html'];
        self::assertStringContainsString('No hay resultados.', $nothing, 'no words, no query');
        $search = $this->pages->render('/buscar', ['q' => 'PHP'], 'es', false)['html'];
        self::assertStringContainsString('href="/cursos/php"', $search);
        self::assertNull($this->pages->render('/blog', [], 'es', false));
    }

    public function testPartsOfEachKindDrawTheirContentPages(): void
    {
        $this->part('single', [['type' => 'heading', 'props' => ['level' => 1], 'bindings' => ['text' => ['from' => 'record', 'field' => 'title', 'transform' => 'upper']], 'children' => []]],
            ['include' => [['type' => 'sources', 'ids' => ['host:courses']]]]);
        $this->part('archive', [['type' => 'query', 'props' => ['id' => 'all', 'source' => '@current'], 'children' => [
            ['type' => 'text', 'loop' => ['query' => ''], 'props' => ['content' => 'item:{{ item.title }}'], 'children' => []]]]],
            ['include' => [['type' => 'site']]]);
        $this->part('header', [['type' => 'text', 'props' => ['content' => 'HEADER'], 'children' => []]], ['include' => [['type' => 'site']]]);

        $record = $this->pages->render('/cursos/php', [], 'es', false);
        self::assertStringContainsString('<h1>PHP DESDE CERO</h1>', $record['html']);
        self::assertStringContainsString('HEADER', (string) $record['header'], 'header parts apply to content pages too');
        $archive = $this->pages->render('/cursos', [], 'es', false)['html'];
        self::assertStringContainsString('item:PHP desde cero', $archive);
        self::assertStringContainsString('item:UX', $archive);
    }

    public function testRuleMatchingAndKindsByContent(): void
    {
        $rules = SitePartRules::from(['include' => [['type' => 'sources', 'ids' => ['host:courses']]]], 'single');
        self::assertNotNull(RuleMatcher::score($rules, RenderContext::forContent('record', 'host:courses', '/cursos/php', 'es', false)));
        self::assertNull(RuleMatcher::score($rules, RenderContext::forContent('record', 'module:blog', '/blog/x', 'es', false)));
        $this->expectException(\CeibaCms\SitePart\Domain\InvalidRules::class);
        SitePartRules::from(['include' => [['type' => 'sources', 'ids' => ['https://evil']]]], 'single');
    }

    public function testTiesBetweenContentPartsAreFoundBeforePublishing(): void
    {
        $part = fn (string $id, string $kind, array $rules) => new \CeibaCms\SitePart\Domain\SitePart($id, $kind, $id, SitePartRules::from($rules, $kind));
        $site = ['include' => [['type' => 'site']]];
        $courses = ['include' => [['type' => 'sources', 'ids' => ['host:courses']]]];
        $find = fn (array $parts) => \CeibaCms\SitePart\Domain\DetectSitePartConflicts::inContexts($parts,
            \CeibaCms\SitePart\Domain\RuleContextMatrix::generate($parts, []));

        self::assertNotSame([], $find([$part('a', 'single', $courses), $part('b', 'single', $courses)]));
        self::assertSame([], $find([$part('a', 'single', $site), $part('b', 'single', $courses)]), 'the source rule is more specific');
        self::assertSame([], $find([$part('a', 'single', $courses), $part('b', 'archive', $courses)]), 'different kinds never tie');
    }

    public function testTheSitemapListsArchivesAndRecords(): void
    {
        $registry = new DataSourceRegistry();
        $registry->register(new FakeCoursesSource(array_map(fn (int $i) => ['id' => "c{$i}", 'title' => "C{$i}"], range(1, 45))));
        $urls = (new \CeibaCms\DataSource\Application\ContentSitemap($registry, $this->routes))->urls(new QueryContext('site-1'));
        self::assertSame('/cursos', $urls[0]);
        self::assertCount(46, $urls);
        self::assertSame('/cursos/c45', end($urls));
    }
}
