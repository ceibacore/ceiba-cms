<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\DataSourceDescriptor;
use CeibaCms\DataSource\Domain\FieldDescriptor;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Domain\QueryValidator;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

/** Plan 07-A: a query is checked against its source before it runs; nothing unknown is ignored. */
final class QueryValidatorTest extends TestCase
{
    private function source(array $capabilities = ['search', 'pagination']): DataSourceDescriptor
    {
        return new DataSourceDescriptor('module:courses', 'Cursos', [
            new FieldDescriptor('id', 'id', 'ID', nullable: false),
            new FieldDescriptor('title', 'text', 'Título', searchable: true),
            new FieldDescriptor('price', 'decimal', 'Precio'),
            new FieldDescriptor('seats', 'number', 'Cupos'),
            new FieldDescriptor('starts_on', 'date', 'Inicio'),
            new FieldDescriptor('featured', 'boolean', 'Destacado', nullable: false),
            new FieldDescriptor('level', 'select', 'Nivel', options: ['basic', 'advanced']),
            new FieldDescriptor('body', 'richtext', 'Contenido'),
            new FieldDescriptor('internal_cost', 'decimal', 'Costo', public: false),
        ], $capabilities, ['field' => 'starts_on', 'direction' => 'desc'], 20);
    }

    private function check(array $query, ?DataSourceDescriptor $source = null): DataQuery
    {
        return (new QueryValidator())->validate(DataQuery::fromArray(['source' => 'module:courses'] + $query), $source ?? $this->source(),
            new QueryContext('site-a', maxPageSize: 30));
    }

    /** @return iterable<string, array{array<string, mixed>, string}> */
    public static function invalid(): iterable
    {
        yield 'unknown field' => [['filters' => [['field' => 'nope', 'op' => 'eq', 'value' => 1]]], 'QUERY_FIELD'];
        yield 'private field' => [['filters' => [['field' => 'internal_cost', 'op' => 'gt', 'value' => 1]]], 'QUERY_FIELD'];
        yield 'operator not for type' => [['filters' => [['field' => 'title', 'op' => 'gt', 'value' => 'a']]], 'QUERY_OPERATOR'];
        yield 'unknown operator' => [['filters' => [['field' => 'title', 'op' => 'regex', 'value' => '.*']]], 'QUERY_OPERATOR'];
        yield 'richtext not filterable' => [['filters' => [['field' => 'body', 'op' => 'contains', 'value' => 'x']]], 'QUERY_OPERATOR'];
        yield 'number value' => [['filters' => [['field' => 'seats', 'op' => 'eq', 'value' => '3 OR 1=1']]], 'QUERY_VALUE'];
        yield 'date value' => [['filters' => [['field' => 'starts_on', 'op' => 'gt', 'value' => 'not a date']]], 'QUERY_VALUE'];
        yield 'select outside options' => [['filters' => [['field' => 'level', 'op' => 'eq', 'value' => 'expert']]], 'QUERY_VALUE'];
        yield 'array where scalar' => [['filters' => [['field' => 'title', 'op' => 'eq', 'value' => ['a']]]], 'QUERY_VALUE'];
        yield 'empty in' => [['filters' => [['field' => 'level', 'op' => 'in', 'value' => []]]], 'QUERY_VALUE'];
        yield 'private sort' => [['sort' => [['field' => 'internal_cost', 'direction' => 'asc']]], 'QUERY_SORT'];
        yield 'richtext sort' => [['sort' => [['field' => 'body', 'direction' => 'asc']]], 'QUERY_SORT'];
        yield 'bad direction' => [['sort' => [['field' => 'title', 'direction' => 'sideways']]], 'QUERY_SORT'];
        yield 'page size over source limit' => [['page_size' => 21], 'QUERY_PAGE_SIZE'];
        yield 'zero page size' => [['page_size' => 0], 'QUERY_PAGE_SIZE'];
        yield 'page zero' => [['page' => 0], 'QUERY_PAGE'];
        yield 'too far' => [['page' => 2000, 'page_size' => 20], 'QUERY_PAGE'];
        yield 'filters not a list' => [['filters' => ['title' => 'x']], 'QUERY_SHAPE'];
    }

    #[DataProvider('invalid')]
    public function testInvalidQueriesAreRefused(array $query, string $code): void
    {
        try {
            $this->check($query);
            self::fail("Expected {$code}");
        } catch (InvalidDataQuery $e) {
            self::assertSame($code, $e->errorCode);
        }
    }

    public function testValuesAreNormalisedAndTheDefaultSortApplies(): void
    {
        $query = $this->check(['filters' => [
            ['field' => 'featured', 'op' => 'eq', 'value' => 'true'],
            ['field' => 'starts_on', 'op' => 'gte', 'value' => '2026-12-01T10:00:00'],
            ['field' => 'seats', 'op' => 'in', 'value' => ['3', 4]],
            ['field' => 'price', 'op' => 'is_null', 'value' => 'ignored'],
        ], 'page_size' => '5']);

        self::assertSame([true, '2026-12-01', [3, 4], null], array_column($query->filters, 'value'));
        self::assertSame([['field' => 'starts_on', 'direction' => 'desc']], $query->sort);
        self::assertSame(5, $query->pageSize);
    }

    public function testSearchAndPagingNeedTheirCapability(): void
    {
        $plain = $this->source([]);
        foreach ([['search' => 'php'], ['page' => 2]] as $query) {
            try {
                $this->check($query, $plain);
                self::fail('Expected a refusal');
            } catch (InvalidDataQuery $e) {
                self::assertContains($e->errorCode, ['QUERY_SEARCH', 'QUERY_PAGE']);
            }
        }
        self::assertSame('php', $this->check(['search' => '  php '])->search);
    }

    public function testTheCatalogueNeverListsPrivateFields(): void
    {
        $names = array_column($this->source()->toArray()['fields'], 'name');
        self::assertNotContains('internal_cost', $names);
        self::assertSame(['title'], $this->source()->searchableFields());
    }
}
