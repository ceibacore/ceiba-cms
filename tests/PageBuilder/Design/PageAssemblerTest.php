<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** What a published page carries (plan 04-B and the owner's custom code requirement). */
final class PageAssemblerTest extends TestCase
{
    private const TREE = [['id' => 'hero', 'type' => 'container', 'props' => ['class' => 'mb-4'], 'styles' => [
        'classes' => ['brand'], 'base' => ['paddingBlock' => '3rem'], 'breakpoints' => ['lg' => ['paddingBlock' => '6rem']],
    ], 'children' => [['id' => 't', 'type' => 'heading', 'props' => ['text' => 'Hi', 'level' => 1], 'children' => []]]]];

    private SaveSiteDesignDraft $save;
    private PublishSiteDesign $publish;

    private function assembler(array $settings = []): PageAssembler
    {
        $store = new SiteDesignStore(RevisionSchema::create(), 'site-1');
        $this->save = new SaveSiteDesignDraft($store);
        $this->publish = new PublishSiteDesign($store);
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $repo = $this->createMock(SettingsRepositoryInterface::class);
        $repo->method('get')->willReturnCallback(fn (string $key, ?string $default = null) => $settings[$key] ?? $default);
        return new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign($store), new CustomCode($repo));
    }

    private function brand(string $color): array
    {
        return array_replace(SiteDesign::defaults(), ['tokens' => ['color.brand' => ['type' => 'color', 'value' => $color]],
            'classes' => ['brand' => ['styles' => ['base' => ['color' => ['token' => 'color.brand']]]]]]);
    }

    public function testStyledNodesGetTheirClassesAndTheCssFollowsThePublishedDesign(): void
    {
        $assembler = $this->assembler();
        $this->save->execute($this->brand('#ff0000'), 0, 'admin');
        $this->publish->execute(1);
        $this->save->execute($this->brand('#00ff00'), 1, 'admin');

        $page = $assembler->assemble(self::TREE, [], false);
        self::assertMatchesRegularExpression('~<div class="container mb-4 cms-c-brand cms-n-hero">\s*<h1>Hi</h1>~', $page['html']);
        self::assertStringContainsString('--cms-t-color_brand:#ff0000', $page['css'], 'Only the published design reaches pages');
        self::assertStringContainsString(".cms-n-hero.cms-n-hero{padding-block:3rem}\n@media (min-width:992px){", $page['css']);
        self::assertSame([], $page['diagnostics']);

        $preview = $assembler->assemble(self::TREE, [], false, $this->brand('#0000ff'));
        self::assertStringContainsString('--cms-t-color_brand:#0000ff', $preview['css'], 'A preview may pass the design to use');
    }

    public function testCssOrderIsDesignThenGlobalThenPageAndJsIsGlobalThenPage(): void
    {
        $assembler = $this->assembler([
            'custom_css_global_no_session' => '.g{color:blue}', 'custom_js_global_no_session' => 'globalCode()',
            'custom_css_global_session' => '.member{}', 'custom_js_global_session' => 'member()',
        ]);
        $row = ['custom_css_without_session' => '.p{color:red}</style>', 'custom_js_without_session' => 'pageCode()',
            'custom_css_with_session' => '.pm{}', 'custom_js_with_session' => 'pageMember()'];

        $anonymous = $assembler->assemble(self::TREE, $row, false);
        $design = strpos($anonymous['css'], '/* cms:design */');
        $global = strpos($anonymous['css'], "/* cms:global */\n.g{color:blue}");
        $page = strpos($anonymous['css'], "/* cms:page */\n.p{color:red}<\\/style>");
        self::assertTrue($design !== false && $global > $design && $page > $global, $anonymous['css']);
        self::assertSame("globalCode();\npageCode()", $anonymous['js']);

        $member = $assembler->assemble(self::TREE, $row, true);
        self::assertStringContainsString('.member{}', $member['css']);
        self::assertStringContainsString('.pm{}', $member['css']);
        self::assertSame("member();\npageMember()", $member['js']);
    }

    public function testAPageWithoutStylesOrCustomCodeCarriesNoExtraCss(): void
    {
        $page = $this->assembler()->assemble([['id' => 'p', 'type' => 'p', 'props' => ['content' => 'x'], 'children' => []]], [], false);
        self::assertSame(['', ''], [$page['css'], $page['js']]);
        self::assertSame('<p>x</p>', trim($page['html']));
    }
}
