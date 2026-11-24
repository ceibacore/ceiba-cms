<?php

declare(strict_types=1);

namespace CeibaCms\Media\Presentation;

use CeibaCms\Media\Application\Library\InvalidUpload;
use CeibaCms\Media\Application\Library\MediaInUse;
use CeibaCms\Media\Application\Library\MediaLibrary;
use CeibaCms\Media\Application\Library\FindMediaUsages;
use CeibaCms\Media\Application\Library\UploadMedia;
use CeibaCms\Media\Domain\MediaReferences;
use CeibaCms\Media\Domain\MediaSettings;
use CeibaCms\Media\Domain\Resolver\MediaResolver;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Presentation\Api\EditorError;
use CeibaCms\Settings\Domain\Repository\SettingsRepositoryInterface;
use Throwable;

/**
 * Media API of the editor (plan 05-A): list/resolve/usages with media.read, upload with media.create, describe with
 * media.update, delete with media.delete (refused while used). Same envelopes and codes as the page editor API.
 */
final class MediaApiController
{
    /** @var callable fn(): ?HostContext */
    private $contextResolver;

    public function __construct(
        private readonly string $siteId,
        callable $contextResolver,
        private readonly MediaLibrary $library,
        private readonly UploadMedia $upload,
        private readonly MediaResolver $resolver,
        private readonly FindMediaUsages $usages,
        private readonly ?SettingsRepositoryInterface $settings,
        /** Tests only: accept files that did not arrive through an HTTP upload. */
        private readonly bool $acceptLocalFiles = false,
    ) {
        $this->contextResolver = $contextResolver;
    }

    /** GET {prefix}/media?search=&page= @return array<string, mixed> */
    public function index(string $search, int $page): array
    {
        return $this->guarded('media.read', fn () => ['success' => true, 'data' => $this->library->search($search, $page)]);
    }

    /** GET {prefix}/media/settings @return array<string, mixed> */
    public function settings(): array
    {
        return $this->guarded('media.read', fn () => ['success' => true, 'data' => MediaSettings::from($this->settings)->toArray()]);
    }

    /** GET {prefix}/media/resolve?ids=a,b @return array<string, mixed> */
    public function resolve(string $ids): array
    {
        $list = array_slice(array_values(array_filter(explode(',', $ids), [MediaReferences::class, 'validId'])), 0, 200);
        return $this->guarded('media.read', fn () => ['success' => true, 'data' => ['media' => array_map(
            fn ($media) => $media->toArray(), $this->resolver->resolve($list)
        )]]);
    }

    /** GET {prefix}/media/{id}/usages @return array<string, mixed> */
    public function usages(string $id): array
    {
        return $this->guarded('media.read', fn () => $this->library->find($id) === null ? $this->missing()
            : ['success' => true, 'data' => $this->usages->execute($id)]);
    }

    /**
     * POST {prefix}/media (multipart: file, alt, widths, optimize, webp)
     * @param array<string, mixed>|null $file one entry of $_FILES
     * @param array<string, mixed> $input
     * @return array<string, mixed>
     */
    public function store(?array $file, array $input): array
    {
        return $this->guarded('media.create', function (HostContext $context) use ($file, $input): array {
            if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || !is_string($file['tmp_name'] ?? null)
                || (!$this->acceptLocalFiles && !is_uploaded_file($file['tmp_name']))) {
                return $this->error('VALIDATION_FAILED', 'Upload a file', 422, ['file' => 'REQUIRED']);
            }
            try {
                $id = $this->upload->execute($context, $file['tmp_name'], (string) ($file['name'] ?? ''), $input, MediaSettings::from($this->settings));
                return ['success' => true, 'status' => 201, 'data' => $this->library->find($id)];
            } catch (InvalidUpload $invalid) {
                return $this->error('VALIDATION_FAILED', $invalid->getMessage(), 422, ['file' => $invalid->reason]);
            }
        });
    }

    /** PATCH {prefix}/media/{id} {"alt": "..."} @return array<string, mixed> */
    public function update(string $id, string $json): array
    {
        return $this->guarded('media.update', function () use ($id, $json): array {
            $body = json_decode($json, true);
            $item = is_array($body) && array_key_exists('alt', $body) ? $this->library->describe($id, $body['alt']) : null;
            return $item === null ? $this->missing() : ['success' => true, 'data' => $item];
        });
    }

    /** DELETE {prefix}/media/{id} @return array<string, mixed> */
    public function destroy(string $id): array
    {
        return $this->guarded('media.delete', function (HostContext $context) use ($id): array {
            try {
                return $this->library->remove($context, $id) ? ['success' => true, 'data' => ['deleted' => $id]] : $this->missing();
            } catch (MediaInUse $inUse) {
                return ['success' => false, 'status' => 409, ...EditorError::create('MEDIA_IN_USE', 'The file is still used')->toArray(),
                    'usages' => $inUse->usages];
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
            error_log('[ceiba-cms] media API: ' . get_class($error) . ': ' . $error->getMessage());
            return $this->error('MEDIA_ERROR', 'Unable to process the media request', 500);
        }
    }

    /** @return array<string, mixed> */
    private function missing(): array
    {
        return $this->error('NOT_FOUND', 'Media unavailable', 404);
    }

    /** @param array<string, string> $fieldErrors @return array<string, mixed> */
    private function error(string $code, string $message, int $status, array $fieldErrors = []): array
    {
        return ['success' => false, 'status' => $status, ...EditorError::create($code, $message, $fieldErrors)->toArray()];
    }
}
