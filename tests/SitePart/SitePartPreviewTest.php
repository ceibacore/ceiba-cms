<?php
declare(strict_types=1);

namespace CeibaCms\Tests\SitePart;

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
use CeibaCms\SitePart\Application\AssembleSitePage;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\SitePartPreview;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 06-C: a part's revision previewed in a page or the 404, as if published; its rules decide if it applies. */
final class SitePartPreviewTest extends TestCase
{
    private \CeibaDB $db;
    private ManageSiteParts $parts;
    private SitePartPreview $preview;

    protected function setUp(): void
    {
        $this->db = RevisionSchema::create();
        $store = new SitePartStore($this->db, 'site-1');
        $this->parts = new ManageSiteParts($store, new CreatePage($this->db, 'site-1'), new GetPageWorkingRevision($this->db, 'site-1'), new SystemClock());
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $assembler = new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign(new SiteDesignStore($this->db, 'site-1')), new CustomCode(null));
        $this->preview = new SitePartPreview($this->db, 'site-1', $store, new AssembleSitePage($assembler, $store),
            new CeibaDbPageRepository($this->db), $this->createMock(GetLayoutById::class), $this->createMock(GetDefaultLayout::class));
        RevisionSchema::page($this->db, 'site-1', 'blog', json_encode([['id' => 'b', 'type' => 'text', 'props' => ['content' => 'Blog body'], 'children' => []]]));
        RevisionSchema::page($this->db, 'site-1', 'course', '[]');
    }

    private function draft(string $kind, string $text): string
    {
        $id = $this->parts->create($kind, $text, 'admin');
        (new SavePageDraft($this->db, 'site-1'))->execute(RevisionSchema::envelope($id, 2, $text), 1, 'admin', 'edit');
        return $id;
    }

    public function testADraftHeaderIsShownOnThePageItsRulesSelect(): void
    {
        $id = $this->draft('header', 'Courses header');
        $this->parts->saveRules($id, ['include' => [['type' => 'pages', 'ids' => ['course']]]], 1, 'admin');

        $course = $this->preview->render($id, 2, 'course');
        self::assertTrue($course['applies']);
        self::assertStringStartsWith('<h1>Courses header</h1>', trim($course['html']));

        $blog = $this->preview->render($id, 2, 'blog');
        self::assertFalse($blog['applies'], 'the rules do not select the blog');
        self::assertStringNotContainsString('Courses header', $blog['html']);
        self::assertStringContainsString('Blog body', $blog['html']);
        self::assertStringNotContainsString('Courses header', $this->preview->render($id, 1, 'course')['html'], 'revision 1 is empty');
    }

    public function testThe404PartIsPreviewedWithoutAPage(): void
    {
        $id = $this->draft('not_found', 'Nothing here');
        $page = $this->preview->render($id, 2, null);
        self::assertTrue($page['applies']);
        self::assertStringContainsString('Nothing here', $page['html']);
    }

    public function testUnknownPartsRevisionsAndPagesAreRefused(): void
    {
        $id = $this->draft('header', 'H');
        foreach ([['missing', 1, null], [$id, 9, 'blog'], [$id, 2, 'nope'], [$id, 2, $id]] as [$part, $revision, $page]) {
            try {
                $this->preview->render($part, $revision, $page);
                self::fail('Accepted');
            } catch (InvalidRules $invalid) {
                self::assertSame('NOT_FOUND', $invalid->reason);
            }
        }
    }
}
