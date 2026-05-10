<?php

declare(strict_types=1);

namespace LemurCms\Tests\Http;

use LemurCms\Http\Router;
use PHPUnit\Framework\TestCase;

class RouterTest extends TestCase
{
    private Router $router;

    protected function setUp(): void
    {
        $this->router = new Router();
    }

    public function testRouterRegistersGetRoute(): void
    {
        $called = false;
        $this->router->get('/test', function () use (&$called) {
            $called = true;
        });

        $this->router->dispatch('GET', '/test');
        $this->assertTrue($called);
    }

    public function testRouterRegistersPostRoute(): void
    {
        $called = false;
        $this->router->post('/test', function () use (&$called) {
            $called = true;
        });

        $this->router->dispatch('POST', '/test');
        $this->assertTrue($called);
    }

    public function testRouterMatchesPathParameter(): void
    {
        $id = null;
        $this->router->get('/items/{id}', function ($itemId) use (&$id) {
            $id = $itemId;
        });

        $this->router->dispatch('GET', '/items/123');
        $this->assertEquals('123', $id);
    }

    public function testRouterReturns404ForNotFound(): void
    {
        ob_start();
        $this->router->dispatch('GET', '/nonexistent');
        $output = ob_get_clean();

        $this->assertStringContainsString('Not Found', $output);
    }

    public function testRouterRegistersNamedRoute(): void
    {
        $this->router->get('/users/{id}', fn() => null, 'user.show');
        $url = $this->router->url('user.show', ['id' => '42']);

        $this->assertEquals('/users/42', $url);
    }

    public function testRouterMultipleRoutes(): void
    {
        $results = [];

        $this->router->get('/first', function () use (&$results) {
            $results[] = 'first';
        });

        $this->router->get('/second', function () use (&$results) {
            $results[] = 'second';
        });

        $this->router->dispatch('GET', '/first');
        $this->router->dispatch('GET', '/second');

        $this->assertContains('first', $results);
        $this->assertContains('second', $results);
    }
}
