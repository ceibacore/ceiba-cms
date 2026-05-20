<?php

declare(strict_types=1);

namespace LemurCms\Http\Controllers;

class MenuController extends BaseController
{
    public function __construct(
        private \LemurCms\Menu\Application\GetNavbar $getNavbar,
        private \LemurCms\Menu\Application\CreateMenuItem $createMenuItem,
        private \LemurCms\Menu\Application\UpdateMenuItem $updateMenuItem,
        private \LemurCms\Menu\Application\DeleteMenuItem $deleteMenuItem,
    ) {
    }

    public function show(string $slug): void
    {
        try {
            $html = $this->getNavbar->execute($slug);
            $this->success(['html' => $html], 'Menu retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage(), 404);
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            $itemId = $this->createMenuItem->execute($data);
            $this->success(['id' => $itemId], 'Menu item created', 201);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function update(string $id): void
    {
        try {
            $data = $this->getRequest();
            $this->updateMenuItem->execute($id, $data);
            $this->success([], 'Menu item updated');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->deleteMenuItem->execute($id);
            $this->success([], 'Menu item deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
