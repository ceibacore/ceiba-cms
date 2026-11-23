<?php

declare(strict_types=1);

namespace CeibaCms\PageBuilder\Presentation\Api;

use CeibaCms\PageBuilder\Application\Design\DesignRevisionConflict;
use CeibaCms\PageBuilder\Application\Design\FindDesignUsages;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\PublishSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Domain\Style\InvalidDesign;
use Throwable;

/**
 * Site design API of the editor (plan 04-B): read with pages.read, save drafts with design.update, publish with
 * design.publish. Same response shapes and error codes as the page editor API.
 */
final class DesignApiController
{
    /** @var callable fn(): ?HostContext */
    private $contextResolver;

    public function __construct(
        private readonly string $siteId,
        callable $contextResolver,
        private readonly GetSiteDesign $designs,
        private readonly SaveSiteDesignDraft $save,
        private readonly PublishSiteDesign $publish,
        private readonly ?FindDesignUsages $usages = null,
    ) {
        $this->contextResolver = $contextResolver;
    }

    /** GET {prefix}/design — working design, its revision and the published one. @return array<string, mixed> */
    public function show(): array
    {
        return $this->guarded('pages.read', fn () => ['success' => true, 'data' => $this->designs->working()]);
    }

    /** GET {prefix}/design/revisions/{n} @return array<string, mixed> */
    public function revision(int $revision): array
    {
        return $this->guarded('pages.read', function () use ($revision): array {
            $design = $this->designs->revision($revision);
            return $design === null ? $this->error('REVISION_NOT_FOUND', 'Design revision unavailable', 404)
                : ['success' => true, 'data' => ['revision' => $revision, 'design' => $design]];
        });
    }

    /** GET {prefix}/design/usages?token=id | ?class=id — pages using it, before deleting it. @return array<string, mixed> */
    public function usages(string $kind, string $id): array
    {
        if (!in_array($kind, ['token', 'class'], true) || $id === '' || $this->usages === null) {
            return $this->error('VALIDATION_FAILED', 'Give a token or a class', 422);
        }
        return $this->guarded('pages.read', fn () => ['success' => true, 'data' => ['pages' => $this->usages->execute($kind, $id)]]);
    }

    /** PUT {prefix}/design with If-Match: "n" — saves revision n + 1. @return array<string, mixed> */
    public function saveDraft(string $json, ?string $ifMatch): array
    {
        if ($ifMatch === null || !preg_match('/^"([0-9]{1,10})"$/', $ifMatch, $match)) {
            return $this->error('PRECONDITION_REQUIRED', 'A quoted revision is required in If-Match', 428);
        }
        return $this->guarded('design.update', function (HostContext $context) use ($json, $match): array {
            try {
                $design = json_decode($json, true, 64, JSON_THROW_ON_ERROR);
                $revision = $this->save->execute($design, (int) $match[1], $context->actorId);
                return ['success' => true, 'data' => ['revision' => $revision, 'etag' => '"' . $revision . '"']];
            } catch (DesignRevisionConflict $conflict) {
                return $this->error('REVISION_CONFLICT', 'Design revision has changed', 412, ['currentRevision' => (string) $conflict->currentRevision]);
            } catch (InvalidDesign $invalid) {
                return $this->error('VALIDATION_FAILED', $invalid->getMessage(), 422, [$invalid->path => $invalid->reason]);
            } catch (\JsonException | \InvalidArgumentException $invalid) {
                return $this->error('VALIDATION_FAILED', 'Invalid design document', 422);
            }
        });
    }

    /** POST {prefix}/design/publish {"revision": n} @return array<string, mixed> */
    public function publish(string $json): array
    {
        return $this->guarded('design.publish', function () use ($json): array {
            $revision = json_decode($json, true)['revision'] ?? null;
            if (!is_int($revision)) {
                return $this->error('VALIDATION_FAILED', 'A revision number is required', 422);
            }
            try {
                return ['success' => true, 'data' => ['revision' => $this->publish->execute($revision)]];
            } catch (\InvalidArgumentException) {
                return $this->error('REVISION_NOT_FOUND', 'Design revision unavailable', 404);
            }
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
        } catch (Throwable $error) {
            error_log('[ceiba-cms] design API: ' . $error->getMessage());
            return $this->error('DESIGN_ERROR', 'Unable to process the design', 500);
        }
    }

    /** @param array<string, string> $fieldErrors @return array<string, mixed> */
    private function error(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        return ['success' => false, 'status' => $status, ...EditorError::create($code, $message, $fieldErrors)->toArray()];
    }
}
