<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Domain\DataQuery;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Infrastructure\DataSourceLoopResolver;
use CeibaCms\DataSource\Infrastructure\ModuleDataSources;
use CeibaCms\DynamicModule\Domain\Entity\ModuleDefinition;
use CeibaDB;
use PHPUnit\Framework\TestCase;

/** Plan 07-A: dynamic modules as data sources, against SQLite. */
final class ModuleDataSourceTest extends TestCase
{
    private CeibaDB $db;
    private DataSourceRegistry $registry;
    private QueryContext $context;
    private string $prefix;

    protected function tearDown(): void
    {
        $this->db->pdo()->exec("DROP TABLE IF EXISTS {$this->prefix}cms_courses");
        $this->db->pdo()->exec("DROP TABLE IF EXISTS {$this->prefix}cms_categories");
    }

    protected function setUp(): void
    {
        // SQLite by default; MariaDB/MySQL too when DB_HOST is set (same SQL must hold on both).
        $prefix = $this->prefix = 'ds_' . bin2hex(random_bytes(4)) . '_';
        $this->db = getenv('DB_HOST') ? CeibaDB::getInstance(['driver' => 'mysql', 'host' => getenv('DB_HOST'), 'port' => (int) (getenv('DB_PORT') ?: 3306),
            'db' => getenv('DB_NAME'), 'username' => getenv('DB_USER'), 'password' => (string) getenv('DB_PASS'), 'prefix' => $prefix])
            : CeibaDB::getInstance(['driver' => 'sqlite', 'db' => ':memory:', 'prefix' => $prefix]);
        $pdo = $this->db->pdo();
        $pdo->exec("CREATE TABLE {$prefix}cms_categories (id VARCHAR(36) PRIMARY KEY, name VARCHAR(100), secret VARCHAR(100), created_at VARCHAR(30),
            updated_at VARCHAR(30), deleted_at VARCHAR(30))");
        $pdo->exec("CREATE TABLE {$prefix}cms_courses (id VARCHAR(36) PRIMARY KEY, title VARCHAR(100), slug VARCHAR(100), price DECIMAL(10,2),
            category VARCHAR(36), internal_notes VARCHAR(100), created_at VARCHAR(30), updated_at VARCHAR(30), deleted_at VARCHAR(30))");
        $pdo->exec("INSERT INTO {$prefix}cms_categories VALUES ('c1', 'Programación', 'x', '2026-01-01', NULL, NULL)");
        foreach ([['a', 'PHP desde cero', 'php', '10', 'c1'], ['b', 'Descuento 100%', 'promo', '0', 'c1'], ['c', 'Diseño UX', 'ux', '30', null],
            ['d', 'Borrado', 'gone', '5', 'c1'], ['e', 'Datos 100 por ciento', 'datos', '20', null]] as $i => [$id, $title, $slug, $price, $cat]) {
            $deleted = $id === 'd' ? "'2026-02-01'" : 'NULL';
            $pdo->exec("INSERT INTO {$prefix}cms_courses VALUES ('{$id}', '{$title}', '{$slug}', '{$price}', " . ($cat ? "'{$cat}'" : 'NULL')
                . ", 'nota interna', '2026-01-0" . ($i + 1) . "', NULL, {$deleted})");
        }
        $definitions = new InMemoryDefinitions([
            ModuleDefinition::fromArray(['id' => '1', 'module_id' => 'm1', 'name' => 'Cursos', 'slug' => 'courses', 'fields' => [
                ['name' => 'title', 'type' => 'text', 'label' => 'Título'],
                ['name' => 'slug', 'type' => 'text', 'label' => 'Slug', 'isSearchable' => false],
                ['name' => 'price', 'type' => 'decimal', 'label' => 'Precio'],
                ['name' => 'category', 'type' => 'relation', 'label' => 'Categoría', 'relationTarget' => 'categories'],
                ['name' => 'internal_notes', 'type' => 'textarea', 'label' => 'Notas', 'isPublic' => false],
            ]]),
            ModuleDefinition::fromArray(['id' => '2', 'module_id' => 'm2', 'name' => 'Categorías', 'slug' => 'categories', 'fields' => [
                ['name' => 'secret', 'type' => 'text', 'label' => 'Secreto', 'isPublic' => false],
                ['name' => 'name', 'type' => 'text', 'label' => 'Nombre'],
            ]]),
        ]);
        $this->registry = new DataSourceRegistry();
        $this->registry->addProvider(new ModuleDataSources($this->db, $definitions));
        $this->context = new QueryContext('site-a');
    }

