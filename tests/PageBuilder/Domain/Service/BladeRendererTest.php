<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Service\BladeRenderer;
use LemurCms\PageBuilder\Domain\Service\LoopResolverInterface;
use LemurCms\PageBuilder\Domain\Service\VariableInterpolator;
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
        $this->renderer = new BladeRenderer($this->mockLoopResolver, $interpolator);
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
}
