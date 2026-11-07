<?php
declare(strict_types=1);

namespace LemurCms\PageBuilder\Presentation\Api;

use LemurCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use LemurCms\PageBuilder\Domain\Document\HostContext;

/**
 * Negotiated capabilities exchanged on editor visual bootstrap.
 */
final class NegotiatedCapabilities
{
    /**
     * @param list<int> $supportedSchemaVersions
     * @param list<string> $effectivePermissions
     * @param list<array<string, mixed>> $components
     * @param array<string, bool> $features
     */
    public function __construct(
        public readonly string $siteId,
        public readonly string $actorId,
        public readonly string $locale,
        public readonly array $supportedSchemaVersions,
        public readonly array $effectivePermissions,
        public readonly array $components,
        public readonly array $features = [],
    ) {}

    public static function negotiate(HostContext $context, ComponentCatalogue $catalogue): self
    {
        return new self(
            siteId: $context->siteId,
            actorId: $context->actorId,
            locale: $context->locale,
            supportedSchemaVersions: [1],
            effectivePermissions: $context->capabilities,
            components: $catalogue->toArray(),
            features: [
                'dragAndDrop'               => true,
                'responsivePreview'         => true,
                'dryRunMigration'           => true,
                'retainedUnknownComponents' => true,
                'versionedEnvelopes'        => true,
            ]
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'siteId'                  => $this->siteId,
            'actorId'                 => $this->actorId,
            'locale'                  => $this->locale,
            'supportedSchemaVersions' => $this->supportedSchemaVersions,
            'effectivePermissions'    => $this->effectivePermissions,
            'components'              => $this->components,
            'features'                => $this->features,
        ];
    }
}
