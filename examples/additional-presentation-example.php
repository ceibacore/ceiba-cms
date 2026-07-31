<?php
/**
 * EJEMPLO: Usando BannerRenderer, BreadcrumbBuilder, NotificationPresenter
 */

declare(strict_types=1);

use LemurCms\Menu\Presentation\BannerRenderer;
use LemurCms\Menu\Presentation\BreadcrumbBuilder;
use LemurCms\Menu\Presentation\NotificationPresenter;

require_once __DIR__ . '/../bootstrap.php';

// ── BannerRenderer ──────────────────────────────────────────────────────────

$bannerRenderer = $container['presentation']['bannerRenderer'];

// Renderizar banners activos "above" (encima del menú)
$aboveBanners = $bannerRenderer->render('above');
echo $aboveBanners;

// Renderizar banners activos "below" con scheduling
$belowBanners = $bannerRenderer->renderScheduled('below');
echo $belowBanners;

// ── BreadcrumbBuilder ───────────────────────────────────────────────────────

$breadcrumbs = $container['presentation']['breadcrumbBuilder'];

// Construir breadcrumbs dinámicamente
$breadcrumbs->reset()
    ->home('/')
    ->add('Products', '/products', 'bi bi-box')
    ->add('Electronics', '/products/electronics')
    ->current('Smart Watch');

// Renderizar como HTML Bootstrap 5
$breadcrumbsHtml = $breadcrumbs->render();
echo $breadcrumbsHtml;

// Obtener como array para procesar
$breadcrumbsArray = $breadcrumbs->toArray();
// [
//     ['label' => 'Home', 'url' => '/', 'icon' => 'bi bi-house', 'active' => false],
//     ['label' => 'Products', 'url' => '/products', 'icon' => 'bi bi-box', 'active' => false],
//     ['label' => 'Electronics', 'url' => '/products/electronics', 'icon' => null, 'active' => false],
//     ['label' => 'Smart Watch', 'url' => null, 'icon' => null, 'active' => true],
// ]

// ── NotificationPresenter ────────────────────────────────────────────────────

// Requiere sesión activa
session_start();
$notifications = $container['presentation']['notificationPresenter'];

// Agregar notificaciones
$notifications
    ->success('Producto agregado al carrito', 'Éxito')
    ->info('El envío tarda 2-3 días');

// O en forma individual
$notifications->error('Credencial inválida', 'Error de login');
$notifications->warning('Stock bajo del producto');

// Renderizar (render con clear=true genera flash messages)
$notificationsHtml = $notifications->render(true);
echo $notificationsHtml;

// Verificar si hay errores sin renderizar
if ($notifications->hasType('error')) {
    $errors = $notifications->ofType('error');
    // Procesar errores...
}

// ── Uso en controladores ────────────────────────────────────────────────────

// Al guardar página
try {
    $createPage = $container['useCases']['createPage'];
    $pageId = $createPage->execute($data);
    
    // Agregar notificación de éxito
    $notifications->success('Página creada exitosamente', 'OK');
    
} catch (\Exception $e) {
    // Agregar notificación de error
    $notifications->error($e->getMessage(), 'Error');
}

// Renderizar en plantilla
?>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <!-- Banners above -->
        <?php echo $aboveBanners; ?>
        
        <!-- Navbar content -->
    </nav>

    <!-- Breadcrumbs -->
    <?php echo $breadcrumbsHtml; ?>

    <!-- Notifications -->
    <div class="container mt-4">
        <?php echo $notificationsHtml; ?>
    </div>

    <!-- Banners below -->
    <?php echo $belowBanners; ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
