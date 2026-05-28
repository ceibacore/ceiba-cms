# Lemur CMS API Documentation

The `lemur-cms` package exposes several controllers providing a complete API for managing Pages, Menus, Templates, and Component Definitions.

## Base URL
Since this package is typically integrated into a host Laravel application (e.g., `lemur-server-dashboard`), the actual routing prefix will depend on the host application's configuration.

---

## Laravel Integration

### 1. Registering the Package

In your Laravel `AppServiceProvider` or a dedicated `CmsServiceProvider`, bootstrap the CMS container and bind the use cases as singletons:

```php
// app/Providers/CmsServiceProvider.php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use LemurCms\Page\Application\ListPages;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\GetPageBySlug;
use LemurCms\Menu\Application\GetNavbar;
use LemurCms\Page\Infrastructure\LemurDbPageRepository;
use LemurCms\Menu\Infrastructure\LemurDbMenuRepository;

class CmsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(LemurDbPageRepository::class, fn() =>
            new LemurDbPageRepository(\LemurDB::getInstance([
                'driver'   => config('lemur-cms.db.driver', 'mysql'),
                'host'     => config('lemur-cms.db.host'),
                'db'       => config('lemur-cms.db.database'),
                'username' => config('lemur-cms.db.username'),
                'password' => config('lemur-cms.db.password'),
                'prefix'   => config('lemur-cms.db.prefix', 'cms_'),
            ]))
        );

        $this->app->singleton(ListPages::class, fn($app) =>
            new ListPages($app->make(LemurDbPageRepository::class))
        );

        $this->app->singleton(CreatePage::class, fn($app) =>
            new CreatePage($app->make(LemurDbPageRepository::class))
        );

        $this->app->singleton(GetPageBySlug::class, fn($app) =>
            new GetPageBySlug($app->make(LemurDbPageRepository::class))
        );

        $this->app->singleton(GetNavbar::class, fn($app) =>
            new GetNavbar(
                $app->make(LemurDbMenuRepository::class),
                new \LemurCms\Menu\Presentation\LemurMenuRenderer(),
                new \LemurCms\Menu\Presentation\LemurMenuCache(base_path())
            )
        );
    }
}
```

Register it in `bootstrap/providers.php` (Laravel 11+) or `config/app.php`:

```php
// bootstrap/providers.php
return [
    App\Providers\CmsServiceProvider::class,
];
```

---

### 2. Exposing CMS Routes in Laravel

Mount the CMS controllers inside a protected route group:

```php
// routes/web.php
use LemurCms\Http\Controllers\ComponentDefinitionController;
use App\Http\Controllers\Admin\CmsPageController;
use App\Http\Controllers\Admin\CmsMenuController;

Route::middleware(['auth', 'verified', 'can:manage-cms'])
    ->prefix('admin/cms')
    ->name('admin.cms.')
    ->group(function () {

        // Pages
        Route::get('/pages',              [CmsPageController::class, 'index'])->name('pages');
        Route::post('/pages',             [CmsPageController::class, 'store'])->name('pages.store');
        Route::put('/pages/{id}',         [CmsPageController::class, 'update'])->name('pages.update');
        Route::post('/pages/{id}/publish',[CmsPageController::class, 'publish'])->name('pages.publish');
        Route::delete('/pages/{id}',      [CmsPageController::class, 'destroy'])->name('pages.destroy');

        // Menus
        Route::get('/menus/{slug}',           [CmsMenuController::class, 'show'])->name('menus.show');
        Route::post('/menus/items',           [CmsMenuController::class, 'store'])->name('menus.items.store');
        Route::put('/menus/items/{id}',       [CmsMenuController::class, 'update'])->name('menus.items.update');
        Route::delete('/menus/items/{id}',    [CmsMenuController::class, 'destroy'])->name('menus.items.destroy');

        // Component catalogue (read-only)
        Route::get('/component-definitions', [ComponentDefinitionController::class, 'index'])
            ->name('component-definitions.index');
    });
```

---

### 3. Wrapping Use Cases in a Laravel Service

Inject CMS use cases directly into your Laravel services instead of going through HTTP:

