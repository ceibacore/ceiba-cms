<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

use InvalidArgumentException;

/** Request context supplied by the host after resolving identity and site. */
final class HostContext
{
    /** @param list<string> $capabilities */
    public function __construct(
        public readonly string $siteId,
        public readonly string $actorId,
        public readonly string $locale,
        public readonly array $capabilities,
    ) {
        if (trim($siteId) === '' || trim($actorId) === '' || trim($locale) === '' || !array_is_list($capabilities)) {
            throw new InvalidArgumentException('Invalid host context');
        }
        foreach ($capabilities as $capability) {
            if (!is_string($capability) || trim($capability) === '') {
                throw new InvalidArgumentException('Invalid host capability');
            }
        }
    }
}
