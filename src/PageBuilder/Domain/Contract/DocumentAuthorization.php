<?php
declare(strict_types=1);

namespace CeibaCms\PageBuilder\Domain\Contract;

use CeibaCms\PageBuilder\Domain\Document\HostContext;

interface DocumentAuthorization
{
    public function canUpdate(HostContext $context, string $pageId): bool;
}
