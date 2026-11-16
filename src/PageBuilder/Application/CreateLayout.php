<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Application;

use CeibaCms\PageBuilder\Domain\Repository\PageLayoutRepositoryInterface;
use CeibaCms\Support\Validators\LayoutValidator;

final class CreateLayout
{
    public function __construct(private readonly PageLayoutRepositoryInterface $repo) {}

    public function execute(array $data): string
    {
        LayoutValidator::validate($data);
        return $this->repo->save($data);
    }
}
