<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;

final class UpdatePage
{
    public function __construct(
        private PageRepositoryInterface $repo,
        private TreeNormalizer $normalizer,
    ) {}

    public function execute(string $id, array $data): void
    {
        $page = $this->repo->findById($id);
        if (!$page) return;

        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = $this->normalizer->normalize($data['content']);
        }

        $data['id'] = $id;
        $this->repo->save($data);
    }
}
