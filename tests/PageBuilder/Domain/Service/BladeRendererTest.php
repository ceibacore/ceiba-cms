<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\LoopResolverInterface;
use LemurCms\PageBuilder\Domain\Service\VariableInterpolator;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use LemurCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module;
use PHPUnit\Framework\TestCase;

class BladeRendererTest extends TestCase
{
    private BladeRenderer $renderer;
    private $mockLoopResolver;

    protected function setUp(): void
    {
        parent::setUp();
        $this->mockLoopResolver = $this->createMock(LoopResolverInterface::class);
        $interpolator = new VariableInterpolator();

        $registry = new UiFrameworkRegistry();
        $registry->register(new Bootstrap5Module());
        $registry->setActive('bootstrap5');

        $this->renderer = new BladeRenderer($this->mockLoopResolver, $interpolator, $registry);
    }

    public function testRenderSimpleNodeWithoutChildren(): void
    {
        $node = [
            'type' => 'text',
            'props' => [
                'tag' => 'p',
                'content' => 'Hello World',
                'class' => 'lead'
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('<p class="lead">Hello World</p>', $html);
    }

    public function testRenderRecursiveTree(): void
    {
        $tree = [
            [
                'type' => 'container',
                'props' => ['fluid' => false, 'class' => 'my-container'],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'row',
                        'props' => ['gutter' => 'g-3'],
                        'loop' => null,
                        'children' => [
                            [
                                'type' => 'col',
                                'props' => ['md' => 6],
                                'loop' => null,
                                'children' => [
                                    [
                                        'type' => 'text',
                                        'props' => ['content' => 'Inside Column'],
                                        'loop' => null,
                                        'children' => []
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ];

        $html = $this->renderer->renderPage($tree);
        $this->assertStringContainsString('class="container my-container"', $html);
        $this->assertStringContainsString('class="row g-3"', $html);
        $this->assertStringContainsString('col-md-6', $html);
        $this->assertStringContainsString('<p>Inside Column</p>', $html);
    }

    public function testRenderNodeWithVariableInterpolation(): void
    {
        $node = [
            'type' => 'text',
            'props' => [
                'tag' => 'h2',
                'content' => 'Welcome {{ user.first_name }} {{ user.last_name }}!',
                'class' => 'title'
            ],
            'loop' => null,
            'children' => []
        ];

        $context = [
            'user' => [
                'first_name' => 'Alice',
                'last_name' => 'Smith'
            ]
        ];

        $html = $this->renderer->renderNode($node, $context);
        $this->assertStringContainsString('<h2 class="title">Welcome Alice Smith!</h2>', $html);
    }

    public function testRenderNodeWithLoop(): void
    {
        $node = [
            'type' => 'row',
            'props' => ['gutter' => 'g-2'],
            'loop' => null,
            'children' => [
                [
                    'type' => 'col',
                    'props' => ['md' => 4],
                    'loop' => [
                        'source' => 'books',
                        'variable' => 'book',
                    ],
                    'children' => [
                        [
                            'type' => 'text',
                            'props' => [
                                'content' => 'Book: {{ book.title }} by {{ book.author }}'
                            ],
                            'children' => []
                        ]
                    ]
                ]
            ]
        ];

        $books = [
            ['title' => 'The Hobbit', 'author' => 'Tolkien'],
            ['title' => '1984', 'author' => 'Orwell']
        ];

        $this->mockLoopResolver
            ->expects($this->once())
            ->method('resolve')
            ->with('books', [])
            ->willReturn($books);

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('col-md-4', $html);
        $this->assertStringContainsString('<p>Book: The Hobbit by Tolkien</p>', $html);
        $this->assertStringContainsString('<p>Book: 1984 by Orwell</p>', $html);
    }

    public function testRenderAccordionInjectsParentIdIntoItems(): void
    {
        $tree = [
            [
                'type' => 'accordion',
                'props' => [
                    'id' => 'faqAccordion',
                    'flush' => false,
                    'always_open' => false,
                    'class' => '',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'accordion_item',
                        'props' => [
                            'title' => 'Question 1',
                            'open' => true,
                            'class' => '',
                        ],
                        'loop' => null,
                        'children' => [
                            [
                                'type' => 'text',
                                'props' => ['tag' => 'p', 'content' => 'Answer 1'],
                                'loop' => null,
                                'children' => [],
                            ],
                        ],
                    ],
                    [
                        'type' => 'accordion_item',
                        'props' => [
                            'title' => 'Question 2',
                            'open' => false,
                            'class' => '',
                        ],
                        'loop' => null,
                        'children' => [
                            [
                                'type' => 'text',
                                'props' => ['tag' => 'p', 'content' => 'Answer 2'],
                                'loop' => null,
                                'children' => [],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        // Accordion container
        $this->assertStringContainsString('id="faqAccordion"', $html);
        $this->assertStringContainsString('class="accordion"', $html);

        // First item should be open
        $this->assertStringContainsString('Question 1', $html);
        $this->assertStringContainsString('aria-expanded="true"', $html);
        $this->assertStringContainsString('<p>Answer 1</p>', $html);

        // Second item should be collapsed
        $this->assertStringContainsString('Question 2', $html);
        $this->assertStringContainsString('<p>Answer 2</p>', $html);

        // Parent ID injection: data-bs-parent should reference the accordion
        $this->assertStringContainsString('data-bs-parent="#faqAccordion"', $html);
    }

    public function testRenderAccordionAlwaysOpenOmitsParentAttr(): void
    {
        $tree = [
            [
                'type' => 'accordion',
                'props' => [
                    'id' => 'openAccordion',
                    'flush' => true,
                    'always_open' => true,
                    'class' => 'mt-3',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'accordion_item',
                        'props' => [
                            'title' => 'Item A',
                            'open' => false,
                            'class' => '',
                        ],
                        'loop' => null,
                        'children' => [],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        // Flush variant
        $this->assertStringContainsString('accordion-flush', $html);
        $this->assertStringContainsString('mt-3', $html);

        // always_open = true should NOT have data-bs-parent
        $this->assertStringNotContainsString('data-bs-parent', $html);
    }

    public function testRenderButtonGroup(): void
    {
        $tree = [
            [
                'type' => 'button_group',
                'props' => [
                    'vertical' => false,
                    'size' => 'btn-group-lg',
                    'aria_label' => 'Main actions',
                    'class' => '',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'button',
                        'props' => ['label' => 'Left', 'href' => '#', 'variant' => 'outline-primary'],
                        'loop' => null,
                        'children' => [],
                    ],
                    [
                        'type' => 'button',
                        'props' => ['label' => 'Right', 'href' => '#', 'variant' => 'outline-primary'],
                        'loop' => null,
                        'children' => [],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        $this->assertStringContainsString('btn-group', $html);
        $this->assertStringNotContainsString('btn-group-vertical', $html);
        $this->assertStringContainsString('btn-group-lg', $html);
        $this->assertStringContainsString('aria-label="Main actions"', $html);
        $this->assertStringContainsString('Left', $html);
        $this->assertStringContainsString('Right', $html);
    }

    public function testRenderButtonGroupVertical(): void
    {
        $tree = [
            [
                'type' => 'button_group',
                'props' => [
                    'vertical' => true,
                    'size' => '',
                    'aria_label' => 'Vertical group',
                    'class' => 'my-2',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'button',
                        'props' => ['label' => 'Top', 'href' => '#', 'variant' => 'primary'],
                        'loop' => null,
                        'children' => [],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        $this->assertStringContainsString('btn-group-vertical', $html);
        $this->assertStringContainsString('my-2', $html);
        $this->assertStringContainsString('Top', $html);
    }

    public function testRenderBreadcrumbWithContext(): void
    {
        $node = [
            'type' => 'breadcrumb',
            'props' => [
                'divider' => '»',
                'show_home' => true,
                'home_label' => 'Home',
                'class' => 'mb-3',
            ],
            'loop' => null,
            'children' => [],
        ];

        $context = [
            'breadcrumbs' => [
                ['label' => 'Blog', 'url' => '/blog'],
                ['label' => 'PHP Tutorial', 'url' => '/blog/php-tutorial'],
            ],
        ];

        $html = $this->renderer->renderNode($node, $context);

        // Home item prepended
        $this->assertStringContainsString('Home', $html);
        $this->assertStringContainsString('href="/"', $html);

        // Crumb items
        $this->assertStringContainsString('Blog', $html);
        $this->assertStringContainsString('href="/blog"', $html);

        // Last item is active (no link)
        $this->assertStringContainsString('PHP Tutorial', $html);
        $this->assertStringContainsString('aria-current="page"', $html);

        // Custom divider
        $this->assertStringContainsString('»', $html);

        // Custom class
        $this->assertStringContainsString('mb-3', $html);
    }

    public function testRenderBreadcrumbWithoutHome(): void
    {
        $node = [
            'type' => 'breadcrumb',
            'props' => [
                'divider' => '/',
                'show_home' => false,
                'home_label' => 'Inicio',
                'class' => '',
            ],
            'loop' => null,
            'children' => [],
        ];

        $context = [
            'breadcrumbs' => [
                ['label' => 'Products', 'url' => '/products'],
            ],
        ];

        $html = $this->renderer->renderNode($node, $context);

        // No home item
        $this->assertStringNotContainsString('Inicio', $html);

        // Only the single crumb
        $this->assertStringContainsString('Products', $html);
    }

    public function testRenderCarousel(): void
    {
        $tree = [
            [
                'type' => 'carousel',
                'props' => [
                    'id' => 'mainCarousel',
                    'controls' => true,
                    'indicators' => false,
                    'autoplay' => true,
                    'interval' => 3000,
                    'fade' => true,
                    'dark' => true,
                    'class' => 'my-5',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'carousel_item',
                        'props' => [
                            'image_src' => 'image1.jpg',
                            'image_alt' => 'Image 1',
                            'caption_title' => 'Title 1',
                            'caption_text' => 'Text 1',
                            'active' => true,
                            'interval' => 4000,
                        ],
                        'loop' => null,
                        'children' => [],
                    ],
                    [
                        'type' => 'carousel_item',
                        'props' => [
                            'image_src' => 'image2.jpg',
                            'image_alt' => 'Image 2',
                            'active' => false,
                        ],
                        'loop' => null,
                        'children' => [],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        // Carousel container
        $this->assertStringContainsString('id="mainCarousel"', $html);
        $this->assertStringContainsString('class="carousel slide carousel-fade carousel-dark my-5"', $html);
        $this->assertStringContainsString('data-bs-ride="carousel"', $html);
        $this->assertStringContainsString('data-bs-interval="3000"', $html);

        // Controls
        $this->assertStringContainsString('data-bs-target="#mainCarousel"', $html);
        $this->assertStringContainsString('carousel-control-prev', $html);
        $this->assertStringContainsString('carousel-control-next', $html);

        // Items
        $this->assertStringContainsString('carousel-item active', $html);
        $this->assertStringContainsString('data-bs-interval="4000"', $html);
        $this->assertStringContainsString('src="image1.jpg"', $html);
        $this->assertStringContainsString('alt="Image 1"', $html);
        $this->assertStringContainsString('<h5>Title 1</h5>', $html);
        $this->assertStringContainsString('<p>Text 1</p>', $html);

        $this->assertStringContainsString('src="image2.jpg"', $html);
        $this->assertStringContainsString('alt="Image 2"', $html);
        // Second item has no explicit interval and is not active
        $this->assertStringNotContainsString('carousel-item active data-bs-interval="4000"', $html);
    }

    public function testRenderCollapse(): void
    {
        $tree = [
            [
                'type' => 'collapse',
                'props' => [
                    'id' => 'collapsePanel',
                    'trigger_label' => 'Show More',
                    'trigger_variant' => 'info',
                    'show_trigger' => true,
                    'open' => true,
                    'class' => 'mt-2',
                ],
                'loop' => null,
                'children' => [
                    [
                        'type' => 'text',
                        'props' => ['tag' => 'p', 'content' => 'Hidden content'],
                        'loop' => null,
                        'children' => [],
                    ],
                ],
            ],
        ];

        $html = $this->renderer->renderPage($tree);

        // Trigger button
        $this->assertStringContainsString('class="btn btn-info"', $html);
        $this->assertStringContainsString('data-bs-toggle="collapse"', $html);
        $this->assertStringContainsString('data-bs-target="#collapsePanel"', $html);
        $this->assertStringContainsString('aria-expanded="true"', $html);
        $this->assertStringContainsString('Show More', $html);

        // Collapse container
        $this->assertStringContainsString('class="collapse show mt-2"', $html);
        $this->assertStringContainsString('id="collapsePanel"', $html);

        // Content
        $this->assertStringContainsString('<p>Hidden content</p>', $html);
    }

    public function testRenderListGroup(): void
    {
        $node = [
            'type' => 'list_group',
            'props' => [
                'flush' => true,
                'numbered' => true,
                'item_as_link' => true,
                'class' => 'my-list',
                'items' => [
                    [
                        'label' => 'Item 1',
                        'href' => '/item1',
                        'variant' => 'success',
                        'active' => true,
                        'badge' => 'New',
                        'badge_variant' => 'danger',
                    ],
                    [
                        'label' => 'Item 2',
                        'disabled' => true,
                    ]
                ],
            ],
            'loop' => null,
            'children' => [],
        ];

        $html = $this->renderer->renderNode($node);

        // List Group Container (numbered -> ol)
        $this->assertStringContainsString('<ol class="list-group list-group-flush list-group-numbered my-list">', $html);

        // Item 1 (Link, Active, Success, Badge)
        $this->assertStringContainsString('<a class="list-group-item list-group-item-action list-group-item-success active d-flex justify-content-between align-items-center" href="/item1" aria-current="true">', $html);
        $this->assertStringContainsString('Item 1', $html);
        $this->assertStringContainsString('<span class="badge bg-danger rounded-pill">', $html);
        $this->assertStringContainsString('New', $html);

        // Item 2 (Link, Disabled)
        $this->assertStringContainsString('<li class="list-group-item list-group-item-action disabled d-flex justify-content-between align-items-center">', $html);
        $this->assertStringContainsString('Item 2', $html);
    }

    public function testRenderTooltip(): void
    {
        $node = [
            'type' => 'tooltip',
            'props' => [
                'label' => 'Hover Me',
                'tooltip_text' => 'This is a tooltip',
                'placement' => 'right',
                'variant' => 'info',
                'class' => 'my-tt',
            ],
            'loop' => null,
            'children' => [],
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('<button type="button" class="btn btn-info my-tt"', $html);
        $this->assertStringContainsString('data-bs-toggle="tooltip"', $html);
        $this->assertStringContainsString('data-bs-placement="right"', $html);
        $this->assertStringContainsString('title="This is a tooltip"', $html);
        $this->assertStringContainsString('Hover Me', $html);
    }

    public function testRenderToast(): void
    {
        $node = [
            'type' => 'toast',
            'props' => [
                'id' => 'myToast',
                'title' => 'Alert',
                'message' => 'Toast message',
                'time' => '1 min ago',
                'variant' => 'warning',
                'autohide' => false,
                'class' => 'custom-toast',
            ],
            'loop' => null,
            'children' => [
                [
                    'type' => 'text',
                    'props' => ['tag' => 'p', 'content' => 'Extra content'],
                    'loop' => null,
                    'children' => [],
                ],
            ],
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('id="myToast"', $html);
        $this->assertStringContainsString('class="toast custom-toast"', $html);
        $this->assertStringContainsString('data-bs-autohide="false"', $html);
        $this->assertStringContainsString('class="toast-header text-bg-warning"', $html);
        $this->assertStringContainsString('Alert', $html);
        $this->assertStringContainsString('1 min ago', $html);
        $this->assertStringContainsString('Toast message', $html);
        $this->assertStringContainsString('<p>Extra content</p>', $html);
    }

    public function testRenderScrollspy(): void
    {
        $node = [
            'type' => 'scrollspy',
            'props' => [
                'id' => 'mySpy',
                'nav_id' => 'navbar',
                'class' => 'p-3',
            ],
            'loop' => null,
            'children' => [
                [
                    'type' => 'text',
                    'props' => ['tag' => 'p', 'content' => 'Spy content'],
                    'loop' => null,
                    'children' => [],
                ],
            ],
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('id="mySpy"', $html);
        $this->assertStringContainsString('class="scrollspy-example p-3"', $html);
        $this->assertStringContainsString('data-bs-spy="scroll"', $html);
        $this->assertStringContainsString('data-bs-target="#navbar"', $html);
        $this->assertStringContainsString('<p>Spy content</p>', $html);
    }

    public function testRenderOffcanvas(): void
    {
        $node = [
            'type' => 'offcanvas',
            'props' => [
                'id' => 'myOffcanvas',
                'title' => 'Menu',
                'placement' => 'end',
                'backdrop' => false,
                'body_text' => 'Body info',
                'class' => 'w-50',
            ],
            'loop' => null,
            'children' => [
                [
                    'type' => 'text',
                    'props' => ['tag' => 'p', 'content' => 'Child content'],
                    'loop' => null,
                    'children' => [],
                ],
            ],
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('id="myOffcanvas"', $html);
        $this->assertStringContainsString('class="offcanvas offcanvas-end w-50"', $html);
        $this->assertStringContainsString('data-bs-backdrop="false"', $html);
        $this->assertStringContainsString('aria-labelledby="myOffcanvasLabel"', $html);
        $this->assertStringContainsString('class="offcanvas-title" id="myOffcanvasLabel">Menu</h5>', $html);
        $this->assertStringContainsString('<p>Body info</p>', $html);
        $this->assertStringContainsString('<p>Child content</p>', $html);
    }

    public function testRenderAgnosticFallbackTag(): void
    {
        $node = [
            'type' => 'div',
            'props' => [
                'class' => 'container-fluid',
                'id' => 'main-div',
                'data-test' => 'yes',
                'content' => 'Div content'
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('<div class="container-fluid" id="main-div" data-test="yes">Div content</div>', $html);
    }

    public function testRenderAgnosticBooleanAttributes(): void
    {
        $node = [
            'type' => 'input',
            'props' => [
                'type' => 'checkbox',
                'checked' => true,
                'disabled' => false,
                'required' => true,
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('<input type="checkbox" checked required>', $html);
        $this->assertStringNotContainsString('disabled', $html);
    }

    public function testRenderAgnosticSelfClosingTags(): void
    {
        $node = [
            'type' => 'hr',
            'props' => [
                'class' => 'my-hr',
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertSame('<hr class="my-hr">', trim($html));
    }

    public function testRenderAgnosticRawHtmlFallback(): void
    {
        $node = [
            'type' => 'svg',
            'props' => [
                '_raw_html' => '<svg><circle cx="50" cy="50" r="40" /></svg>'
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertSame('<svg><circle cx="50" cy="50" r="40" /></svg>', $html);
    }

    public function testRenderAgnosticSkipsInternalProps(): void
    {
        $node = [
            'type' => 'span',
            'props' => [
                'class' => 'badge',
                '_internal' => 'skip-me',
                '_parent_id' => '123'
            ],
            'loop' => null,
            'children' => []
        ];

        $html = $this->renderer->renderNode($node);
        $this->assertStringContainsString('<span class="badge"></span>', $html);
        $this->assertStringNotContainsString('_internal', $html);
        $this->assertStringNotContainsString('_parent_id', $html);
    }
}

