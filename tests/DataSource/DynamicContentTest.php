<?php
declare(strict_types=1);

namespace CeibaCms\Tests\DataSource;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Application\DynamicContent;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\Tests\PageBuilder\Components\ComponentFixturesTest;
use PHPUnit\Framework\TestCase;

/** Plan 07-B: query blocks, loops, bindings, states, filters and pagination, drawn by the Bootstrap 5 views. */
final class DynamicContentTest extends TestCase
{
    private FakeCoursesSource $source;
    private DynamicContent $dynamic;
    /** @var list<array{string, array}> */
    private array $logged = [];

    protected function setUp(): void
    {
        $rows = [];
        foreach (range(1, 5) as $i) {
            $rows[] = ['id' => (string) $i, 'title' => "Curso {$i}", 'level' => $i % 2 ? 'basic' : 'advanced', 'price' => 1000 * $i,
                'url' => "/cursos/{$i}", 'body' => '<p>Hola</p>', 'starts' => '2026-12-0' . $i, 'secret' => 'nunca'];
        }
        $rows[0]['title'] = 'PHP {{ request }} <b>x</b>';
        $rows[0]['url'] = 'javascript:alert(1)';
        $rows[0]['body'] = '<p onclick="x()">Hola <script>alert(1)</script><a href="javascript:x">y</a><a href="https://ok.test">z</a></p>';
        $this->source = new FakeCoursesSource($rows);
        $registry = new DataSourceRegistry();
        $registry->register($this->source);
        $this->dynamic = new DynamicContent($registry, log: function (string $m, array $c): void {
            $this->logged[] = [$m, $c];
        });
    }

    private function query(array $props, array $children): array
    {
        return ['type' => 'query', 'props' => $props + ['id' => 'courses', 'source' => 'host:courses', 'page_size' => 2], 'children' => $children];
    }

    private function card(): array
    {
        return ['type' => 'section', 'props' => ['class' => 'item'], 'loop' => ['query' => '', 'variable' => 'course'], 'children' => [
            ['type' => 'heading', 'props' => ['level' => 3], 'bindings' => ['text' => ['field' => 'title']]],
            ['type' => 'text', 'props' => ['content' => 'Desde {{ course.price }} · #{{ loop.index }}']],
            ['type' => 'button', 'props' => ['text' => 'Ver'], 'bindings' => ['href' => ['field' => 'url', 'fallback' => '/cursos']]],
            ['type' => 'html', 'props' => ['content' => '{{ course.title }}'], 'bindings' => ['content' => ['field' => 'body']]],
            ['type' => 'text', 'props' => ['content' => ''], 'bindings' => ['content' => ['field' => 'starts', 'transform' => 'date', 'args' => ['format' => 'd/m']]]],
            ['type' => 'text', 'props' => ['content' => '{{ course.secret }}|'], 'bindings' => ['class' => ['field' => 'secret', 'fallback' => 'none']]],
        ]];
    }

    private function render(array $tree, array $request = [], int $maxQueries = 10): string
    {
        [$expanded] = $this->dynamic->expand([$tree], $request, new QueryContext('site-a', 'es', maxQueries: $maxQueries));

        return ComponentFixturesTest::render($expanded, []);
    }

    public function testItemsAreBoundEscapedAndNeverLeakPrivateDataOrTemplates(): void
    {
        $html = $this->render([$this->query([], [$this->card(), ['type' => 'query_state', 'props' => ['show' => 'empty'], 'children' => [
            ['type' => 'text', 'props' => ['content' => 'Sin cursos']]]]])]);

        self::assertStringContainsString('data-cms-query="courses" data-cms-state="results"', $html);
        self::assertSame(2, substr_count($html, 'class="item"'));
        self::assertStringContainsString('<h3>PHP { { request } } x</h3>', $html, 'data is text: never a template, tags stripped');
        self::assertStringContainsString('Desde 1000 · #1', $html);
        self::assertStringContainsString('href="/cursos"', $html, 'a javascript: URL falls back');
        self::assertStringContainsString('href="/cursos/2"', $html);
        self::assertStringContainsString('<p>Hola <a>y</a><a href="https://ok.test" rel="noopener nofollow">z</a></p>', $html);
        self::assertStringNotContainsString('<script', $html);
        self::assertStringNotContainsString('onclick', $html);
        self::assertStringContainsString('01/12', $html);
        self::assertStringNotContainsString('nunca', $html, 'private field neither bound nor interpolated');
        self::assertStringNotContainsString('Sin cursos', $html);
    }

    public function testDeclaredUrlParametersFilterAndPaginateAndOthersAreIgnored(): void
    {
        $tree = [$this->query(['pagination' => true, 'page_size' => 1, 'url_params' => [['param' => 'q', 'target' => 'search'],
            ['param' => 'nivel', 'target' => 'filter', 'field' => 'level', 'op' => 'eq']]], [
            ['type' => 'query_filter', 'props' => ['param' => 'nivel', 'kind' => 'select', 'label' => 'Nivel']],
            $this->card(),
            ['type' => 'pagination', 'props' => []],
        ])];

        $html = $this->render($tree, ['nivel' => 'basic', 'page' => '2', 'secret' => 'x', 'q' => 'Curso']);
        self::assertSame(1, substr_count($html, 'class="item"'), 'basic courses matching q are 3 and 5: page 2 of 2');
        self::assertStringContainsString('Curso 5', $html);
        self::assertStringContainsString('<option value="basic" selected>basic</option>', $html);
        self::assertStringContainsString('<input type="hidden" name="q" value="Curso">', $html);
        self::assertStringNotContainsString('name="page"', $html, 'a new filter starts on page 1');
        self::assertStringContainsString('href="?q=Curso&amp;nivel=basic"', $html, 'page 1 link keeps the filters and drops the page');
        self::assertStringNotContainsString('secret', $html);

        $invalid = $this->render($tree, ['nivel' => 'expert']);
        self::assertStringContainsString('data-cms-state="error"', $invalid, 'a value outside the options is an error state, not a crash');
    }

    public function testEmptyErrorAndBudgetStatesNeverShowTheReason(): void
    {
        $states = [['type' => 'query_state', 'props' => ['show' => 'empty'], 'children' => [['type' => 'text', 'props' => ['content' => 'Vacío']]]],
            ['type' => 'query_state', 'props' => ['show' => 'error'], 'children' => [['type' => 'text', 'props' => ['content' => 'No disponible']]]]];

        self::assertStringContainsString('Vacío', $this->render([$this->query(['url_params' => [['param' => 'q', 'target' => 'search']]], $states)], ['q' => 'zzz']));
        $this->source->down = true;
        $down = $this->render([$this->query([], $states)]);
        self::assertStringContainsString('No disponible', $down);
        self::assertStringNotContainsString('hunter2', $down);
        self::assertSame('query failed', $this->logged[0][0]);

        $this->source->down = false;
        $calls = $this->source->calls;
        $two = [$this->query([], $states), $this->query(['id' => 'second'], $states)];
        self::assertStringContainsString('No disponible', $this->render($two, [], maxQueries: 1));
        self::assertSame($calls + 1, $this->source->calls, 'the second query is over budget and never runs');
    }

    public function testATreeWithoutQueriesIsLeftAlone(): void
    {
        $tree = [['type' => 'text', 'props' => ['content' => '{{ course.title }}']]];
        self::assertSame([$tree], $this->dynamic->expand([$tree], [], new QueryContext('site-a')));
        self::assertSame(0, $this->source->calls);
    }
}
