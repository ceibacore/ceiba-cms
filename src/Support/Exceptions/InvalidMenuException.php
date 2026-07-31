<?php

declare(strict_types=1);

namespace LemurCms\Support\Exceptions;

use Exception;

class InvalidMenuException extends Exception
{
    public static function missingLabel(): self
    {
        return new self('Menu item label is required and must not be empty');
    }

    public static function missingUrl(): self
    {
        return new self('Menu item URL is required');
    }

    public static function invalidType(string $type): self
    {
        $valid = ['link', 'dropdown', 'mega', 'button', 'divider'];
        return new self(sprintf('Invalid menu item type "%s". Valid types: %s', $type, implode(', ', $valid)));
    }

    public static function missingMenuSlug(): self
    {
        return new self('Menu slug is required');
    }

    public static function missingMenuName(): self
    {
        return new self('Menu name is required');
    }

    public static function duplicateMenuSlug(string $slug): self
    {
        return new self(sprintf('Menu with slug "%s" already exists', $slug));
    }
}
