<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

interface DataProviderInterface
{
    public function getData(array $options = []): iterable;
}
