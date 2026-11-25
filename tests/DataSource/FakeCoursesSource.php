<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\DataSourceAdapter;
use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DataSource\Domain\FieldDescriptor;
use CeibaCms\DataSource\Domain\QueryContext;

/** A host source with hostile data for the dynamic content tests (filters applied in memory). */
final class FakeCoursesSource implements DataSourceAdapter
{
    public int $calls = 0;
    public bool $down = false;

    /** @param list<array<string, mixed>> $rows */
    public function __construct(public array $rows) {}

    public function descriptor(QueryContext $context): DataSourceDescriptor
    {
        return new DataSourceDescriptor('host:courses', 'Cursos', [
            new FieldDescriptor('id', 'id', 'ID', nullable: false),
            new FieldDescriptor('title', 'text', 'Título', searchable: true),
            new FieldDescriptor('level', 'select', 'Nivel', options: ['basic', 'advanced']),
            new FieldDescriptor('price', 'decimal', 'Precio'),
            new FieldDescriptor('url', 'url', 'Enlace'),
            new FieldDescriptor('body', 'richtext', 'Contenido'),
            new FieldDescriptor('starts', 'date', 'Inicio'),
            new FieldDescriptor('secret', 'text', 'Secreto', public: false),
        ], ['search', 'pagination', 'single'], ['field' => 'id', 'direction' => 'asc'], 20, 'id');
    }

    public function fetch(DataQuery $query, QueryContext $context): array
    {
        $this->calls++;
        if ($this->down) {
            throw new \RuntimeException('SQLSTATE[HY000] connection to 10.0.0.5 refused (password=hunter2)');
        }
        $rows = array_values(array_filter($this->rows, function (array $r) use ($query) {
            foreach ($query->filters as $f) {
                if ($f['op'] === 'eq' && (string) ($r[$f['field']] ?? '') !== (string) $f['value']) {
                    return false;
                }
            }

            return $query->search === null || stripos((string) $r['title'], $query->search) !== false;
        }));

        return ['items' => array_slice($rows, $query->offset(), $query->pageSize), 'total' => count($rows)];
    }

    public function findBySlug(string $slug, QueryContext $context): ?array
    {
        foreach ($this->rows as $row) {
            if ((string) $row['id'] === $slug) {
                return $row;
            }
        }

        return null;
    }
}
