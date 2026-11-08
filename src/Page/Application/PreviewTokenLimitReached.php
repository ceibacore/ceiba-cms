<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use RuntimeException;

final class PreviewTokenLimitReached extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('Too many active preview links for this page; revoke some first');
    }
}
