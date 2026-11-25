<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Infrastructure;

use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DynamicModule\Domain\Repository\ModuleDefinitionRepositoryInterface;
use CeibaDB;

/**
 * `{relation}_label` for public relation fields (plan 07-A): one query per relation field for the whole page (no
 * N+1), depth 1. The label is the target module's first public text field; a private target field is never used.
 */
final class ModuleRelationLabels
{
    public function __construct(private readonly CeibaDB $db, private readonly ModuleDefinitionRepositoryInterface $definitions) {}

    /**
     * @param list<array<string, mixed>> $rows
     * @return list<array<string, mixed>>
     */
    public function attach(array $rows, DataSourceDescriptor $descriptor): array
    {
        foreach ($descriptor->publicFields() as $name => $field) {
            if ($field->type !== 'relation' || $rows === []) {
                continue;
            }
            $ids = array_values(array_unique(array_filter(array_map(fn ($r) => $r[$name] ?? null, $rows), fn ($v) => is_scalar($v) && $v !== '')));
            $labels = $ids === [] ? [] : $this->labels(substr((string) $field->relationSource, 7), $ids);
            foreach ($rows as $i => $row) {
                $rows[$i]["{$name}_label"] = $labels[(string) ($row[$name] ?? '')] ?? null;
            }
        }

        return $rows;
    }

    /**
     * @param list<scalar> $ids
     * @return array<string, string>
     */
    private function labels(string $targetSlug, array $ids): array
    {
        $target = $this->definitions->findBySlug($targetSlug);
        if ($target === null) {
            return [];
        }
        $labelField = null;
        foreach ($target->fields as $f) {
            if ($f->isPublic && in_array($f->type, ['text', 'textarea'], true)) {
                $labelField = $f->name;
                break;
            }
        }
        if ($labelField === null) {
            return [];
        }
        $out = [];
        foreach ($this->db->query($target->tableName())->whereNull('deleted_at')->whereIn('id', $ids)->select(['id', $labelField])->get() as $row) {
            $out[(string) $row['id']] = (string) $row[$labelField];
        }

        return $out;
    }
}
