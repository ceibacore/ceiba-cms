<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Domain;

/**
 * Where a site part applies (plan 06 D-4): targets in `include` (any of them) minus targets in `exclude` (exclusion
 * wins), narrowed by `locales` and `session`, ranked by `priority`. The vocabulary is closed: anything unknown is
 * refused, never ignored. Visibility by session is presentation only, never access control.
 *
 *   {"include": [{"type": "site"}], "exclude": [{"type": "pages", "ids": ["…"]}],
 *    "locales": ["es"], "session": "any|with|without", "priority": 0}
 */
final class SitePartRules
{
    public const TARGETS = ['site', 'home', 'pages', 'path_prefix', 'layouts', 'routes', 'sources'];
    /** Targets that only make sense when a page is drawn (not for the 404 part). */
    private const PAGE_TARGETS = ['home', 'pages', 'layouts'];
    private const MAX_TARGETS = 20;
    private const MAX_IDS = 200;
    private const ID = '/^[A-Za-z0-9-]{1,36}$/';
    private const ROUTE = '/^[A-Za-z0-9._-]{1,100}$/';
    /** A data source id (plan 07-D): its records, archive or search. */
    private const SOURCE = '/^(module|host):[a-z0-9][a-z0-9_.-]{0,80}$/';
    private const PREFIX = '~^/[A-Za-z0-9/_.-]{0,200}$~';
    private const LOCALE = '/^[a-z]{2}(-[A-Z]{2})?$/';

    /** @param list<array<string, mixed>> $include @param list<array<string, mixed>> $exclude @param list<string> $locales */
    private function __construct(
        public readonly array $include,
        public readonly array $exclude,
        public readonly array $locales,
        public readonly string $session,
        public readonly int $priority,
    ) {}

    public static function default(): self
    {
        return new self([['type' => 'site']], [], [], 'any', 0);
    }

    /**
     * @param mixed $rules decoded JSON
     * @param list<string> $routes route names the host registered as conditions
     * @throws InvalidRules
     */
    public static function from(mixed $rules, string $kind, array $routes = []): self
    {
        if (!is_array($rules) || array_is_list($rules) && $rules !== []
            || array_diff(array_keys($rules), ['include', 'exclude', 'locales', 'session', 'priority']) !== []) {
            throw new InvalidRules('', 'SHAPE');
        }
        $include = self::targets($rules['include'] ?? null, 'include', $kind, $routes);
        if ($include === []) {
            throw new InvalidRules('include', 'REQUIRED');
        }
        $locales = $rules['locales'] ?? [];
        if (!is_array($locales) || !array_is_list($locales) || count($locales) > 20) {
            throw new InvalidRules('locales', 'SHAPE');
        }
        foreach ($locales as $i => $locale) {
            if (!is_string($locale) || !preg_match(self::LOCALE, $locale)) {
                throw new InvalidRules("locales.{$i}", 'INVALID_VALUE');
            }
        }
        $session = $rules['session'] ?? 'any';
        if (!in_array($session, ['any', 'with', 'without'], true)) {
            throw new InvalidRules('session', 'INVALID_VALUE');
        }
        $priority = $rules['priority'] ?? 0;
        if (!is_int($priority) || $priority < -100 || $priority > 100) {
            throw new InvalidRules('priority', 'INVALID_VALUE');
        }
        return new self($include, self::targets($rules['exclude'] ?? [], 'exclude', $kind, $routes), array_values(array_unique($locales)), $session, $priority);
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return ['include' => $this->include, 'exclude' => $this->exclude, 'locales' => $this->locales,
            'session' => $this->session, 'priority' => $this->priority];
    }

    /** @param list<string> $routes @return list<array<string, mixed>> */
    private static function targets(mixed $list, string $path, string $kind, array $routes): array
    {
        if (!is_array($list) || !array_is_list($list) || count($list) > self::MAX_TARGETS) {
            throw new InvalidRules($path, 'SHAPE');
        }
        $out = [];
        foreach ($list as $i => $target) {
            $at = "{$path}.{$i}";
            $type = is_array($target) ? ($target['type'] ?? null) : null;
            if (!in_array($type, self::TARGETS, true)) {
                throw new InvalidRules($at, 'UNKNOWN_TARGET');
            }
            if ($kind === SitePartKind::NOT_FOUND && in_array($type, self::PAGE_TARGETS, true)) {
                throw new InvalidRules($at, 'NOT_FOR_404');
            }
            $out[] = self::target($type, $target, $at, $routes);
        }
        return $out;
    }

    /** @param array<string, mixed> $target @param list<string> $routes @return array<string, mixed> */
    private static function target(string $type, array $target, string $at, array $routes): array
    {
        $keys = match ($type) {
            'site', 'home' => [], 'pages', 'layouts', 'sources' => ['ids'], 'path_prefix' => ['value'], 'routes' => ['names'],
        };
        if (array_diff(array_keys($target), ['type', ...$keys]) !== [] || array_diff($keys, array_keys($target)) !== []) {
            throw new InvalidRules($at, 'SHAPE');
        }
        if ($type === 'path_prefix') {
            if (!is_string($target['value']) || !preg_match(self::PREFIX, $target['value']) || str_contains($target['value'], '..')) {
                throw new InvalidRules("{$at}.value", 'INVALID_VALUE');
            }
            return ['type' => $type, 'value' => '/' . trim($target['value'], '/')];
        }
        if ($keys === []) {
            return ['type' => $type];
        }
        $key = $keys[0];
        $values = $target[$key];
        if (!is_array($values) || !array_is_list($values) || $values === [] || count($values) > self::MAX_IDS) {
            throw new InvalidRules("{$at}.{$key}", 'SHAPE');
        }
        foreach ($values as $j => $value) {
            $valid = is_string($value) && preg_match(match ($type) { 'routes' => self::ROUTE, 'sources' => self::SOURCE, default => self::ID }, $value) === 1;
            if (!$valid || ($type === 'routes' && !in_array($value, $routes, true))) {
                throw new InvalidRules("{$at}.{$key}.{$j}", $valid ? 'UNKNOWN_ROUTE' : 'INVALID_VALUE');
            }
        }
        return ['type' => $type, $key => array_values(array_unique($values))];
    }
}
