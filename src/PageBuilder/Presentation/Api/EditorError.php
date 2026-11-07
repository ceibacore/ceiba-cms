<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Presentation\Api;

/**
 * Structured, sanitized error response contract for editor visual APIs.
 * Guarantees that internal traces, database paths, and secrets are never exposed.
 */
final class EditorError
{
    /**
     * @param array<string, string> $fieldErrors Field path to localized/sanitized error message
     */
    public function __construct(
        public readonly string $code,
        public readonly string $message,
        public readonly array $fieldErrors = [],
        public readonly string $requestId = '',
    ) {}

    public static function create(string $code, string $message, array $fieldErrors = [], string $requestId = ''): self
    {
        return new self(
            code: $code,
            message: $message,
            fieldErrors: $fieldErrors,
            requestId: $requestId !== '' ? $requestId : self::generateRequestId(),
        );
    }

    public static function generateRequestId(): string
    {
        return 'req_' . bin2hex(random_bytes(8));
    }

    /** @return array{error: array{code: string, message: string, fieldErrors: array<string, string>, requestId: string}} */
    public function toArray(): array
    {
        return [
            'error' => [
                'code'        => $this->code,
                'message'     => $this->message,
                'fieldErrors' => $this->fieldErrors,
                'requestId'   => $this->requestId !== '' ? $this->requestId : self::generateRequestId(),
            ],
        ];
    }
}
