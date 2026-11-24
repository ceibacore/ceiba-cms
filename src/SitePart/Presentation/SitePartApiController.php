<?php

declare(strict_types=1);

namespace CeibaCms\SitePart\Presentation;

use CeibaCms\Page\Application\PagePublicationKeyConflict;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Presentation\Api\EditorError;
use CeibaCms\SitePart\Application\BuildPublicationCandidates;
use CeibaCms\SitePart\Application\HostRoutes;
use CeibaCms\SitePart\Application\ManageSiteParts;
use CeibaCms\SitePart\Application\PublishSiteParts;
use CeibaCms\SitePart\Application\RulesConflict;
use CeibaCms\SitePart\Application\SitePartImpact;
use CeibaCms\SitePart\Application\SitePartPreview;
use CeibaCms\SitePart\Application\SitePartsInConflict;
use CeibaCms\SitePart\Domain\InvalidRules;
use CeibaCms\SitePart\Domain\RuleContextMatrix;
use CeibaCms\SitePart\Domain\SitePartKind;
use CeibaCms\SitePart\Infrastructure\PublishedPageContexts;
use Throwable;

/**
 * Site parts API of the editor (plan 06-C) under {prefix}/site-parts: list (pages.read), create and rules
 * (pages.update), impact (pages.read) and publication of a set (pages.publish). Each part's document is edited with
 * the page revision routes. Same envelopes and codes as the page editor API.
 */
final class SitePartApiController
{
    /** @var callable fn(): ?HostContext */
    private $contextResolver;

    public function __construct(
        private readonly string $siteId,
        callable $contextResolver,
        private readonly ManageSiteParts $manage,
        private readonly BuildPublicationCandidates $candidates,
        private readonly PublishedPageContexts $pages,
        private readonly PublishSiteParts $publish,
        private readonly HostRoutes $routes,
        private readonly ?SitePartPreview $preview = null,
    ) {
        $this->contextResolver = $contextResolver;
    }

    /** GET {prefix}/site-parts @return array<string, mixed> */
    public function index(): array
    {
        return $this->guarded('pages.read', fn () => $this->ok(['parts' => $this->manage->list(), 'kinds' => SitePartKind::ALL,
            'routes' => $this->routes->routes === [] ? new \stdClass() : $this->routes->routes,
            // Published pages, as contexts for the preview and as targets of rules.
            'pages' => array_slice(array_map(fn (array $p): array => ['id' => $p['pageId'], 'path' => $p['path'], 'layoutId' => $p['layoutId'],
                'isHome' => $p['isHome']], $this->pages->list()), 0, 500)]));
    }

    /** POST {prefix}/site-parts {"kind", "name", "sourceId"?} @return array<string, mixed> */
    public function store(string $json): array
    {
        return $this->guarded('pages.update', function (HostContext $context) use ($json): array {
            $body = json_decode($json, true);
            $source = is_array($body) && is_string($body['sourceId'] ?? null) ? $body['sourceId'] : null;
            $id = $this->manage->create((string) ($body['kind'] ?? ''), (string) ($body['name'] ?? ''), $context->actorId, $source);
            return ['success' => true, 'status' => 201, 'data' => ['id' => $id]];
        });
    }

    /** PUT {prefix}/site-parts/{id}/rules with If-Match: "version" @return array<string, mixed> */
    public function saveRules(string $id, string $json, ?string $ifMatch): array
    {
        if ($ifMatch === null || !preg_match('/^"([0-9]{1,10})"$/', $ifMatch, $match)) {
            return $this->error('PRECONDITION_REQUIRED', 'A quoted rules version is required in If-Match', 428);
        }
        return $this->guarded('pages.update', fn (HostContext $context) => $this->ok(['version' => $this->manage->saveRules(
            $id, json_decode($json, true), (int) $match[1], $context->actorId
        )]));
    }

    /** GET {prefix}/site-parts/{id}/preview?revision=n&page=<id> (no page: the 404) — as if this revision were published. */
    public function preview(string $id, int $revision, ?string $pageId, bool $hasSession): array
    {
        if ($this->preview === null || $revision < 1) {
            return $this->error('VALIDATION_FAILED', 'A revision is required', 422);
        }
        return $this->guarded('pages.read', fn () => $this->ok($this->preview->render($id, $revision, $pageId, $hasSession)));
    }

    /** POST {prefix}/site-parts/impact {"ids": [...], "offset", "limit"} — what would change if they were published. */
    public function impact(string $json): array
    {
        return $this->guarded('pages.read', function () use ($json): array {
            $body = json_decode($json, true);
            $built = $this->candidates->build(is_array($body['ids'] ?? null) ? $body['ids'] : []);
            $contexts = RuleContextMatrix::generate([...$built['current'], ...$built['proposed']], $this->pages->list());
            return $this->ok((new SitePartImpact())->compare($built['current'], $built['proposed'], $contexts,
                (int) ($body['offset'] ?? 0), (int) ($body['limit'] ?? 50)));
        });
    }

    /** POST {prefix}/site-parts/publish {"changes": [{id, revision, rulesVersion}]} with Idempotency-Key. */
    public function publish(string $json, ?string $key): array
    {
        if ($key === null || trim($key) === '') {
            return $this->error('PRECONDITION_REQUIRED', 'An Idempotency-Key is required', 428);
        }
        return $this->guarded('pages.publish', function (HostContext $context) use ($json, $key): array {
            $changes = json_decode($json, true)['changes'] ?? null;
            return $this->ok(['revisions' => $this->publish->execute(is_array($changes) ? $changes : [], $key, $context->actorId)]);
        });
    }

    /** @return array<string, mixed> */
    private function guarded(string $capability, callable $action): array
    {
        try {
            $context = ($this->contextResolver)();
            if (!$context instanceof HostContext || $context->siteId !== $this->siteId || !in_array($capability, $context->capabilities, true)) {
                return $this->error('AUTHORIZATION_DENIED', 'Access denied', 403);
            }
            return $action($context);
        } catch (InvalidRules $invalid) {
            return $invalid->reason === 'NOT_FOUND' ? $this->error('NOT_FOUND', 'Site part unavailable', 404)
                : $this->error('VALIDATION_FAILED', $invalid->getMessage(), 422, [$invalid->path === '' ? 'rules' : $invalid->path => $invalid->reason]);
        } catch (RulesConflict $conflict) {
            return $this->error('REVISION_CONFLICT', 'Site part rules have changed', 412, ['currentRevision' => (string) $conflict->currentVersion]);
        } catch (SitePartsInConflict $tie) {
            return ['conflicts' => $tie->conflicts] + $this->error('SITE_PART_CONFLICT', 'Parts of the same kind would tie', 409);
        } catch (PagePublicationKeyConflict) {
            return $this->error('IDEMPOTENCY_CONFLICT', 'The key was used for another publication', 409);
        } catch (\InvalidArgumentException) {
            return $this->error('VALIDATION_FAILED', 'Invalid request', 422);
        } catch (Throwable $error) {
            error_log('[ceiba-cms] site parts API: ' . get_class($error) . ': ' . $error->getMessage());
            return $this->error('SITE_PART_ERROR', 'Unable to process the site parts request', 500);
        }
    }

    /** @param array<string, mixed> $data @return array<string, mixed> */
    private function ok(array $data): array
    {
        return ['success' => true, 'data' => $data];
    }

    /** @param array<string, string> $fieldErrors @return array<string, mixed> */
    private function error(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        return ['success' => false, 'status' => $status, ...EditorError::create($code, $message, $fieldErrors)->toArray()];
    }
}
