<?php
/**
 * EXAMPLE: Using LemurMenuRenderer with Bootstrap 5
 * 
 * This example demonstrates the complete menu system workflow:
 * 1. Retrieve menu from database via repository
 * 2. Cache the rendered HTML
 * 3. Render as Bootstrap 5 navbar
 */

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

// Get use case from DI container
$getNavbar = $container['useCases']['getNavbar'];

// 1. Simple usage - get rendered navbar with caching
$navbarHtml = $getNavbar->execute('main', $_SERVER['REQUEST_URI']);

// 2. Output in template
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu Example</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Lemur CMS</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <?php echo $navbarHtml; ?>
            </div>
        </div>
    </nav>

    <main class="container mt-4">
        <!-- Page content -->
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
