<?php

declare(strict_types=1);

namespace LemurCms\Http\Controllers;

class PageController extends BaseController
{
    public function __construct(
        private \LemurCms\Page\Application\ListPages $listPages,
        private \LemurCms\Page\Application\CreatePage $createPage,
        private \LemurCms\Page\Application\UpdatePage $updatePage,
        private \LemurCms\Page\Application\DeletePage $deletePage,
        private \LemurCms\Page\Application\PublishPage $publishPage,
    ) {
    }

    public function index(): void
    {
        try {
            $limit = (int)$this->getQueryParam('limit', 20);
            $offset = (int)$this->getQueryParam('offset', 0);

            $pages = $this->listPages->execute($limit, $offset);
            $this->success(['pages' => $pages, 'count' => count($pages)], 'Pages retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            $pageId = $this->createPage->execute($data);
            $this->success(['id' => $pageId], 'Page created', 201);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function update(int $id): void
    {
        try {
            $data = $this->getRequest();
            $this->updatePage->execute($id, $data);
            $this->success([], 'Page updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(int $id): void
    {
        try {
            $this->deletePage->execute($id);
            $this->success([], 'Page deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function publish(int $id): void
    {
        try {
            $this->publishPage->execute($id);
            $this->success([], 'Page published');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
