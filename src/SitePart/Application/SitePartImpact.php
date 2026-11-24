<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\SitePart\Domain\RenderContext;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartResolver;

/** Compares the selected published parts with a prospective set over host-provided contexts. */
final class SitePartImpact
{
    /**
     * @param list<SitePart> $current
     * @param list<SitePart> $proposed
     * @param iterable<RenderContext> $contexts
     * @return array{total: int, offset: int, limit: int, changes: list<array<string, mixed>>, conflicts: list<array<string, mixed>>}
     */
    public function compare(array $current, array $proposed, iterable $contexts, int $offset = 0, int $limit = 50): array
    {
        if ($offset < 0 || $limit < 1 || $limit > 200) {
            throw new \InvalidArgumentException('Invalid impact page');
        }
        $total = 0;
        $changes = [];
        $conflicts = [];
        foreach ($contexts as $context) {
            $before = SitePartResolver::resolve($current, $context)->toArray();
            $after = SitePartResolver::resolve($proposed, $context)->toArray();
            $descriptor = self::context($context);
            if ($after['conflicts'] !== []) {
                $conflicts[] = ['context' => $descriptor, 'parts' => $after['conflicts']];
            }
            if ($before['parts'] === $after['parts'] && $before['conflicts'] === $after['conflicts']) {
                continue;
            }
            if ($total >= $offset && count($changes) < $limit) {
                $changes[] = ['context' => $descriptor, 'before' => $before, 'after' => $after];
            }
            ++$total;
        }
        return compact('total', 'offset', 'limit', 'changes', 'conflicts');
    }

    private static function context(RenderContext $context): array
    {
        return ['path' => $context->path, 'pageId' => $context->pageId, 'isHome' => $context->isHome,
            'layoutId' => $context->layoutId, 'locale' => $context->locale, 'hasSession' => $context->hasSession,
            'routeName' => $context->routeName, 'notFound' => $context->notFound];
    }
}
