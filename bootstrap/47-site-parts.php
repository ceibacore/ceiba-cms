<?php
declare(strict_types=1);

// Site parts use the same assembler as pages and are scoped to the current site.
foreach ([
    'Domain/InvalidRules.php', 'Domain/SitePartKind.php', 'Domain/SitePartRules.php', 'Domain/RenderContext.php',
    'Domain/SitePart.php', 'Domain/Resolution.php', 'Domain/RuleMatcher.php', 'Domain/SitePartResolver.php',
    'Infrastructure/SitePartStore.php', 'Application/AssembleSitePage.php',
] as $classFile) {
    require_once dirname(__DIR__) . '/src/SitePart/' . $classFile;
}

$sitePartStore = new \CeibaCms\SitePart\Infrastructure\SitePartStore($db, $siteId);
$assembleSitePage = new \CeibaCms\SitePart\Application\AssembleSitePage($pageAssembler, $sitePartStore);
