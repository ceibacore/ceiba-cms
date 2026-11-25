<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;

/**
 * Public URLs of data source pages for the host's sitemap (plan 07-D): each archive and every record a visitor can
 * read, paged through the registry (never more than LIMIT per source).
 */
final class ContentSitemap
{
    public const LIMIT = 5000;

    public function __construct(private readonly DataSourceRegistry $registry, private readonly ContentRoutes $routes) {}

    /** @return list<string> */
    public function urls(QueryContext $context): array
    {
        $urls = [];
        foreach ($this->routes->all() as $source => $route) {
            try {
                $descriptor = $this->registry->descriptor($source, $context);
            } catch (InvalidDataQuery) {
                continue;
            }
            $urls[] = '/' . $route['prefix'];
            if (!$descriptor->has('single') || $descriptor->slugField === null) {
                continue;
            }
            $size = min($descriptor->maxPageSize, $context->maxPageSize);
            for ($page = 1, $seen = 0; $seen < self::LIMIT; $page++) {
                try {
                    $result = $this->registry->query(new DataQuery($source, [], [], null, $page, $size), $context);
                } catch (InvalidDataQuery) {
                    break; // past the last page the validator allows
                }
                foreach ($result->items as $item) {
                    $url = $this->routes->urlFor($source, (string) ($item[$descriptor->slugField] ?? ''));
                    if ($url !== null && $seen++ < self::LIMIT) {
                        $urls[] = $url;
                    }
                }
                if (!$result->hasMore() || $result->items === [] || !$descriptor->has('pagination')) {
                    break;
                }
            }
        }

        return $urls;
    }
}
