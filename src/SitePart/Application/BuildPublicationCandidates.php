<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Application;

use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\SitePart;
use CeibaCms\SitePart\Domain\SitePartRules;
use CeibaCms\SitePart\Infrastructure\SitePartStore;

/** Builds the current and prospective rule sets without reading a draft into the public set. */
final class BuildPublicationCandidates
{
    public function __construct(private readonly SitePartStore $store, private readonly HostRoutes $routes = new HostRoutes()) {}

    /** @param list<string> $selectedIds @return array{current: list<SitePart>, proposed: list<SitePart>} */
    public function build(array $selectedIds): array
    {
        if (!array_is_list($selectedIds) || $selectedIds === []) {
            throw new \InvalidArgumentException('Invalid selected parts');
        }
        foreach ($selectedIds as $id) {
            if (!is_string($id) || $id === '') throw new \InvalidArgumentException('Invalid selected parts');
        }
        if (count($selectedIds) !== count(array_unique($selectedIds))) throw new \InvalidArgumentException('Invalid selected parts');
        $selected = array_fill_keys($selectedIds, true);
        $current = [];
        $proposed = [];
        foreach ($this->store->all() as $row) {
            $id = $row['id'];
            $published = $row['status'] === 'published' && $row['publishedRules'] !== null;
            if ($published) {
                $current[] = $this->part($row, $row['publishedRules']);
            }
            if (isset($selected[$id])) {
                $proposed[] = $this->part($row, $row['rules']);
                unset($selected[$id]);
            } elseif ($published) {
                $proposed[] = $this->part($row, $row['publishedRules']);
            }
        }
        if ($selected !== []) {
            throw new InvalidRules('id', 'NOT_FOUND');
        }
        return ['current' => $current, 'proposed' => $proposed];
    }

    private function part(array $row, mixed $rules): SitePart
    {
        return new SitePart($row['id'], $row['kind'], $row['name'],
            SitePartRules::from($rules, $row['kind'], $this->routes->names()));
    }
}
