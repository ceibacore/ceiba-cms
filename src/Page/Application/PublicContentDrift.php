<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

/**
 * Public content changed outside the revision system. Publishing would overwrite
 * it silently, so the operation is refused until the content is reconciled.
 */
final class PublicContentDrift extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Public page content changed outside the revision system; reconcile it before publishing');
    }
}
