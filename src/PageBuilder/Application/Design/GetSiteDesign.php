<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application\Design;

use CeibaCms\PageBuilder\Domain\Style\SiteDesign;

/** The working design (for the editor) and the published one (for the public site). Revision 0 is the default. */
final class GetSiteDesign
{
    public function __construct(private readonly SiteDesignStore $store) {}

    /** @return array{revision: int, publishedRevision: ?int, hasUnpublishedChanges: bool, design: array<string, mixed>} */
    public function working(): array
    {
        $head = $this->store->head();
        $revision = $head['draft_revision'] ?? $head['published_revision'] ?? 0;
        return [
            'revision' => $revision,
            'publishedRevision' => $head['published_revision'] ?? null,
            'hasUnpublishedChanges' => $head !== null && $head['draft_revision'] !== null && $head['draft_revision'] !== $head['published_revision'],
            'design' => $revision === 0 ? SiteDesign::defaults() : ($this->store->snapshot($revision) ?? SiteDesign::defaults()),
        ];
    }

    /** @return array<string, mixed> */
    public function published(): array
    {
        $revision = $this->store->head()['published_revision'] ?? null;
        return $revision === null ? SiteDesign::defaults() : ($this->store->snapshot($revision) ?? SiteDesign::defaults());
    }

    /** @return array<string, mixed>|null */
    public function revision(int $revision): ?array
    {
        return $revision === 0 ? SiteDesign::defaults() : $this->store->snapshot($revision);
    }
}
