<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Contract;

use LemurCms\PageBuilder\Domain\Document\HostContext;

interface MediaStorage
{
    /**
     * @param resource $stream Readable stream owned by the caller.
     * @return string Storage key scoped to this site.
     */
    public function write(HostContext $context, mixed $stream, string $mimeType): string;

    public function delete(HostContext $context, string $storageKey): void;
}
