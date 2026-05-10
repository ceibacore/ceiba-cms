<?php
/**
 * EJEMPLO: Usando Helpers en aplicación
 */

declare(strict_types=1);

use LemurCms\Support\Helpers\StringHelper;
use LemurCms\Support\Helpers\DateHelper;
use LemurCms\Support\Helpers\ArrayHelper;

// ── StringHelper ─────────────────────────────────────────────────────────────

// 1. Slugify - Convertir títulos a URLs amigables
$title = 'My Amazing Blog Post!';
$slug = StringHelper::slugify($title);
echo $slug; // 'my-amazing-blog-post'

// 2. Sanitizar URLs
$userUrl = '/about';
$safeUrl = StringHelper::sanitizeUrl($userUrl);
echo $safeUrl; // '/about'

// 3. Truncar HTML
$longText = 'This is a very long article about something important...';
$preview = StringHelper::htmlTruncate($longText, 30);
echo $preview; // 'This is a very long article a...'

// 4. Hash ID para URLs
$itemId = 123;
$hashedId = StringHelper::hashId($itemId);
$restoredId = StringHelper::unhashId($hashedId);
echo $restoredId; // 123

// ── DateHelper ──────────────────────────────────────────────────────────────

// 1. Fecha actual
$now = DateHelper::now();
echo $now; // '2026-05-10 14:30:00'

// 2. Detectar futuro/pasado
$publishDate = '2026-06-01 10:00:00';
if (DateHelper::isFuture($publishDate)) {
    echo 'Post será publicado en el futuro';
}

// 3. Sumar días
$deadline = DateHelper::addDays(DateHelper::now(), 7);
echo $deadline; // 7 días desde ahora

// 4. Diferencia entre fechas
$created = '2026-05-01';
$today = '2026-05-10';
$days = DateHelper::daysDifference($created, $today);
echo "Hace $days días"; // 'Hace 9 días'

// ── ArrayHelper ─────────────────────────────────────────────────────────────

// 1. Obtener valor con dot notation
$user = [
    'id' => 1,
    'profile' => [
        'name' => 'John Doe',
        'email' => 'john@example.com'
    ]
];

$name = ArrayHelper::get($user, 'profile.name');
echo $name; // 'John Doe'

$default = ArrayHelper::get($user, 'profile.phone', 'No phone');
echo $default; // 'No phone'

// 2. Establecer valor con dot notation
$data = [];
ArrayHelper::set($data, 'user.profile.name', 'Jane Doe');
// $data = ['user' => ['profile' => ['name' => 'Jane Doe']]]

// 3. Filtrar campos (whitelist)
$userData = [
    'id' => 1,
    'name' => 'John',
    'email' => 'john@example.com',
    'password' => 'secret', // No queremos esto
    'role' => 'admin'
];

$safe = ArrayHelper::only($userData, ['id', 'name', 'email']);
// ['id' => 1, 'name' => 'John', 'email' => 'john@example.com']

// 4. Excluir campos sensibles
$public = ArrayHelper::except($userData, ['password']);
// Excluye 'password' del array

// 5. Agrupar array
$posts = [
    ['status' => 'published', 'title' => 'First Post'],
    ['status' => 'draft', 'title' => 'Second Post'],
    ['status' => 'published', 'title' => 'Third Post'],
];

$grouped = ArrayHelper::groupBy($posts, 'status');
// ['published' => [...], 'draft' => [...]]

// 6. Mapear array por ID
$users = [
    ['id' => 1, 'name' => 'John'],
    ['id' => 2, 'name' => 'Jane'],
];

$keyed = ArrayHelper::keyBy($users, 'id');
// [1 => ['id' => 1, 'name' => 'John'], 2 => [...]]
echo $keyed[1]['name']; // 'John'

// ── Combinaciones útiles ─────────────────────────────────────────────────────

// Crear página con slug auto-generado y timestamp
$pageData = [
    'title' => 'Welcome to Our Site!',
    'content' => 'Some content...',
];

$pageData['slug'] = StringHelper::slugify($pageData['title']);
$pageData['created_at'] = DateHelper::now();
$pageData['published_at'] = DateHelper::addDays(DateHelper::now(), 3);

// Limpiar datos del usuario antes de guardar
$formData = [
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => 'Secret123',
    'remember_me' => '1', // No queremos en BD
    'csrf_token' => 'xxx', // No queremos en BD
];

$cleanData = ArrayHelper::only($formData, ['name', 'email', 'password']);
