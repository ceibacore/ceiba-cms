<?php
declare(strict_types=1);

namespace LemurCms\Tests\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;
use LemurCms\PageBuilder\Domain\Service\UiFrameworkRegistry;
use PHPUnit\Framework\TestCase;

class UiFrameworkRegistryTest extends TestCase
{
    // ── Helpers ───────────────────────────────────────────────────────────────

    private function makeModule(string $id, string $name = 'Test Module'): UiFrameworkModuleInterface
    {
        $mock = $this->createMock(UiFrameworkModuleInterface::class);
        $mock->method('getIdentifier')->willReturn($id);
        $mock->method('getName')->willReturn($name);
        $mock->method('getImportRules')->willReturn([]);
        $mock->method('getContainmentRules')->willReturn([]);
        $mock->method('getComponentDefinitions')->willReturn([]);
        $mock->method('getViewsDirectoryPath')->willReturn('/tmp');
        return $mock;
    }

    // ── Register ──────────────────────────────────────────────────────────────

    public function testRegisterStoresModuleByIdentifier(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));

        $this->assertArrayHasKey('bootstrap5', $registry->all());
    }

    public function testRegisterMultipleModules(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->register($this->makeModule('tailwind'));

        $this->assertCount(2, $registry->all());
    }

    public function testRegisterOverwritesSameIdentifier(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5', 'First'));
        $registry->register($this->makeModule('bootstrap5', 'Second'));

        $this->assertCount(1, $registry->all());
        $this->assertSame('Second', $registry->getActiveModule()->getName());
    }

    // ── setActive ─────────────────────────────────────────────────────────────

    public function testSetActiveThrowsForUnknownIdentifier(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/tailwind/');
        $registry->setActive('tailwind');
    }

    public function testSetActiveAllowsGetActiveModule(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->setActive('bootstrap5');

        $this->assertSame('bootstrap5', $registry->getActiveModule()->getIdentifier());
    }

    public function testSetActiveErrorMessageListsAvailableModules(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->register($this->makeModule('tailwind'));

        try {
            $registry->setActive('material_ui');
            $this->fail('Expected InvalidArgumentException');
        } catch (\InvalidArgumentException $e) {
            $this->assertStringContainsString('bootstrap5', $e->getMessage());
            $this->assertStringContainsString('tailwind', $e->getMessage());
        }
    }

    // ── getActiveModule ───────────────────────────────────────────────────────

    public function testGetActiveModuleThrowsWhenNoneConfigured(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->register($this->makeModule('tailwind'));

        $this->expectException(\RuntimeException::class);
        $registry->getActiveModule();
    }

    public function testGetActiveModuleAutoSelectsWhenOnlyOneRegistered(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));

        // No setActive() call — should auto-select
        $this->assertSame('bootstrap5', $registry->getActiveModule()->getIdentifier());
    }

    // ── hasActive ─────────────────────────────────────────────────────────────

    public function testHasActiveReturnsFalseWhenMultipleAndNoneSet(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->register($this->makeModule('tailwind'));

        $this->assertFalse($registry->hasActive());
    }

    public function testHasActiveReturnsTrueAfterSetActive(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));
        $registry->register($this->makeModule('tailwind'));
        $registry->setActive('tailwind');

        $this->assertTrue($registry->hasActive());
    }

    public function testHasActiveReturnsTrueWithSingleModule(): void
    {
        $registry = new UiFrameworkRegistry();
        $registry->register($this->makeModule('bootstrap5'));

        $this->assertTrue($registry->hasActive());
    }

    // ── all ───────────────────────────────────────────────────────────────────

    public function testAllReturnsEmptyArrayInitially(): void
    {
        $registry = new UiFrameworkRegistry();
        $this->assertSame([], $registry->all());
    }
}
