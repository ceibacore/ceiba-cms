<?php
declare(strict_types=1);

// Class files for hosts without Composer autoload (page builder, import, integration, dynamic modules). Loaded in order by bootstrap.php (shared scope).

// ── PageBuilder Layer ────────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/LoopConfig.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/Node.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/ComponentDefinition.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Repository/TemplateRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Repository/ComponentDefinitionRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/TreeValidator.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/TreeNormalizer.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/VariableInterpolator.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/LoopResolverInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/DataProviderInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/LoopResolver.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/BladeRendererInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/BladeRenderer.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/ListTemplates.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/GetTemplateById.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/CreateTemplate.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/DeleteTemplate.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/ListComponentDefinitions.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/CeibaDbTemplateRepository.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/CeibaDbComponentDefinitionRepository.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/PageLayout.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Repository/PageLayoutRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/CeibaDbPageLayoutRepository.php';

// V2 Page Template & Engine Entities/Contracts
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/PageTemplate.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/QueryConfig.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Entity/RenderCondition.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Repository/PageTemplateRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/CeibaDbPageTemplateRepository.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/GetPageTemplateById.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/ListPageTemplates.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/HtmlSemanticRulesProvider.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/PageBuilderMetadataService.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/PageBuilderMetadataController.php';
require_once dirname(__DIR__) . '/src/Support/Exceptions/SecurityException.php';

// V2 Engine Services
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/ConditionEngine.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/ContextResolver.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/QueryEngine.php';
require_once dirname(__DIR__) . '/src/Http/Middleware/MiddlewareInterface.php';
require_once dirname(__DIR__) . '/src/Http/Middleware/AuthMiddleware.php';
require_once dirname(__DIR__) . '/src/Http/Middleware/EvaluatePageConditions.php';

require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/LayoutRenderer.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/ListLayouts.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/GetLayoutById.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/GetDefaultLayout.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/CreateLayout.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/UpdateLayout.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/DeleteLayout.php';
require_once dirname(__DIR__) . '/src/Support/Validators/TemplateValidator.php';
require_once dirname(__DIR__) . '/src/Support/Validators/LayoutValidator.php';
require_once dirname(__DIR__) . '/src/Routing/Domain/Repository/ReservedPathRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Routing/Infrastructure/CeibaDbReservedPathRepository.php';
require_once dirname(__DIR__) . '/src/Routing/Domain/Service/ReservedPathChecker.php';
require_once dirname(__DIR__) . '/src/Routing/Application/ListReservedPaths.php';
require_once dirname(__DIR__) . '/src/Routing/Application/AddReservedPath.php';
require_once dirname(__DIR__) . '/src/Routing/Application/RemoveReservedPath.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/TemplateController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/ComponentDefinitionController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/LayoutController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/ReservedPathController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/HomeController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/ImportController.php';
require_once dirname(__DIR__) . '/src/Settings/Domain/Repository/SettingsRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Settings/Infrastructure/CeibaDbSettingsRepository.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/SettingsController.php';

// ── Import Module ────────────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Contract/RuleInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/ImportWarning.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/ImportResult.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/ClassHelper.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/RuleRegistry.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/RuleEngine.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/FallbackRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ContainerRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/RowRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ColRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/CardRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ButtonRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ButtonGroupRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ListGroupRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/AccordionRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/CarouselRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/CollapseRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/OffcanvasRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ToastRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/TooltipRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/BreadcrumbRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Bootstrap/ScrollspyRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/SemanticSectionRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/HeadingRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/ParagraphRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/ImageRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/PictureRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/FigureRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/DetailsRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/InlineTextRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/DividerRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/AnchorRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Generic/GenericDivRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Generic/SpanRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/DomHelper.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/BlockquoteRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/TableRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/Rules/Semantic/ListRule.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Import/HtmlImporter.php';

// ── UI Framework Module System ────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/UiFrameworkModuleInterface.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Service/UiFrameworkRegistry.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Frameworks/Bootstrap5/Bootstrap5Module.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Frameworks/Bootstrap5/Html.php';

// ── Integration Ports & Adapters ─────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/HostContext.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/DocumentEnvelope.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/DocumentWriteValidator.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/MigrationIncompatibility.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/MigrationReport.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Document/DocumentMigrator.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/Clock.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/DocumentAuthorization.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/PagePublicationAuthorization.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/JobDispatcher.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/MailDelivery.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/MediaStorage.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/ContentSource.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/RevisionOperationAuthorization.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/RevisionArchive.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/PublicationEvent.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Contract/PublicationEventHandler.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/SystemClock.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/CmsDocumentAuthorization.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/LoopResolverContentSource.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/LocalMediaStorage.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/SyncJobDispatcher.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/NullMailDelivery.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Infrastructure/JsonLinesRevisionArchive.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/ValidatePageDocument.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Application/MigratePageDocument.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Catalogue/ComponentDescriptor.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Catalogue/ComponentCatalogue.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Catalogue/Defaults/CoreComponents.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Domain/Catalogue/Defaults/ContentComponents.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Presentation/Api/EditorError.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Presentation/Api/NegotiatedCapabilities.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Presentation/Api/EditorAccessDenied.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Presentation/Api/EditorApiController.php';
require_once dirname(__DIR__) . '/src/PageBuilder/Presentation/Api/RevisionApiController.php';

// ── DynamicModule Layer ──────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/DynamicModule/Domain/Entity/ModuleFieldType.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Domain/Entity/ModuleField.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Domain/Entity/ModuleDefinition.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Domain/Repository/ModuleDefinitionRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Domain/Repository/GenericModuleRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Infrastructure/DynamicTableManager.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Infrastructure/CeibaDbModuleDefinitionRepository.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Infrastructure/GenericModuleRepository.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Application/CreateDynamicModule.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Application/UpdateDynamicModule.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Application/DeleteDynamicModule.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Application/GetModuleDefinition.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Application/ListDynamicModules.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Infrastructure/DynamicModuleDataProvider.php';
require_once dirname(__DIR__) . '/src/DynamicModule/Infrastructure/ApiDataProvider.php';
