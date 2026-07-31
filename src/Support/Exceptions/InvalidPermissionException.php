<?php

declare(strict_types=1);

namespace LemurCms\Support\Exceptions;

use Exception;

class InvalidPermissionException extends Exception
{
    public static function permissionDenied(string $permission): self
    {
        return new self(sprintf('Permission "%s" denied', $permission));
    }

    public static function roleNotFound(int $roleId): self
    {
        return new self(sprintf('Role with ID %d not found', $roleId));
    }

    public static function missingPermission(string $slug): self
    {
        return new self(sprintf('Permission "%s" does not exist', $slug));
    }
}
