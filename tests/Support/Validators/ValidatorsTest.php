<?php

declare(strict_types=1);

namespace LemurCms\Tests\Support\Validators;

use LemurCms\Support\Validators\MenuValidator;
use LemurCms\Support\Validators\PageValidator;
use LemurCms\Support\Validators\UserValidator;
use LemurCms\Support\Exceptions\InvalidMenuException;
use PHPUnit\Framework\TestCase;

class ValidatorsTest extends TestCase
{
    // ── MenuValidator ────────────────────────────────────────────────────────

    public function testMenuValidatorRequiresLabel(): void
    {
        $this->expectException(InvalidMenuException::class);
        MenuValidator::validateMenuItem(['url' => '/']);
    }

    public function testMenuValidatorRequiresUrl(): void
    {
        $this->expectException(InvalidMenuException::class);
        MenuValidator::validateMenuItem(['label' => 'Home', 'type' => 'link']);
    }

    public function testMenuValidatorAcceptsValidItem(): void
    {
        $this->expectNotToThrow();
        MenuValidator::validateMenuItem(['label' => 'Home', 'url' => '/', 'type' => 'link']);
    }

    public function testMenuValidatorValidatesSlug(): void
    {
        $this->expectException(InvalidMenuException::class);
        MenuValidator::validateMenu(['name' => 'Main', 'slug' => 'Main-Menu!']);
    }

    public function testMenuValidatorAcceptsValidMenu(): void
    {
        $this->expectNotToThrow();
        MenuValidator::validateMenu(['name' => 'Main', 'slug' => 'main-menu']);
    }

    public function testMenuValidatorValidatesBanner(): void
    {
        $this->expectException(InvalidMenuException::class);
        MenuValidator::validateBanner(['position' => 'invalid']);
    }

    public function testMenuValidatorAcceptsValidBanner(): void
    {
        $this->expectNotToThrow();
        MenuValidator::validateBanner(['image_url' => 'https://example.com/img.png', 'position' => 'top']);
    }

    // ── PageValidator ────────────────────────────────────────────────────────

    public function testPageValidatorRequiresTitle(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage(['content' => 'Hello']);
    }

    public function testPageValidatorRequiresContent(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage(['title' => 'About', 'slug' => 'about']);
    }

    public function testPageValidatorValidatesSlug(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage(['title' => 'About', 'slug' => 'about!page', 'content' => 'Hello']);
    }

    public function testPageValidatorAcceptsValidPage(): void
    {
        $this->expectNotToThrow();
        PageValidator::validatePage(['title' => 'About', 'slug' => 'about', 'content' => 'Hello', 'status' => 'draft']);
    }

    public function testPageValidatorValidatesStatus(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage(['title' => 'About', 'slug' => 'about', 'content' => 'Hello', 'status' => 'invalid']);
    }

    public function testPageValidatorRejectsMalformedJson(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage([
            'title' => 'About',
            'slug' => 'about',
            'content' => '[{"id":',
            'status' => 'draft'
        ]);
    }

    public function testPageValidatorRejectsMalformedTree(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validatePage([
            'title' => 'About',
            'slug' => 'about',
            'content' => '[{"id": "n1", "type": "invalid-type"}]',
            'status' => 'draft'
        ]);
    }

    public function testPageValidatorAcceptsValidJsonTree(): void
    {
        $this->expectNotToThrow();
        PageValidator::validatePage([
            'title' => 'About',
            'slug' => 'about',
            'content' => '[{"id": "n1", "type": "div", "name": "container"}]',
            'status' => 'draft'
        ]);
    }

    public function testPageValidatorValidatesForPublish(): void
    {
        $this->expectException(InvalidMenuException::class);
        PageValidator::validateForPublish(['title' => '', 'content' => 'Hello']);
    }

    // ── UserValidator ────────────────────────────────────────────────────────

    public function testUserValidatorRequiresEmail(): void
    {
        $this->expectException(\Exception::class);
        UserValidator::validateUser(['name' => 'John']);
    }

    public function testUserValidatorValidatesEmail(): void
    {
        $this->expectException(\Exception::class);
        UserValidator::validateUser(['email' => 'invalid-email', 'name' => 'John']);
    }

    public function testUserValidatorAcceptsValidEmail(): void
    {
        $this->expectNotToThrow();
        UserValidator::validateUser(['email' => 'john@example.com', 'name' => 'John']);
    }

    public function testUserValidatorValidatesPassword(): void
    {
        $this->expectException(\Exception::class);
        UserValidator::validatePassword(['password' => 'weak']);
    }

    public function testUserValidatorAcceptsStrongPassword(): void
    {
        $this->expectNotToThrow();
        UserValidator::validatePassword(['password' => 'Strong123']);
    }

    public function testUserValidatorValidatesCreateUser(): void
    {
        $this->expectException(\Exception::class);
        UserValidator::validateCreateUser(['email' => 'john@example.com', 'name' => 'John', 'password' => 'weak']);
    }

    public function testUserValidatorAcceptsValidCreateUser(): void
    {
        $this->expectNotToThrow();
        UserValidator::validateCreateUser(['email' => 'john@example.com', 'name' => 'John', 'password' => 'Strong123']);
    }

    // Helper method
    private function expectNotToThrow(): void
    {
        $this->assertTrue(true);
    }
}
