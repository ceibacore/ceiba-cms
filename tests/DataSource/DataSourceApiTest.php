<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Presentation\DataSourceApiController;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use PHPUnit\Framework\TestCase;

/** Plan 07-C: the editor's data source API reads with the visitor's context and never shows private fields. */
final class DataSourceApiTest extends TestCase
{
    private FakeCoursesSource $source;

    private function api(?HostContext $who): DataSourceApiController
    {
        $this->source = new FakeCoursesSource([['id' => '1', 'title' => 'PHP', 'level' => 'basic', 'secret' => 's'],
            ['id' => '2', 'title' => 'UX', 'level' => 'advanced', 'secret' => 's']]);
        $registry = new DataSourceRegistry();
        $registry->register($this->source);

        return new DataSourceApiController('site-a', fn () => $who, $registry, fn () => new QueryContext('site-a'));
    }

    private function editor(string $site = 'site-a', array $caps = ['pages.read']): HostContext
    {
        return new HostContext($site, 'u1', 'es', $caps);
    }

    public function testCatalogueSchemaRecordsAndPreview(): void
    {
        $api = $this->api($this->editor());
        self::assertSame([['id' => 'host:courses', 'label' => 'Cursos', 'capabilities' => ['search', 'pagination', 'single']]], $api->index()['data']['sources']);
        $schema = $api->schema('host:courses');
        self::assertNotContains('secret', array_column($schema['data']['source']['fields'], 'name'));
        self::assertSame([['slug' => '2', 'label' => 'UX']], $api->records('host:courses', 'UX')['data']['records']);

        $preview = $api->preview(json_encode(['query' => ['id' => 'list', 'source' => 'host:courses', 'page_size' => 5,
            'url_params' => [['param' => 'nivel', 'target' => 'filter', 'field' => 'level', 'op' => 'eq']]], 'params' => ['nivel' => 'basic', 'x' => 'y']]));
        self::assertTrue($preview['success']);
        self::assertSame(['PHP'], array_column($preview['data']['items'], 'title'));
        self::assertArrayNotHasKey('secret', $preview['data']['items'][0]);
    }

    public function testRefusalsAndFailures(): void
    {
        self::assertSame(403, $this->api(null)->index()['status']);
        self::assertSame(403, $this->api($this->editor('site-b'))->index()['status']);
        self::assertSame(403, $this->api($this->editor(caps: ['media.read']))->index()['status']);

        $api = $this->api($this->editor());
        self::assertSame(404, $api->schema('host:nope')['status']);
        $bad = $api->preview(json_encode(['query' => ['id' => 'l', 'source' => 'host:courses', 'filters' => [['field' => 'secret', 'op' => 'eq', 'value' => 's']]]]));
        self::assertSame([422, ['filters.0.field' => 'QUERY_FIELD']], [$bad['status'], $bad['error']['fieldErrors']]);

        $this->source->down = true;
        $down = $api->preview(json_encode(['query' => ['id' => 'l', 'source' => 'host:courses']]));
        self::assertSame([502, 'DATA_SOURCE_ERROR'], [$down['status'], $down['error']['code']]);
        self::assertStringNotContainsString('hunter2', json_encode($down));
    }
}
