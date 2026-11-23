<?php
declare(strict_types=1);

// Class files for hosts without Composer autoload (core layers). Loaded in order by bootstrap.php (shared scope).

// ── Support Layer (Exceptions, Validators, Helpers, Infrastructure) ──────────
require_once dirname(__DIR__) . '/src/Support/Exceptions/ValidatorException.php';
require_once dirname(__DIR__) . '/src/Support/Exceptions/InvalidMenuException.php';
require_once dirname(__DIR__) . '/src/Support/Exceptions/PageNotFoundException.php';
require_once dirname(__DIR__) . '/src/Support/Exceptions/InvalidUserException.php';
require_once dirname(__DIR__) . '/src/Support/Exceptions/InvalidPermissionException.php';

require_once dirname(__DIR__) . '/src/Support/Validators/MenuValidator.php';
require_once dirname(__DIR__) . '/src/Support/Validators/PageValidator.php';
require_once dirname(__DIR__) . '/src/Support/Validators/UserValidator.php';

require_once dirname(__DIR__) . '/src/Support/Helpers/StringHelper.php';
require_once dirname(__DIR__) . '/src/Support/Helpers/DateHelper.php';
require_once dirname(__DIR__) . '/src/Support/Helpers/ArrayHelper.php';
require_once dirname(__DIR__) . '/src/Support/Helpers/UuidHelper.php';
require_once dirname(__DIR__) . '/src/Support/Helpers/FakeDataHelper.php';

// ── Auth Layer (Adapter Pattern for CMS Security) ─────────────────────────────
require_once dirname(__DIR__) . '/src/Auth/Contracts/AuthDriverInterface.php';
require_once dirname(__DIR__) . '/src/Auth/Drivers/SessionDriver.php';
require_once dirname(__DIR__) . '/src/Auth/AuthManager.php';

// ── HTTP Layer (Controllers, Router) ──────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Http/Router.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/BaseController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/MenuController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/PageController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/PageRenderController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/CacheController.php';
require_once dirname(__DIR__) . '/src/Http/Controllers/LanguageController.php';

// ── Database Factories ───────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/database/factories/Factory.php';
require_once dirname(__DIR__) . '/database/factories/MenuFactory.php';
require_once dirname(__DIR__) . '/database/factories/PageFactory.php';
require_once dirname(__DIR__) . '/database/factories/UserFactory.php';

// ── Domain Ports ─────────────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Menu/Domain/Repository/MenuRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Page/Domain/Repository/PageRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Page/Domain/Repository/AdministrativePageReaderInterface.php';
require_once dirname(__DIR__) . '/src/Seo/Domain/Repository/SeoRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Media/Domain/Repository/MediaRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Auth/Domain/Repository/UserRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Localization/Domain/Repository/LanguageRepositoryInterface.php';
require_once dirname(__DIR__) . '/src/Localization/Domain/Repository/TranslationRepositoryInterface.php';

