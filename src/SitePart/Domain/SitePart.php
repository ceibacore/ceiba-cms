<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/** A site part as the resolver sees it: its kind, the rules in force and the tree to draw. */
final class SitePart
{
    /** @param list<mixed> $tree */
    public function __construct(
        public readonly string $id,
        public readonly string $kind,
        public readonly string $name,
        public readonly SitePartRules $rules,
        public readonly array $tree = [],
    ) {}
}
