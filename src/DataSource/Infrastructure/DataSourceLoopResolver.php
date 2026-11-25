<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Infrastructure;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\PageBuilder\Domain\Service\DataProviderInterface;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\LoopResolverInterface;

/**
 * Node loops (`loop.source` = `module:<slug>` or `host:<name>`) answered by the data source registry (plan 07-A):
 * the same validation as any query, sources resolved only when a loop renders (never at bootstrap). The old options
 * (limit, offset, filters key=value, sort column/direction) become a DataQuery; an invalid loop renders nothing.
 * Other names still go to providers registered the old way.
 */
final class DataSourceLoopResolver implements LoopResolverInterface
{
    private readonly LoopResolver $legacy;

    /** @param \Closure(): QueryContext $context */
    public function __construct(private readonly DataSourceRegistry $registry, private readonly \Closure $context)
    {
        $this->legacy = new LoopResolver();
    }

    public function register(string $name, DataProviderInterface $provider): void
    {
        $this->legacy->register($name, $provider);
    }

    public function resolve(string $source, array $options = []): iterable
    {
        if (!preg_match('/^(module|host):/', $source)) {
            return $this->legacy->resolve($source, $options);
        }
        $context = ($this->context)();
        $offset = max(0, (int) ($options['offset'] ?? 0));
        $limit = isset($options['limit']) ? max(1, (int) $options['limit']) : 12;
        $filters = [];
        foreach ((array) ($options['filters'] ?? []) as $field => $value) {
            $filters[] = ['field' => (string) $field, 'op' => 'eq', 'value' => $value];
        }
        $sort = [];
        if (is_array($options['sort'] ?? null) && is_string($options['sort']['column'] ?? null)) {
            $sort[] = ['field' => $options['sort']['column'], 'direction' => strtolower((string) ($options['sort']['direction'] ?? 'desc'))];
        }
        try {
            $query = new DataQuery($source, $filters, $sort, null, 1, min($offset + $limit, $context->maxPageSize));
            $items = $this->registry->query($query, $context)->items;
        } catch (InvalidDataQuery) {
            return [];
        }

        return array_slice($items, $offset, $limit);
    }
}
