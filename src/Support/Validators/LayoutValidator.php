<?php
declare(strict_types=1);

namespace LemurCms\Support\Validators;

use LemurCms\Support\Exceptions\InvalidMenuException;

class LayoutValidator
{
    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validate(array $data): void
    {
        // name is required
        if (empty($data['name'] ?? null) || !is_string($data['name'])) {
            throw new InvalidMenuException('Layout name is required and must be a string');
        }

        if (strlen($data['name']) > 200) {
            throw new InvalidMenuException('Layout name must not exceed 200 characters');
        }

        // menu_slug: optional, max length
        if (isset($data['menu_slug']) && $data['menu_slug'] !== null) {
            if (!is_string($data['menu_slug'])) {
                throw new InvalidMenuException('Layout menu_slug must be a string');
            }
            if (strlen($data['menu_slug']) > 300) {
                throw new InvalidMenuException('Layout menu_slug must not exceed 300 characters');
            }
        }

        // palette: optional, must be valid JSON or array
        if (isset($data['palette']) && $data['palette'] !== null) {
            if (is_string($data['palette'])) {
                $decoded = json_decode($data['palette'], true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new InvalidMenuException('Layout palette is malformed JSON');
                }
                if (!is_array($decoded)) {
                    throw new InvalidMenuException('Layout palette must decode to an array');
                }
            } elseif (!is_array($data['palette'])) {
                throw new InvalidMenuException('Layout palette must be an array or JSON string');
            }
        }

        // footer_tree: optional, validate structure if provided
        if (isset($data['footer_tree']) && $data['footer_tree'] !== null) {
            $tree = $data['footer_tree'];
            if (is_string($tree)) {
                $decoded = json_decode($tree, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new InvalidMenuException('Layout footer_tree is malformed JSON');
                }
                $tree = $decoded;
            }
            if (!is_array($tree)) {
                throw new InvalidMenuException('Layout footer_tree must be an array or JSON string');
            }
            $validator = new \LemurCms\PageBuilder\Domain\Service\TreeValidator();
            $errors = $validator->validate($tree);
            if (!empty($errors)) {
                throw new InvalidMenuException('Invalid layout footer_tree: ' . implode('; ', $errors));
            }
        }
    }
}