```php
// app/Services/CmsPageService.php
namespace App\Services;

use LemurCms\Page\Application\ListPages;
use LemurCms\Page\Application\CreatePage;
use LemurCms\Page\Application\PublishPage;

class CmsPageService
{
    public function __construct(
        private readonly ListPages  $listPages,
        private readonly CreatePage $createPage,
        private readonly PublishPage $publishPage,
    ) {}

    public function getPaginatedPages(int $perPage = 20, int $page = 1): array
    {
        $offset = ($page - 1) * $perPage;
        return $this->listPages->execute($perPage, $offset);
    }

    public function createAndPublish(array $data): string
    {
        $pageId = $this->createPage->execute($data);
        $this->publishPage->execute($pageId);
        return $pageId;
    }
}
```

Usage in a controller:

```php
// app/Http/Controllers/Admin/CmsPageController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CmsPageService;
use Illuminate\Http\Request;

class CmsPageController extends Controller
{
    public function __construct(private readonly CmsPageService $pages) {}

    public function index(): \Illuminate\View\View
    {
        $pages = $this->pages->getPaginatedPages(perPage: 15, page: request()->integer('page', 1));
        return view('admin.cms.pages.index', compact('pages'));
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'slug'    => 'required|string|max:255',
            'title'   => 'required|string|max:255',
            'content' => 'required|array',
        ]);

        $this->pages->createAndPublish($validated);

        return redirect()->route('admin.cms.pages')->with('success', 'Page published.');
    }
}
```

---

### 4. Rendering a CMS Page in a Blade View

```php
// routes/web.php  (public-facing)
use LemurCms\Http\Controllers\PageRenderController;

Route::get('/pages/{slug}', [PageRenderController::class, 'show'])
    ->where('slug', '[a-z0-9\-]+')
    ->name('cms.page');
```

Or from a Blade template, embed the rendered HTML via the use case directly:

```blade
{{-- resources/views/layouts/app.blade.php --}}
@inject('getPageBySlug', \LemurCms\Page\Application\GetPageBySlug::class)

@php
    $page = $getPageBySlug->execute($slug ?? 'home');
@endphp

{!! $page?->renderedHtml ?? '' !!}
```

---

### 5. Rendering the Navigation Menu in Blade

```blade
{{-- resources/views/components/navbar.blade.php --}}
@inject('getNavbar', \LemurCms\Menu\Application\GetNavbar::class)

{!! $getNavbar->execute('main-nav') !!}
```

---

## Use Cases

### UC-1: Content Editor Creates and Publishes a Landing Page

```
1. Editor opens /admin/cms/pages → index() lists existing pages
2. Editor clicks "New page" → form submits POST /admin/cms/pages
3. CmsPageService::createPage() stores the page (status: draft)
4. Editor clicks "Publish" → POST /admin/cms/pages/{id}/publish
5. publishPage->execute($id) sets status = published
6. Visitors load GET /pages/landing-page → PageRenderController renders HTML
```

### UC-2: White-Label Partner Customises the Main Navigation

```
1. Partner authenticates as wl.partner role
2. POST /admin/cms/menus/items  →  createMenuItem->execute($data)
3. PUT  /admin/cms/menus/items/{id}  →  updateMenuItem->execute($id, $data)
4. Blade layout calls $getNavbar->execute('main-nav')
5. LemurMenuCache serves the HTML; cache is busted via POST /admin/cms/cache/menus/main-nav/clear
```

### UC-3: Developer Seeds a Page Builder Template

```php
// database/seeders/CmsTemplateSeeder.php
use LemurCms\PageBuilder\Application\CreateTemplate;

class CmsTemplateSeeder extends Seeder
{
    public function __construct(private readonly CreateTemplate $createTemplate) {}

    public function run(): void
    {
        $this->createTemplate->execute([
            'name' => 'Hero + Features',
            'tree' => [
                ['type' => 'hero',     'props' => ['title' => 'Welcome', 'cta' => 'Get started']],
                ['type' => 'features', 'props' => ['columns' => 3]],
            ],
        ]);
    }
}
```

### UC-4: API Consumer Fetches Pages via HTTP (headless / decoupled frontend)

```javascript
// Fetch pages from a decoupled frontend (e.g., Next.js)
const response = await fetch('https://your-app.test/api/pages?limit=10&offset=0', {
  headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
});

const { data } = await response.json();
// data.pages → array of page objects
// data.count → total pages
```

---

---

## 1. Pages API (`PageController`)

Manages the creation, retrieval, updating, and deletion of CMS Pages.

### Endpoints

- **`GET /pages`**
  - **Description**: List all pages.
  - **Query Parameters**:
    - `limit` (default: 20)
    - `offset` (default: 0)
  - **Response**: `{ success: true, message: "Pages retrieved", data: { pages: [...], count: X } }`

