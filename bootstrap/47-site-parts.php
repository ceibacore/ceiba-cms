<?php
declare(strict_types=1);

// Site parts: header, footer and 404 with rules (plan 06). Loaded in order by bootstrap.php (shared scope).
foreach ([
    'Domain/InvalidRules.php', 'Domain/SitePartKind.php', 'Domain/SitePartRules.php', 'Domain/RenderContext.php',
    'Domain/SitePart.php', 'Domain/Resolution.php', 'Domain/RuleMatcher.php', 'Domain/SitePartResolver.php',
    'Domain/RuleContextMatrix.php', 'Domain/DetectSitePartConflicts.php',
    'Infrastructure/SitePartStore.php', 'Infrastructure/PublishedPageContexts.php',
    'Application/HostRoutes.php', 'Application/RulesConflict.php', 'Application/SitePartsInConflict.php',
    'Application/ManageSiteParts.php', 'Application/BuildPublicationCandidates.php', 'Application/PublicationGuard.php',
    'Application/ContextConflictGuard.php', 'Application/PublishSiteParts.php', 'Application/SitePartImpact.php',
    'Application/AssembleSitePage.php', 'Application/SitePartPreview.php', 'Presentation/SitePartApiController.php',
] as $classFile) {
    require_once dirname(__DIR__) . '/src/SitePart/' . $classFile;
}

// Routes of the host a rule may name (name => label). The module has none; hosts register theirs.
$hostRoutes            = new \CeibaCms\SitePart\Application\HostRoutes();
$sitePartStore         = new \CeibaCms\SitePart\Infrastructure\SitePartStore($db, $siteId);
$assembleSitePage      = new \CeibaCms\SitePart\Application\AssembleSitePage($pageAssembler, $sitePartStore,
    static function (string $slug) use ($getNavbar): string {
        try {
            return (string) $getNavbar->execute($slug);
        } catch (\Throwable) {
            return '';
        }
    });
$manageSiteParts       = new \CeibaCms\SitePart\Application\ManageSiteParts(
    $sitePartStore, $createPage, $getPageWorkingRevision, $systemClock, $hostRoutes
);
$sitePartCandidates    = new \CeibaCms\SitePart\Application\BuildPublicationCandidates($sitePartStore, $hostRoutes);
$publishedPageContexts = new \CeibaCms\SitePart\Infrastructure\PublishedPageContexts($db, $siteId, $getLayoutById, $getDefaultLayout);
$publishSiteParts      = new \CeibaCms\SitePart\Application\PublishSiteParts($db, $siteId, $sitePartStore, $publishPageRevision,
    new \CeibaCms\SitePart\Application\ContextConflictGuard($sitePartCandidates, $publishedPageContexts));
$sitePartApiController = new \CeibaCms\SitePart\Presentation\SitePartApiController(
    $siteId, $builderContextResolver, $manageSiteParts, $sitePartCandidates, $publishedPageContexts, $publishSiteParts, $hostRoutes,
    new \CeibaCms\SitePart\Application\SitePartPreview($db, $siteId, $sitePartStore, $assembleSitePage, $pageRepository,
        $getLayoutById, $getDefaultLayout, $hostRoutes, (string) ($settingsRepository?->get('site_language', 'es') ?? 'es'))
);
