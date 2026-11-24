<?php
declare(strict_types=1);

// Site design, styles and page assembly (plan 04-B). Loaded in order by bootstrap.php (shared scope).

foreach ([
    'PageBuilder/Domain/Style/StyleMatrix.php', 'PageBuilder/Domain/Style/StyleValues.php', 'PageBuilder/Domain/Style/StyleTokens.php',
    'PageBuilder/Domain/Style/StyleDeclaration.php', 'PageBuilder/Domain/Style/CompiledStyles.php', 'PageBuilder/Domain/Style/StyleCompiler.php',
    'PageBuilder/Domain/Style/StyledNodes.php', 'PageBuilder/Domain/Style/StyleClassDecorator.php', 'PageBuilder/Domain/Style/InvalidDesign.php',
    'PageBuilder/Domain/Style/SiteDesign.php', 'PageBuilder/Application/Design/DesignRevisionConflict.php',
    'PageBuilder/Application/Design/SiteDesignStore.php', 'PageBuilder/Application/Design/GetSiteDesign.php',
    'PageBuilder/Application/Design/SaveSiteDesignDraft.php', 'PageBuilder/Application/Design/PublishSiteDesign.php',
    'PageBuilder/Application/Design/FindDesignUsages.php',
    'PageBuilder/Application/CustomCode.php', 'PageBuilder/Application/PageAssembler.php',
    'PageBuilder/Presentation/Api/DesignApiController.php', 'Http/Controllers/PublicPageResponses.php',
] as $classFile) {
    require_once dirname(__DIR__) . '/src/' . $classFile;
}

$siteDesignStore     = new \CeibaCms\PageBuilder\Application\Design\SiteDesignStore($db, $siteId);
$getSiteDesign       = new \CeibaCms\PageBuilder\Application\Design\GetSiteDesign($siteDesignStore);
$saveSiteDesignDraft = new \CeibaCms\PageBuilder\Application\Design\SaveSiteDesignDraft($siteDesignStore);
$publishSiteDesign   = new \CeibaCms\PageBuilder\Application\Design\PublishSiteDesign($siteDesignStore);
$customCode          = new \CeibaCms\PageBuilder\Application\CustomCode($settingsRepository);
$designApiController = new \CeibaCms\PageBuilder\Presentation\Api\DesignApiController(
    $siteId, $builderContextResolver, $getSiteDesign, $saveSiteDesignDraft, $publishSiteDesign,
    new \CeibaCms\PageBuilder\Application\Design\FindDesignUsages($db, $getPageWorkingRevision)
);
