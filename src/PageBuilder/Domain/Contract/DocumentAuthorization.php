<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface DocumentAuthorization
{
    public function canUpdate(HostContext $context, string $pageId): bool;
}
