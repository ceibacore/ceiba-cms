<?php

declare(strict_types=1);

namespace LemurCms\Commands;

class CreateUserCommand extends Command
{
    protected string $signature = 'user:create';
    protected string $description = 'Create a new user';

    public function __construct(private \LemurCms\Auth\Domain\UserRepositoryInterface $userRepository)
    {
    }

    public function handle(): int
    {
        $this->info('Creating new user...');

        try {
            $name = trim((string)readline('Name: '));
            if (empty($name)) {
                $this->error('Name is required');
                return 1;
            }

            $email = trim((string)readline('Email: '));
            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->error('Valid email is required');
                return 1;
            }

            // Check if user exists
            $existing = $this->userRepository->findByEmail($email);
            if ($existing) {
                $this->error('User with this email already exists');
                return 1;
            }

            $password = trim((string)readline('Password: '));
            if (strlen($password) < 8) {
                $this->error('Password must be at least 8 characters');
                return 1;
            }

            $userId = $this->userRepository->save([
                'name' => $name,
                'email' => $email,
                'password_hash' => password_hash($password, PASSWORD_BCRYPT),
                'is_active' => 1,
            ]);

            $this->info("User created successfully with ID: $userId");
            return 0;
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
