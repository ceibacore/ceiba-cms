<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Service;

interface DataProviderInterface
{
    public function getData(array $options = []): iterable;
}
