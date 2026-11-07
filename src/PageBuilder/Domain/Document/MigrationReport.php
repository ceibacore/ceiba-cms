<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Document;

final class MigrationReport
{
    /**
     * @param list<MigrationIncompatibility> $incompatibilities
     * @param array<string, int> $stats
     */
    public function __construct(
        public readonly string $documentId,
        public readonly string $originalSnapshot,
        public readonly ?DocumentEnvelope $migratedDocument,
        public readonly array $incompatibilities,
        public readonly array $stats,
        public readonly bool $isSuccessful,
    ) {}

    public function hasWarnings(): bool
    {
        foreach ($this->incompatibilities as $item) {
            if ($item->severity === MigrationIncompatibility::SEVERITY_WARNING) {
                return true;
            }
        }
        return false;
    }

    public function hasErrors(): bool
    {
        return !$this->isSuccessful;
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'documentId'        => $this->documentId,
            'isSuccessful'      => $this->isSuccessful,
            'hasWarnings'       => $this->hasWarnings(),
            'hasErrors'         => $this->hasErrors(),
            'stats'             => $this->stats,
            'incompatibilities' => array_map(fn(MigrationIncompatibility $i) => $i->toArray(), $this->incompatibilities),
            'originalSnapshot'  => $this->originalSnapshot,
            'migratedDocument'  => $this->migratedDocument?->toJson(),
        ];
    }
}
