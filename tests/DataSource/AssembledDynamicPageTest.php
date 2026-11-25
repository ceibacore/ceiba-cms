<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Application\DynamicContent;
use CeibaCms\DataSource\Domain\QueryContext;
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
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 07-B: the assembler runs the queries of header, page and footer once, with the request's URL values. */
final class AssembledDynamicPageTest extends TestCase
{
    public function testHeaderPageAndFooterShareQueriesAndTheRecordIsInScope(): void
    {
        $source = new FakeCoursesSource([['id' => '1', 'title' => 'PHP', 'level' => 'basic'], ['id' => '2', 'title' => 'UX', 'level' => 'advanced']]);
        $registry = new DataSourceRegistry();
        $registry->register($source);
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $assembler = new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign(new SiteDesignStore(RevisionSchema::create(), 'site-1')), new CustomCode($this->createMock(SettingsRepositoryInterface::class)),
            null, new DynamicContent($registry), fn () => new QueryContext('site-1'));

        $list = ['type' => 'query', 'props' => ['id' => 'courses', 'source' => 'host:courses', 'url_params' => [['param' => 'q', 'target' => 'search']]],
            'children' => [['type' => 'text', 'loop' => ['query' => ''], 'props' => ['content' => '{{ item.title }}']]]];
        $count = ['type' => 'text', 'loop' => ['query' => 'courses', 'variable' => 'c'], 'props' => ['content' => 'footer:{{ c.id }}']];
        $title = ['type' => 'heading', 'props' => ['level' => 1], 'bindings' => ['text' => ['from' => 'record', 'field' => 'title']]];

        $page = $assembler->assemble([$title, $list], [], false, null, ['request_query' => ['q' => 'PH'], 'record' => ['title' => 'Ficha']], [$count]);

        self::assertStringContainsString('<h1>Ficha</h1>', $page['html']);
        self::assertStringContainsString('<p>PHP</p>', $page['html']);
        self::assertStringNotContainsString('UX', $page['html']);
        self::assertStringContainsString('footer:1', $page['footer'], 'the footer loops over the page query');
        self::assertSame(1, $source->calls);
    }
}
