<?php
declare(strict_types=1);
namespace LemurCms\Page\Application;

use LemurCms\Page\Domain\Repository\PageRepositoryInterface;
use LemurCms\PageBuilder\Domain\Service\TreeNormalizer;

final class CreatePage
{
    public function __construct(
        private PageRepositoryInterface $repo,
        private TreeNormalizer $normalizer,
    ) {}

    public function execute(array $data): string
    {
        if (isset($data['content']) && is_array($data['content'])) {
            $data['content'] = $this->normalizer->normalize($data['content']);
        }

        return $this->repo->save($data);
    }
}
