<?php

declare(strict_types=1);

namespace LemurCms\Http\Controllers;

use LemurCms\PageBuilder\Application\ListComponentDefinitions;

class ComponentDefinitionController extends BaseController
{
    public function __construct(
        private readonly ListComponentDefinitions $listComponentDefinitions
    ) {}

    public function index(): void
    {
        try {
            $definitions = $this->listComponentDefinitions->execute();
            $catalogue = array_map(fn($d) => $d->toArray(), $definitions);
            $this->success($catalogue, 'Component definitions retrieved');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
