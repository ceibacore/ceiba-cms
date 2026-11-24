<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/**
 * Chooses the site parts of a request (plan 06 D-5), purely from the parts given and the context: highest priority,
 * then most specific match. An exact tie chooses nothing and is reported (publication refuses it), so the order of
 * rows in the database never decides. The 404 part only applies to requests without a page.
 */
final class SitePartResolver
{
    /** @param list<SitePart> $parts */
    public static function resolve(array $parts, RenderContext $context): Resolution
    {
        $chosen = [];
        $conflicts = [];
        foreach (SitePartKind::ALL as $kind) {
            if ($kind === SitePartKind::NOT_FOUND && !$context->notFound) {
                continue;
            }
            $ranked = [];
            foreach ($parts as $part) {
                $score = $part->kind === $kind ? RuleMatcher::score($part->rules, $context) : null;
                if ($score !== null) {
                    $ranked[] = [$part->rules->priority, $score, $part];
                }
            }
            usort($ranked, fn (array $a, array $b): int => [$b[0], $b[1], $a[2]->id] <=> [$a[0], $a[1], $b[2]->id]);
            $top = $ranked[0] ?? null;
            $tied = array_values(array_filter($ranked, fn (array $r): bool => $top !== null && $r[0] === $top[0] && $r[1] === $top[1]));
            if (count($tied) > 1) {
                $conflicts[$kind] = array_map(fn (array $r): string => $r[2]->id, $tied);
                $chosen[$kind] = null;
                continue;
            }
            $chosen[$kind] = $top[2] ?? null;
        }
        return new Resolution($chosen, $conflicts);
    }
}