// ── Application Use Cases ────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Menu/Application/GetMainNavbar.php';
require_once dirname(__DIR__) . '/src/Menu/Application/GetNavbar.php';
require_once dirname(__DIR__) . '/src/Menu/Application/CreateMenuItem.php';
require_once dirname(__DIR__) . '/src/Menu/Application/UpdateMenuItem.php';
require_once dirname(__DIR__) . '/src/Menu/Application/DeleteMenuItem.php';
require_once dirname(__DIR__) . '/src/Menu/Application/SaveBanner.php';
require_once dirname(__DIR__) . '/src/Menu/Application/SaveLogo.php';
require_once dirname(__DIR__) . '/src/Page/Application/GetPageBySlug.php';
require_once dirname(__DIR__) . '/src/Page/Application/GetPageById.php';
require_once dirname(__DIR__) . '/src/Page/Application/CreatePage.php';
require_once dirname(__DIR__) . '/src/Page/Application/UpdatePage.php';
require_once dirname(__DIR__) . '/src/Page/Application/SavePageDraft.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageRevisionConflict.php';
require_once dirname(__DIR__) . '/src/Page/Application/PagePublicationKeyConflict.php';
require_once dirname(__DIR__) . '/src/Page/Application/PublishPageRevision.php';
require_once dirname(__DIR__) . '/src/Page/Application/RestorePageRevision.php';
require_once dirname(__DIR__) . '/src/Page/Application/PublishPage.php';
require_once dirname(__DIR__) . '/src/Page/Application/DeletePage.php';
require_once dirname(__DIR__) . '/src/Page/Application/ListPages.php';
require_once dirname(__DIR__) . '/src/Page/Application/ListAdministrativePages.php';
require_once dirname(__DIR__) . '/src/Page/Application/PublicContentFingerprint.php';
require_once dirname(__DIR__) . '/src/Page/Application/PublicContentDrift.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageRevisionNotFound.php';
require_once dirname(__DIR__) . '/src/Page/Application/PreviewTokenLimitReached.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageRevisionAuditLog.php';
require_once dirname(__DIR__) . '/src/Page/Application/ReconcilePageContent.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageNotFound.php';
require_once dirname(__DIR__) . '/src/Page/Application/SavePageContent.php';
require_once dirname(__DIR__) . '/src/Page/Application/GetPageWorkingRevision.php';
require_once dirname(__DIR__) . '/src/Page/Application/UnpublishPage.php';
require_once dirname(__DIR__) . '/src/Page/Application/PagePreviewTokens.php';
require_once dirname(__DIR__) . '/src/Page/Application/PinPageRevision.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageRevisionRetentionPolicy.php';
require_once dirname(__DIR__) . '/src/Page/Application/PurgePageRevisions.php';
require_once dirname(__DIR__) . '/src/Page/Application/DispatchPagePublicationOutbox.php';
require_once dirname(__DIR__) . '/src/Page/Application/PageRevisionOperationalMetrics.php';
require_once dirname(__DIR__) . '/src/Seo/Application/GetSeoForEntity.php';
require_once dirname(__DIR__) . '/src/Seo/Application/UpsertSeo.php';
require_once dirname(__DIR__) . '/src/Media/Application/StoreMedia.php';
require_once dirname(__DIR__) . '/src/Media/Application/DeleteMedia.php';
require_once dirname(__DIR__) . '/src/Media/Application/ListMedia.php';
require_once dirname(__DIR__) . '/src/Media/Application/FindMediaById.php';
require_once dirname(__DIR__) . '/src/Auth/Application/AuthenticateUser.php';
require_once dirname(__DIR__) . '/src/Auth/Application/CreateUser.php';
require_once dirname(__DIR__) . '/src/Auth/Application/AssignRole.php';
require_once dirname(__DIR__) . '/src/Auth/Application/CheckPermission.php';
require_once dirname(__DIR__) . '/src/Auth/Application/ChangePassword.php';
require_once dirname(__DIR__) . '/src/Localization/Application/ListLanguages.php';
require_once dirname(__DIR__) . '/src/Localization/Application/CreateLanguage.php';
require_once dirname(__DIR__) . '/src/Localization/Application/UpdateLanguage.php';
require_once dirname(__DIR__) . '/src/Localization/Application/DeleteLanguage.php';
require_once dirname(__DIR__) . '/src/Localization/Application/ListTranslations.php';
require_once dirname(__DIR__) . '/src/Localization/Application/UpdateTranslations.php';

// ── Presentation Layer ───────────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Menu/Presentation/CeibaMenuRenderer.php';
require_once dirname(__DIR__) . '/src/Menu/Presentation/CeibaMenuCache.php';
require_once dirname(__DIR__) . '/src/Menu/Presentation/CeibaMenuBuilder.php';
require_once dirname(__DIR__) . '/src/Menu/Presentation/BannerRenderer.php';
require_once dirname(__DIR__) . '/src/Menu/Presentation/BreadcrumbBuilder.php';
require_once dirname(__DIR__) . '/src/Menu/Presentation/NotificationPresenter.php';

// ── Infrastructure Adapters ──────────────────────────────────────────────────
require_once dirname(__DIR__) . '/src/Menu/Infrastructure/CeibaDbMenuRepository.php';
require_once dirname(__DIR__) . '/src/Page/Infrastructure/CeibaDbPageRepository.php';
require_once dirname(__DIR__) . '/src/Seo/Infrastructure/CeibaDbSeoRepository.php';
require_once dirname(__DIR__) . '/src/Media/Infrastructure/CeibaDbMediaRepository.php';
require_once dirname(__DIR__) . '/src/Auth/Infrastructure/CeibaDbUserRepository.php';
require_once dirname(__DIR__) . '/src/Localization/Infrastructure/CeibaDbLanguageRepository.php';
require_once dirname(__DIR__) . '/src/Localization/Infrastructure/CeibaDbTranslationRepository.php';
