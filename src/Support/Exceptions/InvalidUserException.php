<?php

declare(strict_types=1);

namespace LemurCms\Support\Exceptions;

use Exception;

class InvalidUserException extends Exception
{
    public static function missingEmail(): self
    {
        return new self('User email is required');
    }

    public static function invalidEmail(string $email): self
    {
        return new self(sprintf('Invalid email format: %s', $email));
    }

    public static function missingPassword(): self
    {
        return new self('User password is required');
    }

    public static function weakPassword(): self
    {
        return new self('Password must be at least 8 characters with uppercase, lowercase, and numbers');
    }

    public static function emailExists(string $email): self
    {
        return new self(sprintf('User with email "%s" already exists', $email));
    }

    public static function notFound(string $id): self
    {
        return new self(sprintf('User with ID %s not found', $id));
    }
}
