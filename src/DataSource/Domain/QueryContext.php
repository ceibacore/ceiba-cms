<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * Who asks and with what budget (plan 07). Injected by the server, never taken from the request. The editor's
 * preview uses the same context as a visitor (D-8): there is no elevated variant.
 */
final class QueryContext
{
    public function __construct(
        public readonly string $siteId,
        public readonly string $locale = 'es',
        public readonly bool $authenticated = false,
        public readonly int $maxPageSize = 50,
        public readonly int $maxQueries = 10,
    ) {}
}
