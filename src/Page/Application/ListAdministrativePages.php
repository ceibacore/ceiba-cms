<?php
declare(strict_types=1);

namespace LemurCms\Page\Application;

use InvalidArgumentException;
use LemurCms\Page\Domain\Repository\AdministrativePageReaderInterface;

/** Administrative listing. The host must authorize the caller before invoking it. */
final class ListAdministrativePages
{
    private const STATUSES = ['draft', 'published', 'archived'];

    public function __construct(private readonly AdministrativePageReaderInterface $pages) {}

    public function execute(?string $status = null, ?string $search = null, int $limit = 50, int $offset = 0): array
    {
        if (($status !== null && !in_array($status, self::STATUSES, true))
            || $limit < 1 || $limit > 200 || $offset < 0
            || ($search !== null && strlen($search) > 200)) {
            throw new InvalidArgumentException('Invalid administrative page query');
        }
        return $this->pages->findAdministrative($status, $search, $limit, $offset);
    }
}
