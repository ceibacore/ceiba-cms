<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\Auth\Application\CheckPermission;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Document\HostContext;

/** The CMS permission is site-wide. The caller resolves the page on the same connection. */
final class CmsDocumentAuthorization implements DocumentAuthorization
{
    public function __construct(private readonly string $siteId, private readonly CheckPermission $permissions) {}

    public function canUpdate(HostContext $context, string $pageId): bool
    {
        return $context->siteId === $this->siteId
            && $this->permissions->execute($context->actorId, 'pages.update');
    }
}
