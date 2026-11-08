<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface PagePublicationAuthorization
{
    public function canPublish(HostContext $context, string $pageId): bool;
}
