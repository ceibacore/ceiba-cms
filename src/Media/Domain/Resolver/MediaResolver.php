<?php

declare(strict_types=1);

namespace CeibaCms\Media\Domain\Resolver;

/**
 * Host port (plan 05 D-1): turns asset ids into public URLs when a page is drawn, so moving files to another disk
 * or CDN does not touch the pages. Unknown ids are left out of the result.
 */
interface MediaResolver
{
    /**
     * @param list<string> $ids
     * @return array<string, ResolvedMedia> keyed by id
     */
    public function resolve(array $ids): array;
}
