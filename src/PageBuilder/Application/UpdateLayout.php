<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Application;

use LemurCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use LemurCms\Support\Validators\LayoutValidator;

final class UpdateLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(string $id, array $data): void
    {
        LayoutValidator::validate($data);
        $this->repo->update($id, $data);
    }
}
