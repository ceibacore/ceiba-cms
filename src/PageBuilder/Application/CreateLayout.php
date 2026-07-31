<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\Support\Validators\LayoutValidator;

final class CreateLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(array $data): string
    {
        LayoutValidator::validate($data);
        return $this->repo->save($data);
    }
}
