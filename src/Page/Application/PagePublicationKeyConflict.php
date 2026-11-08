<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

final class PagePublicationKeyConflict extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Idempotency key belongs to another publication');
    }
}
