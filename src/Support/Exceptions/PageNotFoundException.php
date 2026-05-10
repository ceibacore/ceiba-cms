<?php

declare(strict_types=1);

namespace LemurCms\Support\Exceptions;

use Exception;

class PageNotFoundException extends Exception
{
    public static function byId(int $id): self
    {
        return new self(sprintf('Page with ID %d not found', $id));
    }

    public static function bySlug(string $slug): self
    {
        return new self(sprintf('Page with slug "%s" not found', $slug));
    }

    public static function nonePublished(): self
    {
        return new self('No published pages found');
    }
}
