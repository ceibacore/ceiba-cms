<?php
declare(strict_types=1);

namespace LemurCms\Auth;

use LemurCms\Auth\Contracts\AuthDriverInterface;

/**
 * AuthManager
 * 
 * Acts as a factory and facade for authentication drivers.
 * Allows switching between Session, JWT, or Custom drivers dynamically.
 */
class AuthManager
{
    /** @var array<string, AuthDriverInterface> */
    private array $drivers = [];
    private string $defaultDriver = 'session';

    public function __construct(AuthDriverInterface $defaultDriverInstance)
    {
        $this->extend('session', $defaultDriverInstance);
    }

    /**
     * Register a custom authentication driver.
     */
    public function extend(string $name, AuthDriverInterface $driver): void
    {
        $this->drivers[$name] = $driver;
    }

    /**
     * Set the default driver name.
     */
    public function setDefaultDriver(string $name): void
    {
        $this->defaultDriver = $name;
    }

    /**
     * Get a specific driver instance, or the default one.
     */
    public function driver(?string $name = null): AuthDriverInterface
    {
        $name = $name ?? $this->defaultDriver;
        
        if (!isset($this->drivers[$name])) {
            throw new \InvalidArgumentException("Auth driver [{$name}] is not defined.");
        }

        return $this->drivers[$name];
    }

    // --- Facade Methods (Proxy to default driver) ---

    public function check(): bool
    {
        return $this->driver()->check();
    }

    public function user(): ?array
    {
        return $this->driver()->user();
    }

    public function id(): ?string
    {
        return $this->driver()->id();
    }

    public function authenticate(array $credentials): bool
    {
        return $this->driver()->authenticate($credentials);
    }

    public function logout(): void
    {
        $this->driver()->logout();
    }
}
