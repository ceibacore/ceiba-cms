<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Media\Library;

use CeibaCms\Media\Application\Library\InvalidUpload;
use CeibaCms\Media\Domain\MediaSettings;
use PHPUnit\Framework\TestCase;

/** Plan 05-A / D-4: upload, variants chosen by the uploader, refused types. */
final class UploadMediaTest extends TestCase
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

    public function testTheOriginalIsKeptAndTheChosenWidthsBecomeWebpVariants(): void
    {
        $id = $this->media->upload->execute($this->media->context, $this->media->image(1200, 600), 'C:\\fotos\\Mi foto <b>.JPG',
            ['alt' => '  Una <i>foto</i> ', 'widths' => '480,960,1600'], MediaSettings::defaults());
        $item = $this->media->library->find($id);

        self::assertSame(['Mi foto b.jpg', 'image/jpeg', 'Una foto', 1200, 600], [$item['filename'], $item['mime'], $item['alt'], $item['originalWidth'], $item['originalHeight']]);
        self::assertMatchesRegularExpression('~^/cms-media/[a-f0-9]{32}\.webp 480w, /cms-media/[a-f0-9]{32}\.webp 960w, /cms-media/[a-f0-9]{32}\.webp 1200w$~', $item['srcset'],
            '1600 is larger than the original, so the original width is used instead (never upscaled)');
        self::assertSame([1200, 600], [$item['width'], $item['height']]);
        self::assertCount(4, $this->media->storedFiles(), 'original + 3 variants');
        $webp = array_values(array_filter($this->media->storedFiles(), fn ($f) => str_ends_with($f, '.webp')));
        self::assertSame('image/webp', (new \finfo(FILEINFO_MIME_TYPE))->file($this->media->dir . '/site-1/' . $webp[0]));
    }

    public function testWithoutWidthsOptimizeOrWebpOnlyTheOriginalIsStored(): void
    {
        $id = $this->media->upload->execute($this->media->context, $this->media->image(300, 200, 'png'), 'logo.png',
            ['widths' => '', 'optimize' => '0', 'webp' => '0'], MediaSettings::defaults());
        $item = $this->media->library->find($id);
        self::assertSame(['', 300, 'logo.png'], [$item['srcset'], $item['width'], $item['filename']]);
        self::assertCount(1, $this->media->storedFiles());
    }

    public function testOptimizeAloneKeepsTheTypeAndTheWidth(): void
    {
        $id = $this->media->upload->execute($this->media->context, $this->media->image(800, 400), 'a.jpg',
            ['widths' => '', 'optimize' => '1', 'webp' => '0'], MediaSettings::defaults());
        $item = $this->media->library->find($id);
        self::assertMatchesRegularExpression('~^/cms-media/[a-f0-9]{32}\.jpg$~', $item['url']);
        self::assertSame(800, $item['width']);
        self::assertCount(2, $this->media->storedFiles());
    }

    public function testAnimatedCapableGifsAreStoredWithoutVariants(): void
    {
        $id = $this->media->upload->execute($this->media->context, $this->media->image(600, 300, 'gif'), 'anim.gif', [], MediaSettings::defaults());
        self::assertSame('image/gif', $this->media->library->find($id)['mime']);
        self::assertCount(1, $this->media->storedFiles());
    }

    /** @return iterable<string, array{string, string}> */
    public static function refused(): iterable
    {
        yield 'text named jpg' => ["hello, I am not an image\n", 'TYPE'];
        yield 'svg' => ['<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>', 'TYPE'];
        yield 'html' => ['<!doctype html><html><body>x</body></html>', 'TYPE'];
        yield 'empty' => ['', 'SIZE'];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('refused')]
    public function testFilesThatAreNotAcceptedImagesAreRefusedByTheirContent(string $content, string $reason): void
    {
        $file = tempnam(sys_get_temp_dir(), 'bad');
        file_put_contents($file, $content);
        try {
            $this->media->upload->execute($this->media->context, $file, 'photo.jpg', [], MediaSettings::defaults());
            self::fail('Accepted');
        } catch (InvalidUpload $refused) {
            self::assertSame($reason, $refused->reason);
        } finally {
            unlink($file);
        }
        self::assertSame([], $this->media->storedFiles());
    }
}
