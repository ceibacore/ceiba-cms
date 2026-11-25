<?php
declare(strict_types=1);

// Data sources (plan 07): registry, validated queries, dynamic modules as sources, query blocks, bindings and the
// public pages of sources. Loaded in order by bootstrap.php, after the page builder classes.
require_once dirname(__DIR__) . '/src/DataSource/Domain/FieldDescriptor.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/DataSourceDescriptor.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/InvalidDataQuery.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/DataQuery.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryContext.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryResult.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryValidator.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/DataSourceAdapter.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/DataSourceProvider.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/DataSourceRegistry.php';
require_once dirname(__DIR__) . '/src/DataSource/Infrastructure/ModuleQueryRunner.php';
require_once dirname(__DIR__) . '/src/DataSource/Infrastructure/ModuleRelationLabels.php';
require_once dirname(__DIR__) . '/src/DataSource/Infrastructure/ModuleSourceAdapter.php';
require_once dirname(__DIR__) . '/src/DataSource/Infrastructure/ModuleDataSources.php';
require_once dirname(__DIR__) . '/src/DataSource/Infrastructure/DataSourceLoopResolver.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryNodeConfig.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryOutcome.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/QueryControls.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/Binding/UrlGuard.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/Binding/ValueTransforms.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/Binding/SafeHtml.php';
require_once dirname(__DIR__) . '/src/DataSource/Domain/Binding/BindingResolver.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/TreeExpander.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/ContentRoutes.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/DefaultContentTrees.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/ContentSitemap.php';
require_once dirname(__DIR__) . '/src/DataSource/Application/DynamicContent.php';
