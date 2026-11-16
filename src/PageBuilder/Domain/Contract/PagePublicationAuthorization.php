<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use CeibaCms\PageBuilder\Domain\Document\HostContext;

interface PagePublicationAuthorization
{
    public function canPublish(HostContext $context, string $pageId): bool;
}
