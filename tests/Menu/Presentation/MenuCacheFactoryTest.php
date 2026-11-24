<?php
declare(strict_types=1);

namespace CeibaCms\Tests\Menu\Presentation;

use CeibaCms\Menu\Presentation\MenuCacheFactory;
use PHPUnit\Framework\TestCase;

final class MenuCacheFactoryTest extends TestCase
{
    public function testConfiguredDirectoryIsWritableAndSitesDoNotShareEntries(): void
    {
        $root = sys_get_temp_dir() . '/cms-cache-test-' . bin2hex(random_bytes(8));
        try {
            $first = MenuCacheFactory::create('/unwritable-vendor', $root, 'tenant-1');
            $second = MenuCacheFactory::create('/unwritable-vendor', $root, 'tenant-2');
            $first->setRendered('navbar_main', '<nav>First</nav>');
            self::assertSame('<nav>First</nav>', $first->getRendered('navbar_main'));
            self::assertNull($second->getRendered('navbar_main'));
            $second->setRendered('navbar_main', '<nav>Second</nav>');
            self::assertSame('<nav>First</nav>', $first->getRendered('navbar_main'));
            self::assertSame('<nav>Second</nav>', $second->getRendered('navbar_main'));
        } finally {
            foreach (glob($root . '/*/storage/cache/menus/*.json') ?: [] as $file) {
                unlink($file);
            }
            foreach (glob($root . '/*/storage/cache/menus') ?: [] as $dir) {
                rmdir($dir);
                rmdir(dirname($dir));
                rmdir(dirname($dir, 2));
                rmdir(dirname($dir, 3));
            }
            if (is_dir($root)) rmdir($root);
        }
    }

    public function testConfiguredCacheRequiresSiteIdentity(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        MenuCacheFactory::create('/unused', '/configured', '');
    }
}
