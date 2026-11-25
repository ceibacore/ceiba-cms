<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\ContentRoutes;
use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Application\DynamicContent;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\Page\Application\SavePageDraft;
use CeibaCms\Page\Infrastructure\CeibaDbPageRepository;
use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Application\GetDefaultLayout;
use CeibaCms\PageBuilder\Application\GetLayoutById;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use CeibaCms\PageBuilder\Infrastructure\SystemClock;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use CeibaCms\SitePart\Application\AssembleContentPage;
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\SitePartPreview;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 07-D: a draft record, archive or search part is previewed with a sample record, before any public URL exists. */
final class ContentPreviewTest extends TestCase
{
    public function testADraftRecordPartIsPreviewedWithARecord(): void
    {
        $db = RevisionSchema::create();
        $store = new SitePartStore($db, 'site-1');
        $parts = new ManageSiteParts($store, new CreatePage($db, 'site-1'), new GetPageWorkingRevision($db, 'site-1'), new SystemClock());
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $registry = new DataSourceRegistry();
        $registry->register(new FakeCoursesSource([['id' => 'php', 'title' => 'PHP desde cero']]));
        $context = fn () => new QueryContext('site-1');
        $assembler = new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign(new SiteDesignStore($db, 'site-1')), new CustomCode(null), null, new DynamicContent($registry), $context);
        $site = new AssembleSitePage($assembler, $store);
        $content = new AssembleContentPage($site, $store, $registry, new ContentRoutes($this->createMock(SettingsRepositoryInterface::class)), $context);
        $preview = new SitePartPreview($db, 'site-1', $store, $site, new CeibaDbPageRepository($db), $this->createMock(GetLayoutById::class),
            $this->createMock(GetDefaultLayout::class), contentPages: fn () => $content);

        $id = $parts->create('single', 'Ficha', 'admin');
        $tree = [['id' => 't', 'type' => 'heading', 'props' => ['level' => 1], 'bindings' => ['text' => ['from' => 'record', 'field' => 'title']], 'children' => []]];
        $envelope = json_encode(['schemaVersion' => 1, 'documentId' => $id, 'revision' => 2, 'root' => $tree, 'settings' => new \stdClass(), 'resources' => []]);
        (new SavePageDraft($db, 'site-1'))->execute(\CeibaCms\PageBuilder\Domain\Document\DocumentEnvelope::fromJson($envelope), 1, 'admin', 'edit');

        $page = $preview->render($id, 2, 'content|record|host:courses|php');
        self::assertTrue($page['applies']);
        self::assertStringContainsString('<h1>PHP desde cero</h1>', $page['html']);
        $this->expectException(InvalidRules::class);
        $preview->render($id, 2, 'content|record|host:courses|missing');
    }
}
