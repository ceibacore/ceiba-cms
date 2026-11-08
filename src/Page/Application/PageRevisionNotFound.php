<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

/** The requested revision does not exist for this page and site. */
final class PageRevisionNotFound extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Revision unavailable for this site');
    }
}
