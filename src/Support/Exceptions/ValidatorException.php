<?php

declare(strict_types=1);

namespace LemurCms\Support\Exceptions;

use Exception;

class ValidatorException extends Exception
{
    /**
     * @param array<string, string> $errors
     */
    public static function fromErrors(array $errors): self
    {
        $message = implode('; ', array_map(fn($k, $v) => "$k: $v", array_keys($errors), $errors));
        return new self($message);
    }
}
