<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/**
 * Whether rules apply to a request and how specific the match is (plan 06 D-5): a page by id > a host route >
 * a path prefix (longer is more specific) > a layout > the home page > the whole site; a locale or session filter adds
 * to it. Exclusions win over inclusions.
 */
final class RuleMatcher
{
    private const WEIGHT = ['pages' => 50_000, 'routes' => 40_000, 'path_prefix' => 30_000, 'layouts' => 20_000, 'home' => 10_000, 'site' => 0];
    private const FILTER = 1_000;

    /** Specificity of the best matching inclusion, or null when the rules do not apply. */
    public static function score(SitePartRules $rules, RenderContext $context): ?int
    {
        if (!self::filters($rules, $context)) {
            return null;
        }
        foreach ($rules->exclude as $target) {
            if (self::matches($target, $context)) {
                return null;
            }
        }
        $best = null;
        foreach ($rules->include as $target) {
            if (self::matches($target, $context)) {
                $weight = self::WEIGHT[$target['type']] + ($target['type'] === 'path_prefix' ? strlen($target['value']) : 0);
                $best = max($best ?? $weight, $weight);
            }
        }
        if ($best === null) {
            return null;
        }
        return $best + ($rules->locales !== [] ? self::FILTER : 0) + ($rules->session !== 'any' ? self::FILTER : 0);
    }

    /** @param array<string, mixed> $target */
    public static function matches(array $target, RenderContext $context): bool
    {
        return match ($target['type']) {
            'site' => true,
            'home' => $context->isHome,
            'pages' => $context->pageId !== null && in_array($context->pageId, $target['ids'], true),
            'layouts' => $context->layoutId !== null && in_array($context->layoutId, $target['ids'], true),
            'routes' => $context->routeName !== null && in_array($context->routeName, $target['names'], true),
            'path_prefix' => $target['value'] === '/' || $context->path === $target['value'] || str_starts_with($context->path, $target['value'] . '/'),
            default => false,
        };
    }

    private static function filters(SitePartRules $rules, RenderContext $context): bool
    {
        if ($rules->session === 'with' && !$context->hasSession || $rules->session === 'without' && $context->hasSession) {
            return false;
        }
        if ($rules->locales === []) {
            return true;
        }
        $primary = strtolower(explode('-', str_replace('_', '-', $context->locale))[0]);
        foreach ($rules->locales as $locale) {
            if ($locale === $context->locale || $locale === $primary) {
                return true;
            }
        }
        return false;
    }
}
