<?php
declare(strict_types=1);

// Data sources API of the editor (plan 07-C). Loaded in order by bootstrap.php (shared scope).
require_once dirname(__DIR__) . '/src/DataSource/Presentation/DataSourceApiController.php';

$assembleContentPage = new \CeibaCms\SitePart\Application\AssembleContentPage(
    $assembleSitePage, $sitePartStore, $dataSources, $contentRoutes, \Closure::fromCallable($dataSourceContext)
);
$dataSourceApiController = new \CeibaCms\DataSource\Presentation\DataSourceApiController(
    $siteId, $builderContextResolver, $dataSources, $dataSourceContext
);
