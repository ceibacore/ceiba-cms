<?php
declare(strict_types=1);

// Media library, image variants and asset resolution (plan 05-A). Loaded in order by bootstrap.php (shared scope).

foreach ([
    'Media/Domain/MediaReferences.php', 'Media/Domain/VideoEmbed.php', 'PageBuilder/Application/ComponentScripts.php', 'Media/Domain/MediaTypes.php', 'Media/Domain/MediaSettings.php',
    'Media/Domain/Resolver/ResolvedMedia.php', 'Media/Domain/Resolver/MediaResolver.php', 'Media/Domain/Resolver/MediaPropsDecorator.php',
    'Media/Infrastructure/CeibaDbMediaResolver.php', 'Media/Infrastructure/Images/VariantRequest.php',
    'Media/Infrastructure/Images/GdImageVariants.php', 'Media/Application/Library/InvalidUpload.php',
    'Media/Application/Library/MediaInUse.php', 'Media/Application/Library/FindMediaUsages.php',
    'Media/Application/Library/UploadMedia.php', 'Media/Application/Library/MediaLibrary.php',
    'Media/Presentation/MediaApiController.php',
] as $classFile) {
    require_once dirname(__DIR__) . '/src/' . $classFile;
}

// Public URL of the files of LocalMediaStorage, served by routes/api/builder-media.php.
$mediaPublicUrl     = rtrim((string) \CeibaCms\Support\Infrastructure\EnvironmentGuard::get('MEDIA_PUBLIC_URL', '/cms-media'), '/');
$mediaResolver      = new \CeibaCms\Media\Infrastructure\CeibaDbMediaResolver($db, $mediaPublicUrl);
$findMediaUsages    = new \CeibaCms\Media\Application\Library\FindMediaUsages($db, $getPageWorkingRevision, $getSiteDesign);
$mediaLibrary       = new \CeibaCms\Media\Application\Library\MediaLibrary($db, $mediaPublicUrl, $localMediaStorage, $findMediaUsages);
$uploadMedia        = new \CeibaCms\Media\Application\Library\UploadMedia(
    $localMediaStorage, $mediaRepository, new \CeibaCms\Media\Infrastructure\Images\GdImageVariants()
);
$mediaApiController = new \CeibaCms\Media\Presentation\MediaApiController(
    $siteId, $builderContextResolver, $mediaLibrary, $uploadMedia, $mediaResolver, $findMediaUsages, $settingsRepository
);
$localMediaFiles    = str_starts_with($mediaPublicUrl, '/')
    ? ['prefix' => $mediaPublicUrl, 'storage' => $localMediaStorage, 'siteId' => $siteId] : null;
// Public URLs of data sources (plan 07-D), read from the settings when a page is drawn.
$contentRoutes      = new \CeibaCms\DataSource\Application\ContentRoutes($settingsRepository, $reservedPathChecker);
$dynamicContent     = new \CeibaCms\DataSource\Application\DynamicContent($dataSources, log: static fn (string $m, array $c) => error_log('[cms:data] ' . $m . ' ' . json_encode($c)),
    routes: $contentRoutes);
$pageAssembler      = new \CeibaCms\PageBuilder\Application\PageAssembler($bladeRenderer, $getSiteDesign, $customCode, $mediaResolver,
    $dynamicContent, \Closure::fromCallable($dataSourceContext));
