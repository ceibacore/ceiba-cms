<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\PageRepositoryInterface;

final class PublishPage
{
    public function __construct(private PageRepositoryInterface $repo) {}

    public function execute(int $id): void
    {
        $page = $this->repo->findById($id);
        if (!$page) return;
        $page['status'] = 'published';
        $page['published_at'] = date('Y-m-d H:i:s');
        $this->repo->save($page);
    }
}
