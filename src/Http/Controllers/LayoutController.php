<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\PageBuilder\Application\ListLayouts;
use LemurCms\PageBuilder\Application\GetLayoutById;
use LemurCms\PageBuilder\Application\CreateLayout;
use LemurCms\PageBuilder\Application\UpdateLayout;
use LemurCms\PageBuilder\Application\DeleteLayout;

class LayoutController extends BaseController
{
    public function __construct(
        private readonly ListLayouts    $listLayouts,
        private readonly GetLayoutById  $getLayoutById,
        private readonly CreateLayout   $createLayout,
        private readonly UpdateLayout   $updateLayout,
        private readonly DeleteLayout   $deleteLayout,
    ) {}

    public function index(): void
    {
        $layouts = array_map(fn($l) => $l->toArray(), $this->listLayouts->execute());
        $this->success($layouts);
    }

    public function show(string $id): void
    {
        $layout = $this->getLayoutById->execute($id);
        if ($layout === null) {
            $this->error('Layout not found', 404);
            return;
        }
        $this->success($layout->toArray());
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            $id   = $this->createLayout->execute($data);
            $this->success(['id' => $id], 'Layout created', 201);
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function update(string $id): void
    {
        try {
            $data = $this->getRequest();
            $this->updateLayout->execute($id, $data);
            $this->success([], 'Layout updated');
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->deleteLayout->execute($id);
            $this->success([], 'Layout deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
