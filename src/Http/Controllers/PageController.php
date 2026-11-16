<?php

declare(strict_types=1);

namespace CeibaCms\Http\Controllers;

class PageController extends BaseController
{
    public function __construct(
        private \CeibaCms\Page\Application\ListPages $listPages,
        private \CeibaCms\Page\Application\GetPageById $getPageById,
        private \CeibaCms\Page\Application\CreatePage $createPage,
        private \CeibaCms\Page\Application\UpdatePage $updatePage,
        private \CeibaCms\Page\Application\DeletePage $deletePage,
        private \CeibaCms\Page\Application\PublishPage $publishPage,
        /** @var (\Closure(): ?string)|null Resolves the authenticated actor for the audit trail. */
        private ?\Closure $actorResolver = null,
    ) {
    }

    private function actor(): ?string
    {
        $actor = $this->actorResolver === null ? null : ($this->actorResolver)();
        return $actor === null ? null : (string) $actor;
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

    public function show(string $id): void
    {
        try {
            $page = $this->getPageById->execute($id);
            if ($page === null) {
                $this->error('Page not found', 404);
                return;
            }
            $this->success($page, 'Page retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            \CeibaCms\Support\Validators\PageValidator::validatePage($data);
            $pageId = $this->createPage->execute($data, $this->actor());
            $this->success(['id' => $pageId], 'Page created', 201);
        } catch (\InvalidArgumentException|\CeibaCms\Support\Exceptions\InvalidMenuException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error('Unable to create page', 500);
        }
    }

    public function update(string $id): void
    {
        try {
            $data = $this->getRequest();
            \CeibaCms\Support\Validators\PageValidator::validateMetadata($data);
            $this->updatePage->execute($id, $data);
            $this->success([], 'Page updated');
        } catch (\CeibaCms\Page\Application\PageNotFound $e) {
            $this->error('Page not found', 404);
        } catch (\InvalidArgumentException|\CeibaCms\Support\Exceptions\InvalidMenuException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error('Unable to update page', 500);
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->deletePage->execute($id);
            $this->success([], 'Page deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function publish(string $id): void
    {
        try {
            $revisionId = $this->publishPage->execute($id, $this->actor());
            $this->success(['revisionId' => $revisionId, 'published' => $revisionId !== null], 'Page published');
        } catch (\CeibaCms\Page\Application\PageNotFound $e) {
            $this->error('Page not found', 404);
        } catch (\CeibaCms\Page\Application\PageRevisionConflict|\CeibaCms\Page\Application\PublicContentDrift $e) {
            $this->error($e->getMessage(), 409);
        } catch (\Exception $e) {
            $this->error('Unable to publish page', 500);
        }
    }
}
