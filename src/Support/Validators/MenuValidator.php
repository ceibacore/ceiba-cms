<?php

declare(strict_types=1);

namespace LemurCms\Support\Validators;

use LemurCms\Support\Exceptions\InvalidMenuException;

class MenuValidator
{
    private const VALID_TYPES = ['link', 'dropdown', 'mega', 'button', 'divider'];

    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateMenuItem(array $data): void
    {
        // Label es requerido
        if (empty($data['label'] ?? null) || !is_string($data['label'])) {
            throw InvalidMenuException::missingLabel();
        }

        // URL es requerido para tipo 'link'
        $type = $data['type'] ?? 'link';
        if ($type === 'link' && (empty($data['url'] ?? null) || !is_string($data['url']))) {
            throw InvalidMenuException::missingUrl();
        }

        // Validar tipo
        if (!in_array($type, self::VALID_TYPES, true)) {
            throw InvalidMenuException::invalidType($type);
        }

        // URL debe ser string si está presente
        if (isset($data['url']) && !is_string($data['url'])) {
            throw new InvalidMenuException('Menu item URL must be a string');
        }

        // Target debe ser válido si está presente
        if (isset($data['target']) && !in_array($data['target'], ['_self', '_blank', '_parent', '_top'], true)) {
            throw new InvalidMenuException('Menu item target must be _self, _blank, _parent, or _top');
        }
    }

    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateMenu(array $data): void
    {
        if (empty($data['slug'] ?? null) || !is_string($data['slug'])) {
            throw InvalidMenuException::missingMenuSlug();
        }

        if (empty($data['name'] ?? null) || !is_string($data['name'])) {
            throw InvalidMenuException::missingMenuName();
        }

        // Slug debe ser alfanumérico con guiones y guiones bajos
        if (!preg_match('/^[a-z0-9_-]+$/i', $data['slug'])) {
            throw new InvalidMenuException('Menu slug must contain only alphanumeric characters, hyphens, and underscores');
        }
    }

    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateBanner(array $data): void
    {
        if (empty($data['image_url'] ?? null)) {
            throw new InvalidMenuException('Banner image URL is required');
        }

        if (isset($data['position']) && !in_array($data['position'], ['top', 'bottom', 'sidebar'], true)) {
            throw new InvalidMenuException('Banner position must be top, bottom, or sidebar');
        }
    }

    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateLogo(array $data): void
    {
        if (empty($data['image_url'] ?? null)) {
            throw new InvalidMenuException('Logo image URL is required');
        }

        if (isset($data['alt_text']) && !is_string($data['alt_text'])) {
            throw new InvalidMenuException('Logo alt text must be a string');
        }
    }
}
