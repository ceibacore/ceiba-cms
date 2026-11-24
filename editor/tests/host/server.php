<?php
// Minimal PHP host for the editor contract test (plan 03-A, gate of plan 00: "un host PHP mínimo").
// No Laravel and no module router: it wires the module controllers by hand on a SQLite file and serves
// only the routes the reference transport uses. Run: CMS_EDITOR_DB=/tmp/x.sqlite php -S 127.0.0.1:8099 server.php
declare(strict_types=1);

use CeibaCms\Page\Application\PagePreviewTokens;
use CeibaCms\Page\Application\PageRevisionAuditLog;
use CeibaCms\Page\Application\PinPageRevision;
use CeibaCms\Page\Application\PublishPageRevision;
use CeibaCms\Page\Application\ReconcilePageContent;
use CeibaCms\Page\Application\RestorePageRevision;
use CeibaCms\Page\Application\SavePageDraft;
use CeibaCms\Page\Application\UnpublishPage;
use CeibaCms\Page\Infrastructure\CeibaDbPageRepository;
use CeibaCms\PageBuilder\Application\ValidatePageDocument;
use CeibaCms\PageBuilder\Domain\Catalogue\ComponentCatalogue;
use CeibaCms\PageBuilder\Domain\Contract\DocumentAuthorization;
use CeibaCms\PageBuilder\Domain\Contract\PagePublicationAuthorization;
use CeibaCms\PageBuilder\Domain\Contract\RevisionOperationAuthorization;
use CeibaCms\PageBuilder\Domain\Document\DocumentMigrator;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Domain\Service\HtmlSemanticRulesProvider;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Domain\Service\BladeRenderer;
use CeibaCms\PageBuilder\Domain\Service\LoopResolver;
use CeibaCms\PageBuilder\Domain\Service\VariableInterpolator;
use CeibaCms\PageBuilder\Presentation\Api\EditorApiController;
use CeibaCms\PageBuilder\Presentation\Api\EditorPreviewController;
use CeibaCms\PageBuilder\Presentation\Api\RevisionApiController;
use CeibaCms\Tests\Support\RevisionSchema;

require dirname(__DIR__, 3) . '/vendor/autoload.php';

const SITE = 'site-1';
$file = getenv('CMS_EDITOR_DB') ?: sys_get_temp_dir() . '/ceiba-editor-host.sqlite';
$fresh = !is_file($file) || filesize($file) === 0;
$db = CeibaDB::getInstance(['driver' => 'sqlite', 'db' => $file, 'prefix' => 'ed_']);
if ($fresh) {
    RevisionSchema::install($db);
    RevisionSchema::page($db, SITE, 'page-1',
        '[{"id":"c1","type":"container","props":{"fluid":false},"children":[{"id":"t1","type":"heading","props":{"text":"Hello"},"children":[]}]}]');
}

// The host decides identity and permissions; the browser never sends them.
$context = static fn (): HostContext => new HostContext(SITE, 'author-1', 'es',
    ['pages.read', 'pages.update', 'pages.publish', 'pages.restore', 'pages.unpublish']);
$allowUpdate = new class implements DocumentAuthorization {
    public function canUpdate(HostContext $context, string $pageId): bool { return true; }
};
$allowPublish = new class implements PagePublicationAuthorization {
    public function canPublish(HostContext $context, string $pageId): bool { return true; }
};
$allowRevisions = new class implements RevisionOperationAuthorization {
    public function canPerform(HostContext $context, string $pageId, string $operation): bool { return true; }
};
$media = new \CeibaCms\Media\Infrastructure\CeibaDbMediaRepository($db);
$reporter = static function (string $requestId, Throwable $error): void {
    error_log("[{$requestId}] " . $error->getMessage());
};

$pages = new CeibaDbPageRepository($db);
$save = new SavePageDraft($db, SITE);
$audit = new PageRevisionAuditLog($db, SITE);
$editor = new EditorApiController('/api/builder/v1', SITE, $pages, $media, $allowUpdate, new DocumentMigrator(),
    new ValidatePageDocument(SITE, $pages, $media, $allowUpdate), ComponentCatalogue::createDefault(), $context,
    $save, $db, new PublishPageRevision($db, SITE), $allowPublish, $audit, $reporter, true);
$revisions = new RevisionApiController(SITE, $context, $allowRevisions, $audit,
    new RestorePageRevision($db, SITE, $save), new ReconcilePageContent($db, SITE, $save), new UnpublishPage($db, SITE),
    new PagePreviewTokens($db, SITE), new PinPageRevision($db, SITE), $db, $reporter);

// The server renderer as a Bootstrap 5 site uses it (bootstrap.php registers the module; the host activates it).
$frameworks = new \CeibaCms\PageBuilder\Domain\Service\UiFrameworkRegistry();
$frameworks->register(new \CeibaCms\PageBuilder\Frameworks\Bootstrap5\Bootstrap5Module());
$frameworks->setActive('bootstrap5');
$renderer = new BladeRenderer(new LoopResolver(), new VariableInterpolator(), $frameworks);
$assembler = new \CeibaCms\PageBuilder\Application\PageAssembler($renderer,
    new \CeibaCms\PageBuilder\Application\Design\GetSiteDesign(new \CeibaCms\PageBuilder\Application\Design\SiteDesignStore($db, SITE)),
    new \CeibaCms\PageBuilder\Application\CustomCode(null), new \CeibaCms\Media\Infrastructure\CeibaDbMediaResolver($db, '/cms-media'));
$mediaRoutes = require __DIR__ . '/media.php';
$preview = new EditorPreviewController($editor, $revisions, new GetPageWorkingRevision($db, SITE), $renderer, $assembler, $pages);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$body = (string) file_get_contents('php://input');
$response = $mediaRoutes($method, $path, $body) ?? match (true) {
    $method === 'GET' && $path === '/api/builder/v1/components' => $editor->components(),
    $method === 'GET' && $path === '/api/pagebuilder/rules' => [
        'success' => true, 'data' => ['html_tags' => (new HtmlSemanticRulesProvider())->getRules()],
    ],
    $method === 'GET' && preg_match('~^/api/builder/v1/pages/([\w-]+)/draft$~', $path, $m) === 1
        => $editor->showDraft($m[1]),
    $method === 'PUT' && preg_match('~^/api/builder/v1/pages/([\w-]+)/draft$~', $path, $m) === 1
        => $editor->saveDraft($m[1], $body, $_SERVER['HTTP_IF_MATCH'] ?? null, $_GET['reason'] ?? null),
    $method === 'GET' && preg_match('~^/api/builder/v1/pages/([\w-]+)/revisions/(\d+)$~', $path, $m) === 1
        => $revisions->showRevision($m[1], (int) $m[2]),
    $method === 'GET' && $path === '/api/builder/v1/capabilities' => $editor->capabilities(),
    $method === 'GET' && preg_match('~^/api/builder/v1/pages/([\w-]+)/status$~', $path, $m) === 1 => $preview->status($m[1]),
    $method === 'GET' && preg_match('~^/api/builder/v1/pages/([\w-]+)/revisions/(\d+)/render$~', $path, $m) === 1
        => $preview->render($m[1], (int) $m[2]),
    $method === 'POST' && preg_match('~^/api/builder/v1/pages/([\w-]+)/publish-revision$~', $path, $m) === 1
        => $editor->publishRevision($m[1], $body, $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? null),
    default => ['success' => false, 'status' => 404, 'error' => ['code' => 'NOT_FOUND', 'message' => 'Not found']],
};
http_response_code((int) ($response['status'] ?? 200));
header('Content-Type: application/json');
echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
