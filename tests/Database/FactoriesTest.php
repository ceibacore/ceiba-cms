<?php

declare(strict_types=1);

namespace LemurCms\Tests\Database;

use LemurCms\Database\Factories\MenuFactory;
use LemurCms\Database\Factories\PageFactory;
use LemurCms\Database\Factories\UserFactory;
use PHPUnit\Framework\TestCase;

class FactoriesTest extends TestCase
{
    public function testMenuFactoryGeneratesSingleMenu(): void
    {
        $factory = new MenuFactory();
        $menus = $factory->make(1);

        $this->assertCount(1, $menus);
        $this->assertArrayHasKey('name', $menus[0]);
        $this->assertArrayHasKey('slug', $menus[0]);
        $this->assertArrayHasKey('type', $menus[0]);
    }

    public function testMenuFactoryGeneratesMultiple(): void
    {
        $factory = new MenuFactory();
        $menus = $factory->make(5);

        $this->assertCount(5, $menus);
    }

    public function testMenuFactoryHasValidType(): void
    {
        $factory = new MenuFactory();
        $menus = $factory->make(1);
        $valid = ['main', 'footer', 'sidebar', 'mobile'];

        $this->assertContains($menus[0]['type'], $valid);
    }

    public function testPageFactoryGeneratesSinglePage(): void
    {
        $factory = new PageFactory();
        $pages = $factory->make(1);

        $this->assertCount(1, $pages);
        $this->assertArrayHasKey('title', $pages[0]);
        $this->assertArrayHasKey('slug', $pages[0]);
        $this->assertArrayHasKey('content', $pages[0]);
        $this->assertArrayHasKey('status', $pages[0]);
    }

    public function testPageFactoryHasValidStatus(): void
    {
        $factory = new PageFactory();
        $pages = $factory->make(3);
        $valid = ['draft', 'published', 'archived'];

        foreach ($pages as $page) {
            $this->assertContains($page['status'], $valid);
        }
    }

    public function testUserFactoryGeneratesSingleUser(): void
    {
        $factory = new UserFactory();
        $users = $factory->make(1);

        $this->assertCount(1, $users);
        $this->assertArrayHasKey('name', $users[0]);
        $this->assertArrayHasKey('email', $users[0]);
        $this->assertArrayHasKey('password_hash', $users[0]);
    }

    public function testUserFactoryGeneratesUniqueEmails(): void
    {
        $factory = new UserFactory();
        $users = $factory->make(5);
        $emails = array_map(fn($u) => $u['email'], $users);

        $this->assertCount(5, array_unique($emails));
    }

    public function testUserFactoryHasHashedPassword(): void
    {
        $factory = new UserFactory();
        $users = $factory->make(1);

        $this->assertTrue(password_verify('Password123', $users[0]['password_hash']));
    }

    public function testFactoriesGenerateArrayStructure(): void
    {
        $menuFactory = new MenuFactory();
        $pageFactory = new PageFactory();
        $userFactory = new UserFactory();

        $menus = $menuFactory->make(1);
        $pages = $pageFactory->make(1);
        $users = $userFactory->make(1);

        $this->assertIsArray($menus);
        $this->assertIsArray($pages);
        $this->assertIsArray($users);
    }
}
