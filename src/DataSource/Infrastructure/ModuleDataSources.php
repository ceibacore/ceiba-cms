<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Infrastructure;

use CeibaCms\DataSource\Domain\DataSourceProvider;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use CeibaDB;

/** Every dynamic module of the site as a data source (plan 07-A); the site's database is the one injected. */
final class ModuleDataSources implements DataSourceProvider
{
    public function __construct(private readonly CeibaDB $db, private readonly ModuleDefinitionRepositoryInterface $definitions) {}

    public function adapters(QueryContext $context): array
    {
        $runner = new ModuleQueryRunner($this->db);
        $labels = new ModuleRelationLabels($this->db, $this->definitions);

        return array_values(array_map(fn ($module) => new ModuleSourceAdapter($module, $runner, $labels), $this->definitions->listAll()));
    }
}
