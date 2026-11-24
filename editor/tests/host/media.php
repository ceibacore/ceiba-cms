<?php
// Media routes of the minimal PHP host (plan 05-A), wired like bootstrap/46-media.php. Loaded by server.php,
// which passes $db, $context and SITE; returns a router: fn(method, path, body) => response array or null.
declare(strict_types=1);

use CeibaCms\Media\Application\Library\FindMediaUsages;
use CeibaCms\Media\Application\Library\MediaLibrary;
use CeibaCms\Media\Application\Library\UploadMedia;
use CeibaCms\Media\Infrastructure\CeibaDbMediaRepository;
use CeibaCms\Media\Infrastructure\CeibaDbMediaResolver;
use CeibaCms\Media\Infrastructure\Images\GdImageVariants;
use CeibaCms\Media\Presentation\MediaApiController;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Infrastructure\LocalMediaStorage;

/** @var CeibaDB $db */
/** @var callable $context */
$storage = new LocalMediaStorage(dirname((string) (getenv('CMS_EDITOR_DB') ?: sys_get_temp_dir() . '/x')) . '/media');
$mediaResolver = new CeibaDbMediaResolver($db, '/cms-media');
$usages = new FindMediaUsages($db, new GetPageWorkingRevision($db, SITE), new GetSiteDesign(new SiteDesignStore($db, SITE)));
$mediaContext = static fn () => new \CeibaCms\PageBuilder\Domain\Document\HostContext(SITE, 'author-1', 'es',
    ['media.read', 'media.create', 'media.update', 'media.delete']);
$mediaApi = new MediaApiController(SITE, $mediaContext, new MediaLibrary($db, '/cms-media', $storage, $usages),
    new UploadMedia($storage, new CeibaDbMediaRepository($db), new GdImageVariants()), $mediaResolver, $usages, null);

return static function (string $method, string $path, string $body) use ($mediaApi): ?array {
    $id = preg_match('~^/api/builder/v1/media/([\w-]+)(/usages)?$~', $path, $m) === 1 ? $m[1] : null;
    return match (true) {
        $method === 'GET' && $path === '/api/builder/v1/media' => $mediaApi->index((string) ($_GET['search'] ?? ''), (int) ($_GET['page'] ?? 1)),
        $method === 'GET' && $path === '/api/builder/v1/media/settings' => $mediaApi->settings(),
        $method === 'GET' && $path === '/api/builder/v1/media/resolve' => $mediaApi->resolve((string) ($_GET['ids'] ?? '')),
        $method === 'POST' && $path === '/api/builder/v1/media' => $mediaApi->store($_FILES['file'] ?? null, $_POST),
        $id !== null && $method === 'GET' && isset($m[2]) => $mediaApi->usages($id),
        $id !== null && $method === 'PATCH' => $mediaApi->update($id, $body),
        $id !== null && $method === 'DELETE' => $mediaApi->destroy($id),
        default => null,
    };
};
