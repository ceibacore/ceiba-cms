<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\SitePart\Domain\DetectSitePartConflicts;
use CeibaCms\SitePart\Domain\RuleContextMatrix;
use CeibaCms\SitePart\Infrastructure\PublishedPageContexts;

/**
 * Refuses a publication that would leave an exact tie (plan 06 D-5): the parts as they would be published are
 * resolved over every published page and the variants their rules distinguish (paths, locales, session, 404).
 */
final class ContextConflictGuard implements PublicationGuard
{
    private const REPORTED = 20;

    public function __construct(private readonly BuildPublicationCandidates $candidates, private readonly PublishedPageContexts $pages) {}

    public function assertNoConflicts(array $changes): void
    {
        $proposed = $this->candidates->build(array_column($changes, 'id'))['proposed'];
        $found = DetectSitePartConflicts::inContexts($proposed, RuleContextMatrix::generate($proposed, $this->pages->list()));
        if ($found === []) {
            return;
        }
        throw new SitePartsInConflict(array_map(fn (array $c): array => [
            'context' => ['path' => $c['context']->path, 'locale' => $c['context']->locale, 'hasSession' => $c['context']->hasSession,
                'notFound' => $c['context']->notFound, 'routeName' => $c['context']->routeName],
            'parts' => $c['conflicts'],
        ], array_slice($found, 0, self::REPORTED)));
    }
}
