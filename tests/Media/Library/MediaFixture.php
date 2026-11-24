<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Library;

use CeibaCms\Media\Application\Library\FindMediaUsages;
use CeibaCms\Media\Application\Library\MediaLibrary;
use CeibaCms\Media\Application\Library\UploadMedia;
use CeibaCms\Media\Infrastructure\CeibaDbMediaRepository;
use CeibaCms\Media\Infrastructure\Images\GdImageVariants;
use CeibaCms\Page\Application\GetPageWorkingRevision;
use CeibaCms\PageBuilder\Application\Design\GetSiteDesign;
use CeibaCms\PageBuilder\Application\Design\SiteDesignStore;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\PageBuilder\Infrastructure\LocalMediaStorage;
use CeibaCms\Tests\Support\RevisionSchema;

/** In-memory database and a temporary storage directory for the media library tests. */
final class MediaFixture
{
    public readonly \CeibaDB $db;
    public readonly string $dir;
    public readonly LocalMediaStorage $storage;
    public readonly SiteDesignStore $designs;
    public readonly FindMediaUsages $usages;
    public readonly MediaLibrary $library;
    public readonly UploadMedia $upload;
    public readonly HostContext $context;

    public function __construct()
    {
        $this->db = RevisionSchema::create();
        $this->dir = sys_get_temp_dir() . '/cms-media-test-' . bin2hex(random_bytes(4));
        $this->storage = new LocalMediaStorage($this->dir);
        $this->designs = new SiteDesignStore($this->db, 'site-1');
        $this->usages = new FindMediaUsages($this->db, new GetPageWorkingRevision($this->db, 'site-1'), new GetSiteDesign($this->designs));
        $this->library = new MediaLibrary($this->db, '/cms-media', $this->storage, $this->usages);
        $this->upload = new UploadMedia($this->storage, new CeibaDbMediaRepository($this->db), new GdImageVariants());
        $this->context = new HostContext('site-1', 'admin', 'es', ['media.read', 'media.create', 'media.update', 'media.delete']);
    }

    /** A real image file of the given size and type. */
    public function image(int $width, int $height, string $type = 'jpeg'): string
    {
        $image = imagecreatetruecolor($width, $height);
        imagefilledrectangle($image, 0, 0, $width - 1, $height - 1, (int) imagecolorallocate($image, 200, 60, 40));
        $file = tempnam(sys_get_temp_dir(), 'img');
        match ($type) {
            'png' => imagepng($image, $file),
            'gif' => imagegif($image, $file),
            default => imagejpeg($image, $file, 90),
        };
        imagedestroy($image);
        return $file;
    }

    /** @return list<string> files in the storage directory of the site */
    public function storedFiles(): array
    {
        return array_map('basename', glob($this->dir . '/site-1/*') ?: []);
    }

    public function cleanUp(): void
    {
        array_map('unlink', glob($this->dir . '/site-1/*') ?: []);
        @rmdir($this->dir . '/site-1');
        @rmdir($this->dir);
    }
}
