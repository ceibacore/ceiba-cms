<?php

declare(strict_types=1);

namespace LemurCms\Support\Validators;

use LemurCms\Support\Exceptions\InvalidMenuException;

class PageValidator
{
    private const VALID_STATUSES = ['draft', 'published', 'archived'];

    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validatePage(array $data): void
    {
        // Title es requerido
        if (empty($data['title'] ?? null) || !is_string($data['title'])) {
            throw new InvalidMenuException('Page title is required and must be a string');
        }

        // Title máximo 255 caracteres
        if (strlen($data['title']) > 255) {
            throw new InvalidMenuException('Page title must not exceed 255 characters');
        }

        // Slug es requerido
        if (empty($data['slug'] ?? null) || !is_string($data['slug'])) {
            throw new InvalidMenuException('Page slug is required and must be a string');
        }

        // Slug debe ser alfanumérico con guiones
        if (!preg_match('/^[a-z0-9-]+$/i', $data['slug'])) {
            throw new InvalidMenuException('Page slug must contain only alphanumeric characters and hyphens');
        }

        // Content es requerido
        if (!isset($data['content'])) {
            throw new InvalidMenuException('Page content is required');
        }

        $content = $data['content'];
        if (is_array($content)) {
            $validator = new \LemurCms\PageBuilder\Domain\Service\TreeValidator();
            $errors = $validator->validate($content);
            if (!empty($errors)) {
                throw new InvalidMenuException('Invalid page tree: ' . implode('; ', $errors));
            }
        } elseif (is_string($content)) {
            $trimmed = trim($content);
            $looksLikeJson = ($trimmed !== '' && ($trimmed[0] === '[' || $trimmed[0] === '{'));
            if ($looksLikeJson) {
                $decoded = json_decode($content, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new InvalidMenuException('Page content is malformed JSON');
                }
                if (!is_array($decoded)) {
                    throw new InvalidMenuException('Page content JSON must be an array or object');
                }
                $validator = new \LemurCms\PageBuilder\Domain\Service\TreeValidator();
                $errors = $validator->validate($decoded);
                if (!empty($errors)) {
                    throw new InvalidMenuException('Invalid page tree: ' . implode('; ', $errors));
                }
            }
        } else {
            throw new InvalidMenuException('Page content must be a string or array');
        }

        // Status debe ser válido si está presente
        $status = $data['status'] ?? 'draft';
        if (!in_array($status, self::VALID_STATUSES, true)) {
            throw new InvalidMenuException(sprintf('Invalid page status "%s". Valid: %s', $status, implode(', ', self::VALID_STATUSES)));
        }
    }

    /**
     * Validar que los campos requeridos para publicación están presentes
     *
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateForPublish(array $data): void
    {
        if (empty($data['title'] ?? null)) {
            throw new InvalidMenuException('Page must have a title to be published');
        }

        if (empty($data['content'] ?? null)) {
            throw new InvalidMenuException('Page must have content to be published');
        }
    }
}
