<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Application;

use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\Routing\Domain\Service\ReservedPathChecker;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;

/**
 * Public URLs of data sources (plan 07, D-7), opt-in per site in the setting `content_routes`:
 *
 *   {"module:cursos": {"prefix": "cursos", "search": true}}  →  /cursos (archive), /cursos/<slug> (record)
 *
 * and the site search at `/<search_path>` (default "buscar") over the sources marked `search`. Prefixes are unique
 * and never a reserved path of the host. Read when a request is drawn, never at bootstrap.
 */
final class ContentRoutes
{
    public const SETTING = 'content_routes';
    public const SEARCH_SETTING = 'content_search_path';
    private const PREFIX = '/^[a-z0-9][a-z0-9-]{0,60}$/';

    /** @var array<string, array{prefix: string, search: bool}>|null */
    private ?array $routes = null;

    public function __construct(private readonly SettingsRepositoryInterface $settings, private readonly ?ReservedPathChecker $reserved = null) {}

    /** @return array<string, array{prefix: string, search: bool}> source id => route */
    public function all(): array
    {
        if ($this->routes !== null) {
            return $this->routes;
        }
        $raw = json_decode((string) ($this->settings->get(self::SETTING, '{}') ?? '{}'), true);
        try {
            return $this->routes = self::normalise(is_array($raw) ? $raw : [], $this->reserved);
        } catch (InvalidDataQuery) {
            return $this->routes = []; // a broken setting publishes nothing rather than wrong URLs
        }
    }

    public function searchPath(): string
    {
        $path = trim((string) ($this->settings->get(self::SEARCH_SETTING, 'buscar') ?? 'buscar'), '/');

        return preg_match(self::PREFIX, $path) ? $path : 'buscar';
    }

    /**
     * What a public path is: a record, the archive of a source, the site search, or null (not content).
     *
     * @return array{content: 'record'|'archive'|'search', source: ?string, slug: ?string}|null
     */
    public function match(string $path): ?array
    {
        $segments = array_values(array_filter(explode('/', trim($path, '/')), 'strlen'));
        if (count($segments) === 1 && $segments[0] === $this->searchPath()) {
            return ['content' => 'search', 'source' => null, 'slug' => null];
        }
        foreach ($this->all() as $source => $route) {
            if (($segments[0] ?? null) !== $route['prefix'] || count($segments) > 2) {
                continue;
            }

            return count($segments) === 1 ? ['content' => 'archive', 'source' => $source, 'slug' => null]
                : ['content' => 'record', 'source' => $source, 'slug' => rawurldecode($segments[1])];
        }

        return null;
    }

    public function urlFor(string $source, string $slug): ?string
    {
        $route = $this->all()[$source] ?? null;

        return $route === null || $slug === '' ? null : '/' . $route['prefix'] . '/' . rawurlencode($slug);
    }

    /** @return list<string> sources the site search covers */
    public function searchable(): array
    {
        return array_keys(array_filter($this->all(), fn (array $r) => $r['search']));
    }

    /** Validates and stores the routes (an editor of the host calls it). @param array<string, mixed> $routes */
    public function save(array $routes): void
    {
        $clean = self::normalise($routes, $this->reserved);
        $this->settings->set(self::SETTING, json_encode($clean === [] ? new \stdClass() : $clean, JSON_UNESCAPED_SLASHES));
        $this->routes = $clean;
    }

    /** @return array<string, array{prefix: string, search: bool}> */
    private static function normalise(array $routes, ?ReservedPathChecker $reserved): array
    {
        $out = [];
        $prefixes = [];
        foreach ($routes as $source => $route) {
            $prefix = is_array($route) ? trim((string) ($route['prefix'] ?? ''), '/') : '';
            if (!is_string($source) || !preg_match('/^(module|host):[a-z0-9][a-z0-9_.-]{0,80}$/', $source)) {
                throw new InvalidDataQuery('ROUTE_SOURCE', (string) $source, 'Invalid data source id.');
            }
            if (!preg_match(self::PREFIX, $prefix) || isset($prefixes[$prefix]) || ($reserved !== null && $reserved->isReserved('/' . $prefix))) {
                throw new InvalidDataQuery('ROUTE_PREFIX', "{$source}.prefix", "The prefix '{$prefix}' is invalid, repeated or reserved.");
            }
            $prefixes[$prefix] = true;
            $out[$source] = ['prefix' => $prefix, 'search' => (bool) ($route['search'] ?? false)];
        }

        return $out;
    }
}
