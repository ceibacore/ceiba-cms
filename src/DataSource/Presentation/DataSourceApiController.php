<?php
declare(strict_types=1);

namespace CeibaCms\DataSource\Presentation;

use CeibaCms\DataSource\Application\DataSourceRegistry;
use CeibaCms\DataSource\Domain\InvalidDataQuery;
use CeibaCms\DataSource\Domain\QueryContext;
use CeibaCms\DataSource\Domain\QueryNodeConfig;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Presentation\Api\EditorError;
use Throwable;

/**
 * Data sources for the editor (plan 07-C) under {prefix}/data-sources: catalogue, schema, sample records and the
 * preview of a query block. The editor needs pages.read; the data is read with the visitor's context (D-8), so
 * the preview never shows more than the published page would.
 */
final class DataSourceApiController
{
    /** @var callable fn(): ?HostContext */
    private $contextResolver;
    /** @var callable fn(): QueryContext */
    private $queryContext;

    public function __construct(private readonly string $siteId, callable $contextResolver, private readonly DataSourceRegistry $registry, callable $queryContext)
    {
        $this->contextResolver = $contextResolver;
        $this->queryContext = $queryContext;
    }

    /** GET {prefix}/data-sources */
    public function index(): array
    {
        return $this->guarded(fn (QueryContext $c) => ['sources' => array_values(array_map(fn ($d) => ['id' => $d->id, 'label' => $d->label,
            'capabilities' => $d->capabilities], $this->registry->descriptors($c)))]);
    }

    /** GET {prefix}/data-sources/{id}/schema */
    public function schema(string $id): array
    {
        return $this->guarded(fn (QueryContext $c) => ['source' => $this->registry->descriptor($id, $c)->toArray()]);
    }

    /** GET {prefix}/data-sources/{id}/records?search= : records to preview a record page (id and label) */
    public function records(string $id, string $search): array
    {
        return $this->guarded(function (QueryContext $c) use ($id, $search): array {
            $descriptor = $this->registry->descriptor($id, $c);
            $query = ['source' => $id, 'page_size' => min(20, $descriptor->maxPageSize)];
            if (trim($search) !== '' && $descriptor->has('search')) {
                $query['search'] = $search;
            }
            $label = array_values(array_filter(array_keys($descriptor->publicFields()), fn ($n) => $descriptor->publicFields()[$n]->type === 'text'))[0] ?? null;
            $items = $this->registry->query(\CeibaCms\DataSource\Domain\DataQuery::fromArray($query), $c)->items;

            return ['records' => array_map(fn (array $r) => ['slug' => (string) ($r[$descriptor->slugField ?? 'id'] ?? ''),
                'label' => (string) ($label !== null ? ($r[$label] ?? '') : ($r['id'] ?? ''))], $items)];
        });
    }

    /** POST {prefix}/data-sources/preview {"query": {query block props}, "params": {declared URL values}} */
    public function preview(string $json): array
    {
        return $this->guarded(function (QueryContext $c) use ($json): array {
            $body = json_decode($json, true);
            $config = QueryNodeConfig::fromProps(is_array($body['query'] ?? null) ? $body['query'] : []);
            $values = $config->values(is_array($body['params'] ?? null) ? $body['params'] : []);
            $result = $this->registry->query($config->query($values), $c);

            return ['state' => $result->items === [] ? 'empty' : 'results'] + $result->toArray();
        });
    }

    /** @return array<string, mixed> */
    private function guarded(callable $action): array
    {
        try {
            $context = ($this->contextResolver)();
            if (!$context instanceof HostContext || $context->siteId !== $this->siteId || !in_array('pages.read', $context->capabilities, true)) {
                return $this->error('AUTHORIZATION_DENIED', 'Access denied', 403);
            }

            return ['success' => true, 'data' => $action(($this->queryContext)())];
        } catch (InvalidDataQuery $invalid) {
            return $invalid->errorCode === 'QUERY_SOURCE' ? $this->error('NOT_FOUND', 'Data source unavailable', 404)
                : $this->error('VALIDATION_FAILED', $invalid->getMessage(), 422, [$invalid->path => $invalid->errorCode]);
        } catch (Throwable $error) {
            error_log('[ceiba-cms] data sources API: ' . get_class($error) . ': ' . $error->getMessage());

            return $this->error('DATA_SOURCE_ERROR', 'The source did not answer', 502);
        }
    }

    /** Same envelope as the other editor APIs. @param array<string, string> $fieldErrors @return array<string, mixed> */
    private function error(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        return ['success' => false, 'status' => $status, ...EditorError::create($code, $message, $fieldErrors)->toArray()];
    }
}
