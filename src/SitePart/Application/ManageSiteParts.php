<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\Page\Application\CreatePage;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Domain\Contract\Clock;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;
use CeibaCms\Support\Helpers\UuidHelper;

/**
 * Creating, duplicating and editing the rules of site parts (plan 06-A). The document itself is edited with the
 * page revision API, like any page; new parts start as drafts that apply to the whole site.
 */
final class ManageSiteParts
{
    public function __construct(
        private readonly SitePartStore $store,
        private readonly CreatePage $pages,
        private readonly GetPageWorkingRevision $working,
        private readonly Clock $clock,
        private readonly HostRoutes $routes = new HostRoutes(),
    ) {}

    /** Creates a draft part; with $sourceId, a copy of that part's working document and draft rules. */
    public function create(string $kind, string $name, ?string $actor, ?string $sourceId = null): string
    {
        if (!SitePartKind::valid($kind)) {
            throw new InvalidRules('kind', 'INVALID_VALUE');
        }
        $name = trim($name);
        if ($name === '' || mb_strlen($name) > 200) {
            throw new InvalidRules('name', 'INVALID_VALUE');
        }
        $rules = SitePartRules::default();
        $root = [];
        if ($sourceId !== null) {
            $source = $this->store->find($sourceId);
            if ($source === null || $source['kind'] !== $kind) {
                throw new InvalidRules('source', 'NOT_FOUND');
            }
            $rules = SitePartRules::from($source['rules'], $kind, $this->routes->names());
            $root = $this->working->execute($sourceId)['root'] ?? [];
        }
        $id = UuidHelper::v4();
        $this->store->transaction(function () use ($id, $kind, $name, $root, $actor, $rules): void {
            $this->pages->execute(['id' => $id, 'kind' => $kind, 'title' => $name, 'slug' => '__part-' . $id, 'status' => 'draft',
                'content' => $root], $actor);
            $this->store->insertRules($id, $rules, $actor, $this->clock->now()->format('Y-m-d H:i:s'));
        });
        return $id;
    }

    /**
     * Saves draft rules over version $expected; they reach visitors only when the part is published.
     * @throws InvalidRules|RulesConflict
     */
    public function saveRules(string $id, mixed $rules, int $expected, ?string $actor): int
    {
        $part = $this->store->find($id);
        if ($part === null) {
            throw new InvalidRules('id', 'NOT_FOUND');
        }
        $parsed = SitePartRules::from($rules, $part['kind'], $this->routes->names());
        $version = $this->store->saveDraftRules($id, $parsed, $expected, $actor, $this->clock->now()->format('Y-m-d H:i:s'));
        if ($version === null) {
            throw new RulesConflict((int) ($this->store->find($id)['version'] ?? 0));
        }
        return $version;
    }

    /** @return list<array<string, mixed>> */
    public function list(): array
    {
        return $this->store->all();
    }
}
