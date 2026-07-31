<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Domain\Service;

use LemurCms\PageBuilder\Domain\Contract\UiFrameworkModuleInterface;

/**
 * Central registry for UI framework modules.
 *
 * Modules are registered once (e.g. in bootstrap.php) and one is set as
 * the active framework for rendering and HTML import operations.
 *
 * Usage:
 *   $registry = new UiFrameworkRegistry();
 *   $registry->register(new Bootstrap5Module());
 *   $registry->setActive('bootstrap5');
 *
 *   $rules = $registry->getActiveModule()->getImportRules();
 */
final class UiFrameworkRegistry
{
    /** @var array<string, UiFrameworkModuleInterface> */
    private array $modules = [];

    private ?string $activeIdentifier = null;

    public function register(UiFrameworkModuleInterface $module): void
    {
        $this->modules[$module->getIdentifier()] = $module;
    }

    public function setActive(string $identifier): void
    {
        if (!isset($this->modules[$identifier])) {
            throw new \InvalidArgumentException(
                "UI framework module '{$identifier}' is not registered. " .
                "Available: " . implode(', ', array_keys($this->modules))
            );
        }
        $this->activeIdentifier = $identifier;
    }

    public function getActiveModule(): UiFrameworkModuleInterface
    {
        if ($this->activeIdentifier === null) {
            // Auto-select if exactly one module is registered
            if (count($this->modules) === 1) {
                $this->activeIdentifier = array_key_first($this->modules);
            } else {
                throw new \RuntimeException(
                    'No active UI framework module configured. Call setActive() first.'
                );
            }
        }

        return $this->modules[$this->activeIdentifier];
    }

    public function hasActive(): bool
    {
        return $this->activeIdentifier !== null || count($this->modules) === 1;
    }

    /**
     * @return array<string, UiFrameworkModuleInterface>
     */
    public function all(): array
    {
        return $this->modules;
    }
}
