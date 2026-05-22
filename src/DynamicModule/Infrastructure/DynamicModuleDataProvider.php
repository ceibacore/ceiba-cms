<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Infrastructure;

use LemurCms\PageBuilder\Domain\Service\DataProviderInterface;
use LemurCms\DynamicModule\Domain\Repository\GenericModuleRepositoryInterface;

final class DynamicModuleDataProvider implements DataProviderInterface
{
    public function __construct(
        private readonly string                           $tableName,
        private readonly GenericModuleRepositoryInterface $genericRepo
    ) {}

    public function getData(array $options = []): iterable
    {
        $limit = isset($options['limit']) ? (int) $options['limit'] : 100;
        $offset = isset($options['offset']) ? (int) $options['offset'] : 0;
        
        $filters = isset($options['filters']) && is_array($options['filters']) ? $options['filters'] : [];
        $sort = isset($options['sort']) && is_array($options['sort']) ? $options['sort'] : [];

        return $this->genericRepo->list(
            $this->tableName,
            $filters,
            $sort,
            $limit,
            $offset
        );
    }
}
