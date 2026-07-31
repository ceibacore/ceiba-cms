<?php
declare(strict_types=1);

namespace LemurCms\Auth\Contracts;

/**
 * Interface AuthDriverInterface
 * 
 * Defines the standard methods any authentication adapter must implement.
 */
interface AuthDriverInterface
{
    /**
     * Attempt to authenticate a user using credentials (e.g. email/password).
     */
    public function authenticate(array $credentials): bool;

    /**
     * Check if a user is currently authenticated.
     */
    public function check(): bool;

    /**
     * Get the ID of the currently authenticated user.
     * Returns null if not authenticated.
     */
    public function id(): ?string;

    /**
     * Get the current authenticated user's data (e.g. from the `access` table).
     * Returns null if not authenticated.
     */
    public function user(): ?array;

    /**
     * Log the user out of the current driver.
     */
    public function logout(): void;
}
