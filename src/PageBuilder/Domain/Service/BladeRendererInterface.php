<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

interface BladeRendererInterface
{
    public function renderPage(array $tree, array $data = []): string;
    public function renderNode(array $node, array $context = []): string;
}
