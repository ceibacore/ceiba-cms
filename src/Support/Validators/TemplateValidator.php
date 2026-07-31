<?php

declare(strict_types=1);

namespace LemurCms\Support\Validators;

use LemurCms\Support\Exceptions\InvalidMenuException;

class TemplateValidator
{
    /**
     * @param array<string, mixed> $data
     * @throws InvalidMenuException
     */
    public static function validateTemplate(array $data): void
    {
        // Name is required
        if (empty($data['name'] ?? null) || !is_string($data['name'])) {
            throw new InvalidMenuException('Template name is required and must be a string');
        }

        // Name max length
        if (strlen($data['name']) > 200) {
            throw new InvalidMenuException('Template name must not exceed 200 characters');
        }

        // Tree is required
        if (!isset($data['tree'])) {
            throw new InvalidMenuException('Template tree is required');
        }

        $tree = $data['tree'];
        if (is_array($tree)) {
            $validator = new \LemurCms\PageBuilder\Domain\Service\TreeValidator();
            $errors = $validator->validate($tree);
            if (!empty($errors)) {
                throw new InvalidMenuException('Invalid template tree: ' . implode('; ', $errors));
            }
        } elseif (is_string($tree)) {
            $trimmed = trim($tree);
            $looksLikeJson = ($trimmed !== '' && ($trimmed[0] === '[' || $trimmed[0] === '{'));
            if ($looksLikeJson) {
                $decoded = json_decode($tree, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new InvalidMenuException('Template tree is malformed JSON');
                }
                if (!is_array($decoded)) {
                    throw new InvalidMenuException('Template tree JSON must be an array or object');
                }
                $validator = new \LemurCms\PageBuilder\Domain\Service\TreeValidator();
                $errors = $validator->validate($decoded);
                if (!empty($errors)) {
                    throw new InvalidMenuException('Invalid template tree: ' . implode('; ', $errors));
                }
            }
        } else {
            throw new InvalidMenuException('Template tree must be a string or array');
        }
    }
}
