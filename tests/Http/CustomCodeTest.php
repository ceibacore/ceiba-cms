<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Http;

use CeibaCms\PageBuilder\Application\CustomCode;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use PHPUnit\Framework\TestCase;

/**
 * Global and page custom code (owner requirement, plan 04-B). Replaces the old reflection test of
 * PageRenderController::resolveCustomCode, which read page columns under the wrong names (custom_css_session…)
 * so page code never reached the public site.
 */
final class CustomCodeTest extends TestCase
{
    private function settings(array $values): SettingsRepositoryInterface
    {
        $settings = $this->createMock(SettingsRepositoryInterface::class);
        $settings->method('get')->willReturnCallback(fn (string $key, ?string $default = null) => $values[$key] ?? $default);
        return $settings;
    }

    public function testVisitorsWithoutSessionGetTheNoSessionVariants(): void
    {
        $code = (new CustomCode($this->settings([
            'custom_css_global_no_session' => '.g{color:blue}', 'custom_js_global_no_session' => 'g()',
            'custom_css_global_session' => '.admin{}', 'custom_js_global_session' => 'admin()',
        ])))->resolve([
            'custom_css_without_session' => '.p{color:red}', 'custom_js_without_session' => 'p()',
            'custom_css_with_session' => '.pa{}', 'custom_js_with_session' => 'pa()',
        ], false);
        self::assertSame(['globalCss' => '.g{color:blue}', 'pageCss' => '.p{color:red}', 'globalJs' => 'g()', 'pageJs' => 'p()'], $code);
    }

    public function testSignedInVisitorsGetTheSessionVariants(): void
    {
        $code = (new CustomCode($this->settings(['custom_css_global_session' => '.admin{}', 'custom_js_global_session' => 'admin()'])))
            ->resolve(['custom_css_with_session' => '.pa{}', 'custom_js_with_session' => 'pa()', 'custom_css_without_session' => '.no{}'], true);
        self::assertSame(['globalCss' => '.admin{}', 'pageCss' => '.pa{}', 'globalJs' => 'admin()', 'pageJs' => 'pa()'], $code);
    }

    public function testNothingConfiguredGivesEmptyCodeAndAHostWithoutSettingsStillReadsThePage(): void
    {
        self::assertSame(['globalCss' => '', 'pageCss' => '', 'globalJs' => '', 'pageJs' => ''],
            (new CustomCode($this->settings([])))->resolve([], false));
        self::assertSame('.p{}', (new CustomCode(null))->resolve(['custom_css_without_session' => '.p{}'], false)['pageCss']);
    }

    public function testTheCommonGlobalCodeAppliesToEveryVisitorBeforeTheSessionVariant(): void
    {
        $settings = $this->settings(['global_css' => '.all{}', 'global_js' => 'all()', 'custom_css_global_session' => '.member{}']);
        $member = (new CustomCode($settings))->resolve([], true);
        $anonymous = (new CustomCode($settings))->resolve([], false);
        self::assertSame([".all{}\n.member{}", 'all()'], [$member['globalCss'], $member['globalJs']]);
        self::assertSame(['.all{}', 'all()'], [$anonymous['globalCss'], $anonymous['globalJs']]);
    }

    public function testClosingTagsCannotEndTheStyleOrScriptElement(): void
    {
        self::assertSame('a{}<\/style><script>x()</script>', CustomCode::css('a{}</style><script>x()</script>'));
        self::assertSame('x();<\/SCRIPT><b>', CustomCode::js('x();</SCRIPT><b>'));
    }
}
