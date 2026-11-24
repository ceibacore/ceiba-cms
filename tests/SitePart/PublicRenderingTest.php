<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

use CeibaCms\Http\Controllers\PageRenderController;
use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageBySlug;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\Page\Domain\Repository\PageRepositoryInterface;
use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Entity\PageLayout;
use CeibaCms\PageBuilder\Domain\Service\BladeRendererInterface;
use CeibaCms\PageBuilder\Domain\Service\LayoutRenderer;
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

final class PublicRenderingTest extends TestCase
{
    public function testMissingPageUsesPublishedNotFoundPartAndReturns404(): void
    {
        $db = RevisionSchema::create();
        $store = new SitePartStore($db, 'site-1');
        $node = [['type' => 'text', 'props' => ['content' => 'CUSTOM 404'], 'children' => []]];
        $id = (new CreatePage($db, 'site-1'))->execute(['kind' => 'not_found', 'title' => '404', 'slug' => 'internal-404', 'content' => $node]);
        $store->insertRules($id, SitePartRules::default(), null, '2026-01-01');
        (new PublishPageRevision($db, 'site-1'))->execute($id, 1, 'public-404');
        $store->publishRules($id);
        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findBySlug')->willReturn(null);
        $renderer = $this->createMock(BladeRendererInterface::class);
        $renderer->method('renderPage')->willReturnCallback(fn (array $tree) => $tree[0]['props']['content'] ?? '');
        $document = $this->createMock(LayoutRenderer::class);
        $document->method('render')->willReturnCallback(fn ($body) => $body);
        $assembler = new PageAssembler($renderer, new GetSiteDesign(new SiteDesignStore($db, 'site-1')), new CustomCode(null));
        $controller = new PageRenderController(new GetPageBySlug($pages), $renderer, layoutRenderer: $document,
            assembler: $assembler, sitePage: new AssembleSitePage($assembler, $store));
        http_response_code(200);
        ob_start();
        $controller->show('missing');
        $output = ob_get_clean();
        self::assertSame(404, http_response_code());
        self::assertSame('CUSTOM 404', $output);
        http_response_code(200);
    }

    public function testEffectiveDefaultLayoutSelectsPublishedPart(): void
    {
        $db = RevisionSchema::create();
        $store = new SitePartStore($db, 'site-1');
        $node = [['type' => 'text', 'props' => ['content' => 'HEADER'], 'children' => []]];
        $id = (new CreatePage($db, 'site-1'))->execute(['kind' => 'header', 'title' => 'Header', 'slug' => 'header-internal', 'content' => $node]);
        $rules = SitePartRules::from(['include' => [['type' => 'layouts', 'ids' => ['layout-1']]]], 'header');
        $store->insertRules($id, $rules, null, '2026-01-01');
        (new PublishPageRevision($db, 'site-1'))->execute($id, 1, 'public-header');
        $store->publishRules($id);

        $pages = $this->createMock(PageRepositoryInterface::class);
        $pages->method('findBySlug')->willReturn(['id' => 'p1', 'title' => 'Page', 'status' => 'published', 'content' => []]);
        $renderer = $this->createMock(BladeRendererInterface::class);
        $renderer->method('renderPage')->willReturnCallback(fn (array $tree) => $tree[0]['props']['content'] ?? '');
        $default = $this->createMock(GetDefaultLayout::class);
        $default->method('execute')->willReturn(new PageLayout('layout-1', 'Default', null, null, [], [], true, true));
        $layouts = $this->createMock(GetLayoutById::class);
        $document = $this->createMock(LayoutRenderer::class);
        $document->method('render')->willReturnCallback(fn ($body, $header) => $header . $body);
        $assembler = new PageAssembler($renderer, new GetSiteDesign(new SiteDesignStore($db, 'site-1')), new CustomCode(null));
        $controller = new PageRenderController(new GetPageBySlug($pages), $renderer, $layouts, $default, $document,
            assembler: $assembler, sitePage: new AssembleSitePage($assembler, $store));
        ob_start();
        $controller->show('page');
        $output = ob_get_clean();
        self::assertSame('HEADER', $output);
    }
}
