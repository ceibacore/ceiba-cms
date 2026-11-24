<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Library;

use CeibaCms\Media\Infrastructure\CeibaDbMediaResolver;
use CeibaCms\Media\Presentation\MediaApiController;
use CeibaCms\PageBuilder\Domain\Document\HostContext;
use CeibaCms\Tests\Support\RevisionSchema;
use PHPUnit\Framework\TestCase;

/** Plan 05-A: the media API contract the editor transport relies on. */
final class MediaApiControllerTest extends TestCase
{
    private MediaFixture $media;

    protected function setUp(): void
    {
        $this->media = new MediaFixture();
    }

    protected function tearDown(): void
    {
        $this->media->cleanUp();
    }

    /** @param list<string> $capabilities */
    private function api(array $capabilities = ['media.read', 'media.create', 'media.update', 'media.delete']): MediaApiController
    {
        $context = new HostContext('site-1', 'admin', 'es', $capabilities);
        return new MediaApiController('site-1', fn () => $context, $this->media->library, $this->media->upload,
            new CeibaDbMediaResolver($this->media->db, '/cms-media'), $this->media->usages, null, true);
    }

    private function file(string $path, string $name = 'photo.jpg'): array
    {
        return ['name' => $name, 'tmp_name' => $path, 'error' => UPLOAD_ERR_OK, 'size' => filesize($path)];
    }

    public function testUploadListResolveDescribeAndDelete(): void
    {
        $api = $this->api();
        $created = $api->store($this->file($this->media->image(1000, 500)), ['alt' => 'Sea', 'widths' => '480', 'webp' => '1']);
        self::assertSame([true, 201, 'Sea'], [$created['success'], $created['status'], $created['data']['alt']]);
        $id = $created['data']['id'];

        self::assertSame([$id], array_column($api->index('sea', 1)['data']['items'], 'id'));
        $resolved = $api->resolve("{$id},nope,../x")['data']['media'];
        self::assertSame([$id], array_keys($resolved));
        self::assertStringContainsString(' 480w, ', $resolved[$id]['srcset']);
        self::assertSame([480, 960, 1600], $api->settings()['data']['widths']);
        self::assertSame('Mar', $api->update($id, '{"alt":"Mar"}')['data']['alt']);
        self::assertSame(['pages' => [], 'design' => false], $api->usages($id)['data']);
        self::assertSame(['deleted' => $id], $api->destroy($id)['data']);
        self::assertSame(404, $api->destroy($id)['status']);
    }

    public function testAFakeImageIsRefusedAndAUsedFileIsNotDeleted(): void
    {
        $api = $this->api();
        $fake = tempnam(sys_get_temp_dir(), 'fake');
        file_put_contents($fake, '<svg xmlns="http://www.w3.org/2000/svg"/>');
        $refused = $api->store($this->file($fake, 'logo.svg'), []);
        unlink($fake);
        self::assertSame([422, 'VALIDATION_FAILED', ['file' => 'TYPE']], [$refused['status'], $refused['error']['code'], $refused['error']['fieldErrors']]);

        $id = $api->store($this->file($this->media->image(100, 100)), [])['data']['id'];
        RevisionSchema::page($this->media->db, 'site-1', 'p1', json_encode([['id' => 'i', 'type' => 'image', 'props' => ['src' => ['asset' => $id]], 'children' => []]]));
        $blocked = $api->destroy($id);
        self::assertSame([409, 'MEDIA_IN_USE', 'p1'], [$blocked['status'], $blocked['error']['code'], $blocked['usages']['pages'][0]['pageId']]);
    }

    public function testEachOperationNeedsItsCapability(): void
    {
        $readOnly = $this->api(['media.read']);
        self::assertSame(403, $readOnly->store($this->file($this->media->image(10, 10)), [])['status']);
        self::assertSame(403, $readOnly->destroy('x')['status']);
        self::assertSame(403, $readOnly->update('x', '{"alt":"a"}')['status']);
        self::assertSame(403, $this->api([])->index('', 1)['status']);
        $notUploaded = new MediaApiController('site-1', fn () => new HostContext('site-1', 'a', 'es', ['media.create']), $this->media->library,
            $this->media->upload, new CeibaDbMediaResolver($this->media->db, '/m'), $this->media->usages, null);
        self::assertSame(422, $notUploaded->store($this->file($this->media->image(10, 10)), [])['status'], 'Only real HTTP uploads');
    }
}