- **`GET /pages/{id}`**
  - **Description**: Retrieve a specific page by its ID.
  - **Response**: `{ success: true, message: "Page retrieved", data: { ...page } }`
  - **Errors**: `404 Not Found` if page does not exist.

- **`POST /pages`**
  - **Description**: Create a new page.
  - **Body Payload**:
    - `slug` (string, required, max 255)
    - `title` (string, required, max 255)
    - `content` (array, required)
  - **Response**: `201 Created` with `{ success: true, message: "Page created", data: { id: "uuid" } }`

- **`PUT/PATCH /pages/{id}`**
  - **Description**: Update an existing page.
  - **Body Payload**: Same as POST.
  - **Response**: `{ success: true, message: "Page updated", data: [] }`

- **`DELETE /pages/{id}`**
  - **Description**: Delete a page.
  - **Response**: `{ success: true, message: "Page deleted", data: [] }`

- **`POST /pages/{id}/publish`**
  - **Description**: Change a page's status to published.
  - **Response**: `{ success: true, message: "Page published", data: [] }`

---

## 2. Page Render API (`PageRenderController`)

Provides HTML rendering for published pages.

### Endpoints

- **`GET /pages/render/{slug}`**
  - **Description**: Retrieves and renders the HTML for a published page based on its slug.
  - **Response**: Returns raw HTML string (`text/html`).
  - **Errors**:
    - `404 Not Found` if the page doesn't exist or is not published.
    - `500 Internal Server Error` if a rendering error occurs.

---

## 3. Menus API (`MenuController`)

Manages the creation, retrieval, and updating of Navigation Menus and their items.

### Endpoints

- **`GET /menus/{slug}`**
  - **Description**: Retrieve the rendered HTML for a specific menu by its slug.
  - **Response**: `{ success: true, message: "Menu retrieved", data: { html: "<nav>...</nav>" } }`

- **`POST /menus`**
  - **Description**: Create a new menu item.
  - **Body Payload**: (Specifics depend on Menu Application logic).
  - **Response**: `201 Created` with `{ success: true, message: "Menu item created", data: { id: "uuid" } }`

- **`PUT/PATCH /menus/{id}`**
  - **Description**: Update a menu item.
  - **Response**: `{ success: true, message: "Menu item updated", data: [] }`

- **`DELETE /menus/{id}`**
  - **Description**: Delete a menu item.
  - **Response**: `{ success: true, message: "Menu item deleted", data: [] }`

---

## 4. Templates API (`TemplateController`)

Manages Page Templates used in the system.

### Endpoints

- **`GET /templates`**
  - **Description**: List all templates.
  - **Response**: `{ success: true, message: "Templates retrieved", data: { templates: [...], count: X } }`

- **`GET /templates/{id}`**
  - **Description**: Retrieve a specific template.
  - **Response**: `{ success: true, message: "Template retrieved", data: { ...template } }`

- **`POST /templates`**
  - **Description**: Create a new template.
  - **Body Payload**:
    - `name` (string, required, max 255)
    - `tree` (array, required)
  - **Response**: `201 Created` with `{ success: true, message: "Template saved", data: { id: "uuid" } }`

- **`DELETE /templates/{id}`**
  - **Description**: Delete a template.
  - **Response**: `{ success: true, message: "Template deleted", data: [] }`

---

## 5. Component Definitions API (`ComponentDefinitionController`)

Provides a catalogue of all available UI components for the Page Builder.

### Endpoints

- **`GET /component-definitions`**
  - **Description**: Retrieve the full catalogue of registered component definitions (types, labels, schemas, default properties).
  - **Response**: `{ success: true, message: "Component definitions retrieved", data: [ { type: "text", label: "Texto", ... }, ... ] }`

---

## 6. Cache Management (`CacheController`)

Handles clearing of internal caches.

### Endpoints

- **`POST /cache/clear`** (Or equivalent route)
  - **Description**: Flushes all CMS caches.
  - **Response**: `{ success: true, message: "Cache cleared", data: [] }`

- **`POST /cache/menus/{slug}/clear`** (Or equivalent route)
  - **Description**: Clears the cache for a specific rendered menu.
  - **Response**: `{ success: true, message: "Menu cache cleared for: {slug}", data: [] }`

---

## Response Format (BaseController)

All API endpoints (except the Render API) return a standard JSON structure based on `BaseController`:

**Success Response (200, 201)**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Action completed successfully"
}
```

**Error Response (400, 404, 500)**:
```json
{
  "success": false,
  "error": "Error description message"
}
```
