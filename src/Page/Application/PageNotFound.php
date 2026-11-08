<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

final class PageNotFound extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Page unavailable');
    }
}
