<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;

/**
 * Simple breadcrumb resolver that builds a breadcrumb trail
 * from the current page's slug segments.
 *
 * For pages with slug "blog/tutorials/php-basics", generates:
 *   [['label' => 'Blog', 'url' => '/blog'],
 *    ['label' => 'Tutorials', 'url' => '/blog/tutorials'],
 *    ['label' => 'Php Basics', 'url' => '/blog/tutorials/php-basics']]
 *
 * When parent_id hierarchy is available (v2), this resolver
 * can be extended to traverse the page tree.
 */
class BreadcrumbResolver implements BreadcrumbResolverInterface
{
    public function __construct(
        private readonly PageRepositoryInterface $pageRepository
    ) {}

    public function resolve(string $pageId): array
    {
        $page = $this->pageRepository->findById($pageId);
        if ($page === null) {
            return [];
        }

        $slug = $page['slug'] ?? '';
        if ($slug === '' || $slug === '/') {
            return [];
        }

        $segments = explode('/', trim($slug, '/'));
        $crumbs = [];
        $path = '';

        foreach ($segments as $segment) {
            $path .= '/' . $segment;
            $crumbs[] = [
                'label' => ucwords(str_replace(['-', '_'], ' ', $segment)),
                'url'   => $path,
            ];
        }

        return $crumbs;
    }
}
