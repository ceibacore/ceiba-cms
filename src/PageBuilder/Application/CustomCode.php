<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;

/**
 * Custom CSS and JS of the site (settings) and of a page (pages columns), each with a variant for visitors with and
 * without a session. Written by trusted administrators; only closing tags are neutralized so they cannot end the
 * <style>/<script> element early.
 */
final class CustomCode
{
    /** Settings keys of the global code. */
    public const GLOBAL_KEYS = [
        'css' => ['custom_css_global_session', 'custom_css_global_no_session'],
        'js' => ['custom_js_global_session', 'custom_js_global_no_session'],
    ];

    /** Columns of pages holding the page code (migration 20260606000000). */
    public const PAGE_COLUMNS = [
        'css' => ['custom_css_with_session', 'custom_css_without_session'],
        'js' => ['custom_js_with_session', 'custom_js_without_session'],
    ];

    public function __construct(private readonly ?SettingsRepositoryInterface $settings) {}

    /** @param array<string, mixed> $page @return array{globalCss: string, pageCss: string, globalJs: string, pageJs: string} */
    public function resolve(array $page, bool $hasSession): array
    {
        $variant = $hasSession ? 0 : 1;
        $setting = fn (string $kind): string => (string) ($this->settings?->get(self::GLOBAL_KEYS[$kind][$variant], '') ?? '');
        $column = fn (string $kind): string => is_string($page[self::PAGE_COLUMNS[$kind][$variant]] ?? null)
            ? $page[self::PAGE_COLUMNS[$kind][$variant]] : '';
        return [
            'globalCss' => self::css($setting('css')), 'pageCss' => self::css($column('css')),
            'globalJs' => self::js($setting('js')), 'pageJs' => self::js($column('js')),
        ];
    }

    public static function css(string $code): string
    {
        return trim((string) preg_replace('~</(style)~i', '<\\/$1', $code));
    }

    public static function js(string $code): string
    {
        return trim((string) preg_replace('~</(script)~i', '<\\/$1', $code));
    }
}
