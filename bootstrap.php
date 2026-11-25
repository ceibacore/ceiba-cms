<?php
declare(strict_types=1);

/**
 * Ceiba CMS Bootstrap — manual dependency injection.
 *
 * Loads bootstrap/*.php in order, in this file's scope (each part uses the variables of the previous ones), and
 * returns the container built by the last one. Split to keep every file under 200 lines.
 */

foreach (['00-environment', '10-classes-core', '11-classes-pagebuilder', '12-classes-data-sources', '20-database', '30-use-cases', '40-services', '45-design', '46-media', '47-site-parts', '48-data-sources'] as $part) {
    require __DIR__ . "/bootstrap/{$part}.php";
}

return require __DIR__ . '/bootstrap/50-container.php';
