<?php

declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\PageBuilder\Application\ListTemplates;
use LemurCms\PageBuilder\Application\GetTemplateById;
use LemurCms\PageBuilder\Application\CreateTemplate;
use LemurCms\PageBuilder\Application\DeleteTemplate;
use LemurCms\Support\Validators\TemplateValidator;

class TemplateController extends BaseController
{
    public function __construct(
        private readonly ListTemplates $listTemplates,
        private readonly GetTemplateById $getTemplateById,
        private readonly CreateTemplate $createTemplate,
        private readonly DeleteTemplate $deleteTemplate,
    ) {}

    public function index(): void
    {
        try {
            $templates = $this->listTemplates->execute();
            $this->success(['templates' => $templates, 'count' => count($templates)], 'Templates retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function show(string $id): void
    {
        try {
            $template = $this->getTemplateById->execute($id);
            if ($template === null) {
                $this->error('Template not found', 404);
                return;
            }
            $this->success($template, 'Template retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function store(): void
    {
        try {
            $data = $this->getRequest();
            TemplateValidator::validateTemplate($data);
            $id = $this->createTemplate->execute($data);
            $this->success(['id' => $id], 'Template saved', 201);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function destroy(string $id): void
    {
        try {
            $this->deleteTemplate->execute($id);
            $this->success([], 'Template deleted');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
