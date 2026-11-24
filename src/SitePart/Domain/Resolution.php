<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** The part chosen for each kind (or none) and the ties found, for diagnostics and the impact view. */
final class Resolution
{
    /**
     * @param array<string, SitePart|null> $parts kind => chosen part
     * @param array<string, list<string>> $conflicts kind => ids tied at the top (none of them is drawn)
     */
    public function __construct(public readonly array $parts, public readonly array $conflicts) {}

    public function part(string $kind): ?SitePart
    {
        return $this->parts[$kind] ?? null;
    }

    /** @return array{parts: array<string, ?string>, conflicts: array<string, list<string>>} */
    public function toArray(): array
    {
        return ['parts' => array_map(fn (?SitePart $p) => $p?->id, $this->parts), 'conflicts' => $this->conflicts];
    }
}
