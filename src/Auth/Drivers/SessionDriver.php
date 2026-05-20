<?php
declare(strict_types=1);

namespace LemurCms\Auth\Drivers;

use LemurDB;
use LemurCms\Auth\Contracts\AuthDriverInterface;

class SessionDriver implements AuthDriverInterface
{
    private const SESSION_KEY = 'cms_access_id';

    private ?array $userCache = null;

    public function __construct(private readonly LemurDB $db)
    {
        if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
            session_start();
        }
    }

    public function authenticate(array $credentials): bool
    {
        $email = $credentials['email'] ?? '';
        $password = $credentials['password'] ?? '';

        if (empty($email) || empty($password)) {
            return false;
        }

        $user = $this->db->query('access')
            ->where(['email' => $email, 'is_active' => 1])
            ->first();

        if ($user && password_verify($password, $user['password_hash'] ?? '')) {
            $_SESSION[self::SESSION_KEY] = $user['id'];
            
            // Update last login
            $this->db->query('access')
                ->where(['id' => $user['id']])
                ->update(['last_login_at' => date('Y-m-d H:i:s')]);
            
            $this->userCache = $user;
            return true;
        }

        return false;
    }

    public function check(): bool
    {
        return isset($_SESSION[self::SESSION_KEY]);
    }

    public function id(): ?string
    {
        return $_SESSION[self::SESSION_KEY] ?? null;
    }

    public function user(): ?array
    {
        if (!$this->check()) {
            return null;
        }

        if ($this->userCache === null) {
            $this->userCache = $this->db->query('access')
                ->where(['id' => $this->id(), 'is_active' => 1])
                ->first();
                
            if (!$this->userCache) {
                $this->logout(); // Invalid session (user deleted or deactivated)
            }
        }

        return $this->userCache;
    }

    public function logout(): void
    {
        unset($_SESSION[self::SESSION_KEY]);
        $this->userCache = null;
    }
}
