<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/** A query that names an unknown source, field, operator or sort, or breaks a limit (plan 07, D-1). Never ignored. */
final class InvalidDataQuery extends \InvalidArgumentException
{
    public function __construct(public readonly string $errorCode, public readonly string $path, string $message)
    {
        parent::__construct($message);
    }

    /** @return array{code: string, path: string, message: string} */
    public function toArray(): array
    {
        return ['code' => $this->errorCode, 'path' => $this->path, 'message' => $this->getMessage()];
    }
}
