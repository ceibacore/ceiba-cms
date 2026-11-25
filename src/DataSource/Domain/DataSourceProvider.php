<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/** Supplies adapters that depend on the site (e.g. one per dynamic module of the current site). */
interface DataSourceProvider
{
    /** @return list<DataSourceAdapter> */
    public function adapters(QueryContext $context): array;
}
