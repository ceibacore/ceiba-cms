<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Domain;

/**
 * What one `query` node produced for this request (plan 07-B): results, empty or error (with a code, never a
 * trace), the URL values it used and the options of its select fields for filters.
 */
final class QueryOutcome
{
    /**
     * @param array<string, string> $values
     * @param array<string, list<array{value: string, label: string}>> $options
     */
    public function __construct(
        public readonly QueryNodeConfig $config,
        public readonly ?QueryResult $result,
        public readonly ?string $error = null,
        public readonly array $values = [],
        public readonly array $options = [],
    ) {}

    public function state(): string
    {
        return $this->error !== null ? 'error' : ($this->result === null || $this->result->items === [] ? 'empty' : 'results');
    }

    /** @return list<array<string, mixed>> */
    public function items(): array
    {
        return $this->result?->items ?? [];
    }
}
