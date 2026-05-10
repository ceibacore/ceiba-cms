<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\PageRepositoryInterface;

final class UpdatePage
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(int $id, array $data): void
    {
        $page = $this->repo->findById($id);
        if (!$page) return;
        $data['id'] = $id;
        $this->repo->save($data);
    }
}
