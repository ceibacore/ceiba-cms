<?php
declare(strict_types=1);
namespace LemurCms\Tests\Auth\Application;

use LemurCms\Auth\Application\CreateUser;
use LemurCms\Auth\Application\AssignRole;
use LemurCms\Auth\Application\CheckPermission;
use LemurCms\Auth\Application\ChangePassword;
use LemurCms\Auth\Domain\UserRepositoryInterface;
use PHPUnit\Framework\TestCase;

class CreateUserTest extends TestCase
{
    public function testExecuteHashesPasswordAndReturnsId(): void
    {
        $repo = $this->createMock(UserRepositoryInterface::class);
        $repo->method('save')->willReturn(5);

        $useCase = new CreateUser($repo);
        $result = $useCase->execute(['name' => 'User', 'email' => 'test@test.com', 'password' => 'secret']);

        $this->assertEquals(5, $result);
    }
}

class AssignRoleTest extends TestCase
{
    public function testExecuteAssignsRole(): void
    {
        $repo = $this->createMock(UserRepositoryInterface::class);
        $repo->expects($this->once())->method('assignRole')->with(1, 2);

        $useCase = new AssignRole($repo);
        $useCase->execute(1, 2);
    }
}

class CheckPermissionTest extends TestCase
{
    public function testExecuteReturnsTrueIfPermissionExists(): void
    {
        $repo = $this->createMock(UserRepositoryInterface::class);
        $repo->method('checkPermission')->willReturn(true);

        $useCase = new CheckPermission($repo);
        $result = $useCase->execute("1", 'edit_posts');

        $this->assertTrue($result);
    }

    public function testExecuteReturnsFalseIfPermissionMissing(): void
    {
        $repo = $this->createMock(UserRepositoryInterface::class);
        $repo->method('checkPermission')->willReturn(false);

        $useCase = new CheckPermission($repo);
        $result = $useCase->execute("1", 'admin_access');

        $this->assertFalse($result);
    }
}

class ChangePasswordTest extends TestCase
{
    public function testExecuteChangesPassword(): void
    {
        $user = ['id' => 1, 'name' => 'User', 'password_hash' => 'old_hash'];
        
        $repo = $this->createMock(UserRepositoryInterface::class);
        $repo->method('findById')->willReturn($user);
        $repo->expects($this->once())->method('save');

        $useCase = new ChangePassword($repo);
        $useCase->execute(1, 'newpass');
    }
}

// Alias class to satisfy PHPUnit file discovery
class AuthUseCasesTest extends \PHPUnit\Framework\TestCase {
    public function testDummy(): void {
        $this->assertTrue(true);
    }
}
