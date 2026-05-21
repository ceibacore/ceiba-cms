<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

/**
 * Resolves breadcrumb trail for a page by traversing the page hierarchy.
 *
 * Returns an array of ['label' => string, 'url' => string] entries
 * from root to the current page.
 */
interface BreadcrumbResolverInterface
{
    /**
     * @param  string $pageId  The current page ID
     * @return array<int, array{label: string, url: string}>
     */
    public function resolve(string $pageId): array;
}
