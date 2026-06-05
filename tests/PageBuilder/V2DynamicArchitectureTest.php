<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder;

use LemurCms\PageBuilder\Domain\Entity\PageTemplate;
use LemurCms\PageBuilder\Infrastructure\LemurDbPageTemplateRepository;
use LemurCms\PageBuilder\Domain\Service\ContextResolver;
use LemurCms\PageBuilder\Domain\Service\ConditionEngine;
use LemurCms\PageBuilder\Domain\Service\QueryEngine;
use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\VariableInterpolator;
use LemurCms\PageBuilder\Domain\Service\LoopResolverInterface;
use LemurCms\Http\Controllers\PageRenderController;
use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\PageBuilder\Application\GetPageTemplateById;
use LemurCms\Auth\AuthManager;
use LemurCms\Support\Exceptions\SecurityException;
use LemurCms\Tests\TestCase;

class V2DynamicArchitectureTest extends TestCase
{
    private LemurDbPageTemplateRepository $templateRepo;
    private $authMock;

    protected function setUp(): void
    {
        parent::setUp();
        $this->templateRepo = new LemurDbPageTemplateRepository($this->db);
        $this->authMock = $this->createMock(AuthManager::class);
    }

    // ── 1. Page Template Repository ──────────────────────────────────────────
    public function testSaveAndFindPageTemplate(): void
    {
        $id = $this->templateRepo->save([
            'name' => 't_articles_test',
            'description' => 'Template for articles tests',
            'tree' => [
                [
                    'id' => 'slot-1',
                    'type' => 'slot',
                    'name' => 'slot',
                    'props' => ['name' => 'main']
                ]
            ],
            'slots_definition' => ['main'],
            'thumbnail' => 't_articles.png'
        ]);

        $this->assertIsString($id);

        $template = $this->templateRepo->findById($id);
        $this->assertNotNull($template);
        $this->assertSame('t_articles_test', $template['name']);
        $this->assertSame(['main'], $template['slots_definition']);
        $this->assertSame('slot', $template['tree'][0]['type'] ?? '');

        // Cleanup
        $this->templateRepo->delete($id);
        $this->assertNull($this->templateRepo->findById($id));
    }

    // ── 2. Context Resolver ──────────────────────────────────────────────────
    public function testContextResolver(): void
    {
        $this->authMock->method('user')->willReturn([
            'id' => 'user-123',
            'email' => 'test@user.com'
        ]);

        $resolver = new ContextResolver($this->authMock);

        $_GET['category'] = 'tech';
        $routeParams = ['slug' => 'welcome-post'];

        // Request parameters
        $this->assertSame('tech', $resolver->resolve('{{ request.query.category }}', $routeParams));
        $this->assertSame('welcome-post', $resolver->resolve('{{ request.route.slug }}', $routeParams));

        // Auth parameters
        $this->assertSame('test@user.com', $resolver->resolve('{{ auth.user.email }}', $routeParams));

        // Constants
        $this->assertSame(date('Y-m-d'), $resolver->resolve('{{ date.today }}'));
    }

    // ── 3. Condition Engine ──────────────────────────────────────────────────
    public function testConditionEngineAuthGuest(): void
    {
        $this->authMock->method('check')->willReturn(false);
        $engine = new ConditionEngine($this->authMock, $this->db);

        $cond = [
            'id' => 'c1',
            'type' => 'auth',
            'operator' => 'is_guest',
            'params' => []
        ];
        $this->assertTrue($engine->evaluateCondition($cond));

        $cond['operator'] = 'is_authenticated';
        $this->assertFalse($engine->evaluateCondition($cond));
    }

    public function testConditionEngineAuthAuthed(): void
    {
        $this->authMock->method('check')->willReturn(true);
        $engine = new ConditionEngine($this->authMock, $this->db);

        $cond = [
            'id' => 'c1',
            'type' => 'auth',
            'operator' => 'is_authenticated',
            'params' => []
        ];
        $this->assertTrue($engine->evaluateCondition($cond));
    }

    // ── 4. Query Engine ──────────────────────────────────────────────────────
    public function testQueryEngineSafetyWhitelist(): void
    {
        $resolver = new ContextResolver($this->authMock);
        $engine = new QueryEngine($this->db, $resolver, ['Article' => 'articles']);

        $config = [
            'id' => 'q1',
            'context_key' => 'users',
            'model' => 'User' // Not whitelisted
        ];

        $this->expectException(SecurityException::class);
        $engine->executeQuery($config);
    }

    // ── 5. Blade Renderer (Slots Merging) ────────────────────────────────────
    public function testSlotsMerging(): void
    {
        $loopResolver = $this->createMock(LoopResolverInterface::class);
        $interpolator = new VariableInterpolator();
        $renderer = new BladeRenderer($loopResolver, $interpolator);

        $templateTree = [
            [
                'id' => 'n1',
                'type' => 'div',
                'name' => 'container',
                'children' => [
                    [
                        'id' => 'slot-1',
                        'type' => 'slot',
                        'name' => 'slot',
                        'props' => ['name' => 'main'],
                        'children' => []
                    ]
                ]
            ]
        ];

        $pageContent = [
            [
                'id' => 'page-node-1',
                'type' => 'p',
                'props' => ['content' => 'Hello Page Slot']
            ]
        ];

        $merged = $renderer->mergeTemplateAndPage($templateTree, $pageContent);

        $this->assertCount(1, $merged);
        $this->assertSame('div', $merged[0]['type']);
        $this->assertCount(1, $merged[0]['children']);
        $this->assertSame('p', $merged[0]['children'][0]['type']);
        $this->assertSame('Hello Page Slot', $merged[0]['children'][0]['props']['content']);
    }

    // ── 6. Page Render Controller ────────────────────────────────────────────
    public function testPageRenderControllerEvaluatesFallbackRedirect(): void
    {
        $pageData = [
            'id' => 'p1',
            'title' => 'Protected Page',
            'slug' => 'protected',
            'status' => 'published',
            'content' => [],
            'conditions' => [
                [
                    'id' => 'c1',
                    'type' => 'auth',
                    'operator' => 'is_authenticated',
                    'fallback' => [
                        'action' => 'redirect',
                        'to' => '/login-custom'
                    ]
                ]
            ]
        ];

        $pageRepoMock = $this->createMock(\LemurCms\Page\Domain\Repository\PageRepositoryInterface::class);
        $pageRepoMock->method('findBySlug')->willReturn($pageData);
        $getPageBySlug = new GetPageBySlug($pageRepoMock);

        $this->authMock->method('check')->willReturn(false); // Guest -> fails condition

        $bladeRenderer = $this->createMock(BladeRenderer::class);
        $conditionEngine = new ConditionEngine($this->authMock, $this->db);

        $controller = new PageRenderController(
            getPageBySlug:        $getPageBySlug,
            bladeRenderer:        $bladeRenderer,
            getLayoutById:        null,
            getDefaultLayout:     null,
            layoutRenderer:       null,
            getNavbar:            null,
            getPageTemplateById:  null,
            conditionEngine:      $conditionEngine,
            queryEngine:          null
        );

        // Capture output/headers
        ob_start();
        $controller->show('protected');
        $output = ob_get_clean();

        // Should abort / redirect without crashing the test run
        $this->assertEmpty($output);
    }
}
