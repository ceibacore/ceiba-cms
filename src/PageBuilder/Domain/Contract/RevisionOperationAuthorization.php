<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

/**
 * Host policy for revision operations beyond save and publish. Each operation is
 * authorized separately so hosts can segregate duties (edit / publish / restore /
 * unpublish / governance).
 */
interface RevisionOperationAuthorization
{
    public const RESTORE = 'restore';
    public const UNPUBLISH = 'unpublish';
    public const PREVIEW = 'preview';
    public const RECONCILE = 'reconcile';
    public const PIN = 'pin';
    public const AUDIT = 'audit';

    public function canPerform(HostContext $context, string $pageId, string $operation): bool;
}
