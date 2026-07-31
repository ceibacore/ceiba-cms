<?php
declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\PageBuilder\Domain\Service\PageBuilderMetadataService;

class PageBuilderMetadataController extends BaseController
{
    public function __construct(
        private readonly PageBuilderMetadataService $metadataService
    ) {}

    public function index(): void
    {
        try {
            $metadata = $this->metadataService->getAllMetadata();
            $this->success($metadata, 'PageBuilder metadata, templates, and rules retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function rules(): void
    {
        $this->index();
    }
}
