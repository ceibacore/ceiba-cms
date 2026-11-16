<?php
declare(strict_types=1);

namespace CeibaCms\Routing\Application;

use CeibaCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;

final class AddReservedPath
{
    public function __construct(private readonly ReservedPathRepositoryInterface $repo) {}

    public function execute(string $path, string $reason = ''): string
    {
        $path = ltrim(trim($path), '/');

        if ($path === '') {
            throw new \InvalidArgumentException('Reserved path cannot be empty');
        }

        $existing = $this->repo->findByPath($path);
        if ($existing !== null) {
            return $existing['id'];
        }

        return $this->repo->save(['path' => $path, 'reason' => $reason ?: null]);
    }
}
