<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Infrastructure;

use LemurCms\Auth\Application\CheckPermission;
use LemurCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use LemurCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use LemurCms\PageBuilder\Domain\Contract\RevisionOperationAuthorization;
use LemurCms\PageBuilder\Domain\Document\HostContext;

/** The CMS permission is site-wide. The caller resolves the page on the same connection. */
final class CmsDocumentAuthorization implements DocumentAuthorization, PagePublicationAuthorization, RevisionOperationAuthorization
{
    /** Revision operation => CMS permission slug. Unknown operations are denied. */
    public const OPERATION_PERMISSIONS = [
        self::RESTORE => 'pages.restore',
        self::UNPUBLISH => 'pages.unpublish',
        self::PREVIEW => 'pages.update',
        self::RECONCILE => 'pages.update',
        self::PIN => 'pages.publish',
        self::AUDIT => 'pages.publish',
    ];

    public function __construct(private readonly string $siteId, private readonly CheckPermission $permissions) {}

    public function canUpdate(HostContext $context, string $pageId): bool
    {
        return $context->siteId === $this->siteId
            && $this->permissions->execute($context->actorId, 'pages.update');
    }

    public function canPublish(HostContext $context, string $pageId): bool
    {
        return $context->siteId === $this->siteId
            && $this->permissions->execute($context->actorId, 'pages.publish');
    }

    public function canPerform(HostContext $context, string $pageId, string $operation): bool
    {
        $permission = self::OPERATION_PERMISSIONS[$operation] ?? null;
        return $permission !== null
            && $context->siteId === $this->siteId
            && $this->permissions->execute($context->actorId, $permission);
    }
}
