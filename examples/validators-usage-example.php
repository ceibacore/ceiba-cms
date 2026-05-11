<?php
/**
 * EJEMPLO: Cómo integrar Validators en Use Cases
 * 
 * Los validadores deben ser llamados antes de procesar datos en los use cases.
 */

declare(strict_types=1);

namespace LemurCms\Menu\Application;

use LemurCms\Menu\Domain\Repository\MenuRepositoryInterface;
use LemurCms\Support\Validators\MenuValidator;
use LemurCms\Support\Exceptions\InvalidMenuException;

/**
 * Versión mejorada de CreateMenuItem con validación
 */
class CreateMenuItemWithValidation
{
    public function __construct(private MenuRepositoryInterface $repository)
    {
    }

    /**
     * @param array<string, mixed> $data
     * @return int ID del item creado
     * @throws InvalidMenuException
     */
    public function execute(array $data): int
    {
        // 1. VALIDAR datos
        MenuValidator::validateMenuItem($data);

        // 2. PROCESAR datos
        // Aquí podrías limpiar/normalizar datos usando StringHelper
        $data['url'] = \LemurCms\Support\Helpers\StringHelper::sanitizeUrl($data['url']);

        // 3. GUARDAR
        return $this->repository->saveMenuItem($data);
    }
}

/**
 * Versión mejorada de CreateUser con validación
 */
class CreateUserWithValidation
{
    public function __construct(private \LemurCms\Auth\Domain\Repository\UserRepositoryInterface $repository)
    {
    }

    /**
     * @param array<string, mixed> $data
     * @return int ID del usuario creado
     * @throws \LemurCms\Support\Exceptions\InvalidUserException
     */
    public function execute(array $data): int
    {
        // 1. VALIDAR datos
        \LemurCms\Support\Validators\UserValidator::validateCreateUser($data);

        // 2. PREPARAR datos
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

        // 3. GUARDAR
        return $this->repository->save($data);
    }
}

/**
 * Versión mejorada de CreatePage con validación y slugify automático
 */
class CreatePageWithValidation
{
    public function __construct(private \LemurCms\Page\Domain\PageRepositoryInterface $repository)
    {
    }

    /**
     * @param array<string, mixed> $data
     * @return int ID de la página creada
     * @throws \LemurCms\Support\Exceptions\InvalidMenuException
     */
    public function execute(array $data): int
    {
        // 1. VALIDAR datos
        \LemurCms\Support\Validators\PageValidator::validatePage($data);

        // 2. AUTO-GENERAR slug si no existe
        if (empty($data['slug'])) {
            $data['slug'] = \LemurCms\Support\Helpers\StringHelper::slugify($data['title']);
        }

        // 3. AUTO-ASIGNAR fecha de creación
        $data['created_at'] = $data['created_at'] ?? \LemurCms\Support\Helpers\DateHelper::now();

        // 4. GUARDAR
        return $this->repository->save($data);
    }
}

/**
 * Uso en aplicación:
 */

// $createMenuItem = new CreateMenuItemWithValidation($menuRepository);
// try {
//     $itemId = $createMenuItem->execute([
//         'label' => 'About',
//         'url' => '/about',
//         'type' => 'link',
//     ]);
// } catch (InvalidMenuException $e) {
//     // Error: $e->getMessage()
// }

// $createUser = new CreateUserWithValidation($userRepository);
// try {
//     $userId = $createUser->execute([
//         'email' => 'john@example.com',
//         'name' => 'John Doe',
//         'password' => 'SecurePass123',
//     ]);
// } catch (InvalidUserException $e) {
//     // Error: $e->getMessage()
// }
