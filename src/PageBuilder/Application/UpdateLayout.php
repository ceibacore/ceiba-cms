<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use CeibaCms\Support\Validators\LayoutValidator;

final class UpdateLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(string $id, array $data): void
    {
        LayoutValidator::validate($data);
        $this->repo->update($id, $data);
    }
}
