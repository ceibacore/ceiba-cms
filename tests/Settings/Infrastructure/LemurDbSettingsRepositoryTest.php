<?php
declare(strict_types=1);

namespace LemurCms\Tests\Settings\Infrastructure;

use LemurCms\Settings\Infrastructure\LemurDbSettingsRepository;
use LemurCms\Tests\TestCase;

class LemurDbSettingsRepositoryTest extends TestCase
{
    private LemurDbSettingsRepository $repo;

    /** Unique prefix so parallel test runs don't collide. */
    private string $prefix;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repo   = new LemurDbSettingsRepository($this->db);
        $this->prefix = 'test_' . uniqid();
    }

    protected function tearDown(): void
    {
        // Remove test keys to keep the database clean
        $this->db->query('settings')->where(['key' => $this->prefix . '_a'])->delete();
        $this->db->query('settings')->where(['key' => $this->prefix . '_b'])->delete();
        parent::tearDown();
    }

    public function testGetReturnsDefaultWhenKeyDoesNotExist(): void
    {
        $result = $this->repo->get($this->prefix . '_missing', 'fallback');
        $this->assertSame('fallback', $result);
    }

    public function testSetInsertsNewKey(): void
    {
        $key = $this->prefix . '_a';
        $this->repo->set($key, 'hello');

        $result = $this->repo->get($key);
        $this->assertSame('hello', $result);
    }

    public function testSetUpdatesExistingKey(): void
    {
        $key = $this->prefix . '_a';
        $this->repo->set($key, 'first');
        $this->repo->set($key, 'second');

        $result = $this->repo->get($key);
        $this->assertSame('second', $result);
    }

    public function testSetAcceptsNullValue(): void
    {
        $key = $this->prefix . '_a';
        $this->repo->set($key, 'initial');
        $this->repo->set($key, null);

        $result = $this->repo->get($key, 'default');
        $this->assertNull($result);
    }

    public function testAllReturnsAllSettings(): void
    {
        $this->repo->set($this->prefix . '_a', 'val-a');
        $this->repo->set($this->prefix . '_b', 'val-b');

        $all = $this->repo->all();

        $this->assertIsArray($all);
        $this->assertArrayHasKey($this->prefix . '_a', $all);
        $this->assertArrayHasKey($this->prefix . '_b', $all);
        $this->assertSame('val-a', $all[$this->prefix . '_a']);
        $this->assertSame('val-b', $all[$this->prefix . '_b']);
    }
}
