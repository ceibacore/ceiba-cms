<?php
declare(strict_types=1);

namespace CeibaCms\Tests\PageBuilder\Design;

use CeibaCms\Media\Domain\Resolver\MediaResolver;
use CeibaCms\Media\Domain\Resolver\ResolvedMedia;
use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Application\PageAssembler;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Domain\Style\SiteDesign;
use CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 05-A: asset references are resolved by the host when the page is drawn, in props and in styles. */
final class PageAssemblerMediaTest extends TestCase
{
    private function assembler(): PageAssembler
    {
        $frameworks = new UiFrameworkRegistry();
        $frameworks->register(new Bootstrap5Module());
        $frameworks->setActive('bootstrap5');
        $resolver = new class implements MediaResolver {
            public array $asked = [];
            public function resolve(array $ids): array
            {
                $this->asked = $ids;
                return in_array('m1', $ids, true) ? ['m1' => new ResolvedMedia('m1', '/m/1600.webp', 1600, 800, 'Sea & sky', [
                    ['url' => '/m/480.webp', 'width' => 480], ['url' => '/m/1600.webp', 'width' => 1600],
                ])] : [];
            }
        };
        return new PageAssembler(new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks),
            new GetSiteDesign(new SiteDesignStore(RevisionSchema::create(), 'site-1')), new CustomCode(null), $resolver);
    }

    public function testImagesGetUrlSrcsetSizeAndAltAndBackgroundsCompileToTheUrl(): void
    {
        $design = array_replace(SiteDesign::defaults(), ['classes' => ['band' => ['styles' => ['base' => ['backgroundImage' => ['asset' => 'm1']]]]]]);
        $page = $this->assembler()->assemble([
            ['id' => 'hero', 'type' => 'section', 'styles' => ['classes' => ['band'], 'base' => ['backgroundImage' => ['asset' => 'm1'], 'backgroundSize' => 'cover']], 'children' => [
                ['id' => 'pic', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1']], 'children' => []],
                ['id' => 'gone', 'type' => 'image', 'props' => ['src' => ['asset' => 'm2']], 'children' => []],
            ]],
        ], [], false, $design);

        self::assertStringContainsString('<img src="/m/1600.webp" alt="Sea &amp; sky" srcset="/m/480.webp 480w, /m/1600.webp 1600w" sizes="100vw" class="img-fluid" width="1600" height="800" loading="lazy" decoding="async">', $page['html']);
        self::assertSame(1, substr_count($page['html'], '<img'), 'An unknown asset draws nothing');
        self::assertStringContainsString('.cms-c-band{background-image:url("/m/1600.webp")}', $page['css']);
        self::assertStringContainsString('.cms-n-hero.cms-n-hero{background-image:url("/m/1600.webp");background-size:cover}', $page['css']);
        self::assertSame([], $page['diagnostics']);
    }

    public function testTheLayoutFooterIsDrawnWithTheSameMediaStylesAndScripts(): void
    {
        $page = $this->assembler()->assemble([['id' => 'p', 'type' => 'text', 'props' => ['content' => 'Body'], 'children' => []]], [], false, null, [], [
            ['id' => 'logo', 'type' => 'image', 'props' => ['src' => ['asset' => 'm1']], 'styles' => ['base' => ['maxWidth' => '8rem']], 'children' => []],
            ['id' => 'v', 'type' => 'video', 'props' => ['url' => 'https://youtu.be/dQw4w9WgXcQ'], 'children' => []],
        ]);
        self::assertStringContainsString('<p>Body</p>', $page['html']);
        self::assertStringNotContainsString('<img', $page['html']);
        self::assertStringContainsString('<img src="/m/1600.webp" alt="Sea &amp; sky"', $page['footer']);
        self::assertStringContainsString('class="img-fluid cms-n-logo"', $page['footer']);
        self::assertStringContainsString('.cms-n-logo.cms-n-logo{max-width:8rem}', $page['css']);
        self::assertStringContainsString('window.__cmsVideo', $page['js']);
        self::assertSame('', $this->assembler()->assemble([], [], false)['footer']);
    }

    public function testTextSourcesStillWork(): void
    {
        $page = $this->assembler()->assemble([['id' => 'i', 'type' => 'image', 'props' => ['src' => '/legacy.png', 'alt' => 'Old'], 'children' => []]], [], false);
        self::assertStringContainsString('<img src="/legacy.png" alt="Old" class="img-fluid" loading="lazy" decoding="async">', $page['html']);
        $unsafe = $this->assembler()->assemble([['id' => 'i', 'type' => 'image', 'props' => ['src' => 'javascript:alert(1)'], 'children' => []]], [], false);
        self::assertStringNotContainsString('<img', $unsafe['html']);
    }
}
