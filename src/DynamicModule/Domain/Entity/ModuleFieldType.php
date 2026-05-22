<?php
declare(strict_types=1);

namespace LemurCms\DynamicModule\Domain\Entity;

final class ModuleFieldType
{
    public const TEXT = 'text';
    public const TEXTAREA = 'textarea';
    public const RICHTEXT = 'richtext';
    public const NUMBER = 'number';
    public const DECIMAL = 'decimal';
    public const BOOLEAN = 'boolean';
    public const DATE = 'date';
    public const DATETIME = 'datetime';
    public const SELECT = 'select';
    public const IMAGE = 'image';
    public const RELATION = 'relation';

    private const ALLOWED = [
        self::TEXT,
        self::TEXTAREA,
        self::RICHTEXT,
        self::NUMBER,
        self::DECIMAL,
        self::BOOLEAN,
        self::DATE,
        self::DATETIME,
        self::SELECT,
        self::IMAGE,
        self::RELATION,
    ];

    public static function isValid(string $type): bool
    {
        return in_array($type, self::ALLOWED, true);
    }

    public static function getAllowedTypes(): array
    {
        return self::ALLOWED;
    }
}
