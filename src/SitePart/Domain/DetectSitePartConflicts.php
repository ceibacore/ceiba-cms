<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** Detects ties using the same resolver as public rendering for each supplied request context. */
final class DetectSitePartConflicts
{
    /**
     * @param list<SitePart> $parts
     * @param iterable<RenderContext> $contexts
     * @return list<array{context: RenderContext, conflicts: array<string, list<string>>}>
     */
    public static function inContexts(array $parts, iterable $contexts): array
    {
        $conflicts = [];
        foreach ($contexts as $context) {
            $resolution = SitePartResolver::resolve($parts, $context);
            if ($resolution->conflicts !== []) {
                $conflicts[] = ['context' => $context, 'conflicts' => $resolution->conflicts];
            }
        }
        return $conflicts;
    }
}
