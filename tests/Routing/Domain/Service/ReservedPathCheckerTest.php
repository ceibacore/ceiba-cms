<?php
declare(strict_types=1);

namespace LemurCms\Tests\Routing\Domain\Service;

use LemurCms\Routing\Domain\Repository\ReservedPathRepositoryInterface;
use LemurCms\Routing\Domain\Service\ReservedPathChecker;
use PHPUnit\Framework\TestCase;

class ReservedPathCheckerTest extends TestCase
{
    private ReservedPathRepositoryInterface $repo;
    private ReservedPathChecker $checker;

    protected function setUp(): void
    {
        $this->repo    = $this->createMock(ReservedPathRepositoryInterface::class);
        $this->checker = new ReservedPathChecker($this->repo);
    }

    // ── Static reserved paths ────────────────────────────────────────────────

    public function testStaticRootPathIsReserved(): void
    {
        $this->repo->expects($this->never())->method('findByPath');

        $this->assertTrue($this->checker->isReserved('api'));
        $this->assertTrue($this->checker->isReserved('admin'));
        $this->assertTrue($this->checker->isReserved('login'));
        $this->assertTrue($this->checker->isReserved('logout'));
        $this->assertTrue($this->checker->isReserved('register'));
        $this->assertTrue($this->checker->isReserved('dashboard'));
    }

    public function testStaticPrefixIsReserved(): void
    {
        $this->repo->expects($this->never())->method('findByPath');

        $this->assertTrue($this->checker->isReserved('api/v1/users'));
        $this->assertTrue($this->checker->isReserved('admin/cms/pages'));
        $this->assertTrue($this->checker->isReserved('_debugbar/assets/js'));
    }

    public function testLeadingSlashIsNormalized(): void
    {
        $this->repo->expects($this->never())->method('findByPath');

        $this->assertTrue($this->checker->isReserved('/api/foo'));
        $this->assertTrue($this->checker->isReserved('  /admin/  '));
    }

    // ── Non-reserved paths fall through to DB ───────────────────────────────

    public function testUnknownPathChecksDbAndReturnsFalse(): void
    {
        $this->repo->expects($this->once())
            ->method('findByPath')
            ->with('blog/my-post')
            ->willReturn(null);

        $this->assertFalse($this->checker->isReserved('blog/my-post'));
    }

    public function testPathReservedInDbReturnsTrue(): void
    {
        $this->repo->expects($this->once())
            ->method('findByPath')
            ->with('private-section')
            ->willReturn(['id' => 'db-id', 'path' => 'private-section', 'reason' => 'Locked']);

        $this->assertTrue($this->checker->isReserved('private-section'));
    }

    // ── Partial prefix must not false-positive ───────────────────────────────

    public function testPartialPrefixNotReserved(): void
    {
        // "apis" is NOT "api" nor starts with "api/"
        $this->repo->expects($this->once())
            ->method('findByPath')
            ->with('apis')
            ->willReturn(null);

        $this->assertFalse($this->checker->isReserved('apis'));
    }

    public function testAdminWordInMiddleNotReserved(): void
    {
        $this->repo->expects($this->once())
            ->method('findByPath')
            ->with('blog/adminish')
            ->willReturn(null);

        $this->assertFalse($this->checker->isReserved('blog/adminish'));
    }

    // ── staticPaths() ────────────────────────────────────────────────────────

    public function testStaticPathsReturnsNonEmptyArray(): void
    {
        $paths = $this->checker->staticPaths();

        $this->assertIsArray($paths);
        $this->assertNotEmpty($paths);
        $this->assertContains('api', $paths);
        $this->assertContains('admin', $paths);
    }
}
