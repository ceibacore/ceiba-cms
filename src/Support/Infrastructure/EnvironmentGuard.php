<?php

declare(strict_types=1);

namespace LemurCms\Support\Infrastructure;

class EnvironmentGuard
{
    private static array $requiredVars = [
        'DB_HOST',
        'DB_PORT',
        'DB_NAME',
        'DB_USER',
        'DB_PASS',
        'DB_PREFIX',
    ];

    /**
     * Valida y carga variables de entorno
     */
    public static function check(): void
    {
        // Si ya hay configuración de BD seteada en el entorno (estilo CMS o estilo Laravel),
        // evitamos cargar el archivo .env para no sobreescribirla con valores locales obsoletos.
        $hasCmsConfig = (isset($_ENV['DB_HOST']) || getenv('DB_HOST')) &&
            (isset($_ENV['DB_PORT']) || getenv('DB_PORT')) &&
            ((isset($_ENV['DB_NAME']) || getenv('DB_NAME')) || (isset($_ENV['DB_DATABASE']) || getenv('DB_DATABASE')));

        if (!$hasCmsConfig) {
            try {
                self::loadFromEnvFile();
            } catch (\RuntimeException $e) {
                // Silently continue to throw missing vars error if loading fails
            }
        }

        $missing = [];
        foreach (self::$requiredVars as $var) {
            if (!isset($_ENV[$var]) && !getenv($var)) {
                $missing[] = $var;
            }
        }

        // Si faltan las específicas del CMS, pero tenemos las de Laravel, está bien
        $hasLaravelDb = (isset($_ENV['DB_DATABASE']) || getenv('DB_DATABASE')) &&
            (isset($_ENV['DB_USERNAME']) || getenv('DB_USERNAME'));

        if (!empty($missing) && $hasLaravelDb) {
            $missing = array_diff($missing, ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_PREFIX']);
        }

        if (!empty($missing)) {
            throw new \RuntimeException(
                "Lemur CMS is missing required environment variables: " . 
                implode(', ', $missing) . "\n" .
                "Check your .env file or set them manually."
            );
        }
    }

    /**
     * Carga variables desde .env
     */
    private static function loadFromEnvFile(): void
    {
        $startDir = dirname(__DIR__, 3); 
        $envFile = self::findEnvFileRecursive($startDir, 0);
        
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) return;

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || str_starts_with($line, '#')) continue;
            if (strpos($line, '=') === false) continue;

            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);

            // Remove quotes if present
            if ((str_starts_with($value, '"') && str_ends_with($value, '"')) ||
                (str_starts_with($value, "'") && str_ends_with($value, "'"))) {
                $value = substr($value, 1, -1);
            }

            if (!isset($_ENV[$key]) && getenv($key) === false) {
                $_ENV[$key] = $value;
                putenv("{$key}={$value}");
            }
        }
    }

    /**
     * Busca .env recursivamente
     */
    private static function findEnvFileRecursive(string $currentDir, int $depth): string
    {
        $envPath = $currentDir . DIRECTORY_SEPARATOR . '.env';

        if (file_exists($envPath)) {
            return $envPath;
        }

        if ($depth >= 4) {
            throw new \RuntimeException("Could not find .env file within 4 levels.");
        }

        $parentDir = dirname($currentDir);
        if ($parentDir === $currentDir) {
            throw new \RuntimeException("Reached filesystem root.");
        }

        return self::findEnvFileRecursive($parentDir, $depth + 1);
    }

    /**
     * Obtiene valor de variable de entorno
     */
    public static function get(string $key, $default = null)
    {
        $val = $_ENV[$key] ?? getenv($key);
        return ($val !== false && $val !== null) ? $val : $default;
    }
}
