<?php

declare(strict_types=1);

namespace CeibaCms\Media\Application\Library;

/** The upload was refused; $reason is a stable code for the client (TYPE, SIZE, DIMENSIONS, ...). */
final class InvalidUpload extends \InvalidArgumentException
{
    public function __construct(public readonly string $reason, string $message)
    {
        parent::__construct($message);
    }
}