    private function query(array $query): array
    {
        return $this->registry->query(DataQuery::fromArray(['source' => 'module:courses'] + $query), $this->context)->toArray();
    }

    public function testModulesAreDescribedWithoutTheirPrivateFields(): void
    {
        $descriptor = $this->registry->descriptor('module:courses', $this->context)->toArray();
        self::assertSame(['id', 'title', 'slug', 'price', 'category', 'created_at', 'updated_at'], array_column($descriptor['fields'], 'name'));
        self::assertSame('slug', $descriptor['slug_field']);
        self::assertSame(['module:courses', 'module:categories'], array_keys($this->registry->descriptors($this->context)));
    }

    public function testFiltersSortPagesAndRelationLabelsWithoutPrivateDataOrDeletedRows(): void
    {
        $first = $this->query(['sort' => [['field' => 'price', 'direction' => 'asc']], 'page_size' => 2]);
        $second = $this->query(['sort' => [['field' => 'price', 'direction' => 'asc']], 'page_size' => 2, 'page' => 2]);
        self::assertSame(['b', 'a'], array_column($first['items'], 'id'));
        self::assertSame(['e', 'c'], array_column($second['items'], 'id'), 'stable pages, the deleted row never appears');
        self::assertSame(['page' => 1, 'page_size' => 2, 'total' => 4, 'pages' => 2, 'has_more' => true], $first['pagination']);
        self::assertSame('Programación', $first['items'][0]['category_label']);
        self::assertArrayNotHasKey('internal_notes', $first['items'][0]);

        $cheap = $this->query(['filters' => [['field' => 'price', 'op' => 'lte', 'value' => 10], ['field' => 'category', 'op' => 'not_null', 'value' => null]]]);
        self::assertEqualsCanonicalizing(['a', 'b'], array_column($cheap['items'], 'id'));
    }

    public function testSearchTreatsWildcardsAsText(): void
    {
        self::assertSame(['b'], array_column($this->query(['search' => '100%'])['items'], 'id'));
        self::assertSame(['a'], array_column($this->query(['filters' => [['field' => 'title', 'op' => 'starts_with', 'value' => 'PHP']]])['items'], 'id'));
        self::assertSame([], $this->query(['search' => '_'])['items']);
    }

    public function testPrivateFieldsCannotBeQueriedAndUnknownSourcesAreRefused(): void
    {
        foreach ([['filters' => [['field' => 'internal_notes', 'op' => 'contains', 'value' => 'nota']]], ['source' => 'module:nope']] as $query) {
            try {
                $this->registry->query(DataQuery::fromArray($query + ['source' => 'module:courses']), $this->context);
                self::fail('Expected a refusal');
            } catch (InvalidDataQuery $e) {
                self::assertContains($e->errorCode, ['QUERY_FIELD', 'QUERY_SOURCE']);
            }
        }
    }

    public function testASingleRecordIsFoundBySlug(): void
    {
        self::assertSame('PHP desde cero', $this->registry->single('module:courses', 'php', $this->context)['title']);
        self::assertNull($this->registry->single('module:courses', 'gone', $this->context), 'deleted');
        self::assertNull($this->registry->single('module:courses', 'missing', $this->context));
    }

    public function testNodeLoopsGoThroughTheRegistry(): void
    {
        $loops = new DataSourceLoopResolver($this->registry, fn () => $this->context);
        $items = $loops->resolve('module:courses', ['limit' => 2, 'offset' => 1, 'sort' => ['column' => 'price', 'direction' => 'ASC']]);
        self::assertSame(['a', 'e'], array_column($items, 'id'));
        self::assertSame([], $loops->resolve('module:courses', ['filters' => ['internal_notes' => 'nota interna']]), 'invalid loops draw nothing');
        self::assertSame([], $loops->resolve('api:http://169.254.169.254/latest'), 'no free URLs');
    }
}
