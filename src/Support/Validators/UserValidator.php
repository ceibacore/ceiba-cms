<?php

declare(strict_types=1);

namespace LemurCms\Support\Validators;

use LemurCms\Support\Exceptions\InvalidUserException;

class UserValidator
{
    private const MIN_PASSWORD_LENGTH = 8;

    /**
     * @param array<string, mixed> $data
     * @throws InvalidUserException
     */
    public static function validateUser(array $data): void
    {
        // Email es requerido
        if (empty($data['email'] ?? null) || !is_string($data['email'])) {
            throw InvalidUserException::missingEmail();
        }

        // Email debe tener formato válido
        if (!self::isValidEmail($data['email'])) {
            throw InvalidUserException::invalidEmail($data['email']);
        }

        // Name es requerido
        if (empty($data['name'] ?? null) || !is_string($data['name'])) {
            throw new InvalidUserException('User name is required and must be a string');
        }
    }

    /**
     * @param array<string, mixed> $data
     * @throws InvalidUserException
     */
    public static function validatePassword(array $data): void
    {
        if (empty($data['password'] ?? null) || !is_string($data['password'])) {
            throw InvalidUserException::missingPassword();
        }

        if (!self::isStrongPassword($data['password'])) {
            throw InvalidUserException::weakPassword();
        }
    }

    /**
     * @param array<string, mixed> $data
     * @throws InvalidUserException
     */
    public static function validateCreateUser(array $data): void
    {
        self::validateUser($data);
        self::validatePassword($data);
    }

    /**
     * Validar cambio de contraseña
     *
     * @param array<string, mixed> $data
     * @throws InvalidUserException
     */
    public static function validatePasswordChange(array $data): void
    {
        if (empty($data['new_password'] ?? null)) {
            throw new InvalidUserException('New password is required');
        }

        if (!self::isStrongPassword($data['new_password'])) {
            throw InvalidUserException::weakPassword();
        }
    }

    /**
     * Validar email con RFC 5322
     */
    private static function isValidEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validar contraseña fuerte:
     * - Mínimo 8 caracteres
     * - Al menos una mayúscula
     * - Al menos una minúscula
     * - Al menos un número
     */
    private static function isStrongPassword(string $password): bool
    {
        if (strlen($password) < self::MIN_PASSWORD_LENGTH) {
            return false;
        }

        $hasUpper = preg_match('/[A-Z]/', $password);
        $hasLower = preg_match('/[a-z]/', $password);
        $hasDigit = preg_match('/[0-9]/', $password);

        return $hasUpper && $hasLower && $hasDigit;
    }
}
