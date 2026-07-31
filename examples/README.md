# Menu System Examples

## 1. Navbar Rendering with Caching

File: `navbar-example.php`

```php
// Get the GetNavbar use case
$getNavbar = $container['useCases']['getNavbar'];

// Renders menu from database with Bootstrap 5 CSS
// Caches the HTML for 1 hour
$navbarHtml = $getNavbar->execute('main', $_SERVER['REQUEST_URI']);
```

Features:
- ✅ Automatic caching of rendered HTML
- ✅ Active link detection
- ✅ Bootstrap 5 classes
- ✅ Icon support (FontAwesome, Bootstrap Icons)
- ✅ Dropdown menus
- ✅ Mega menus with columns

## 2. Programmatic Menu Building

File: `builder-example.php`

```php
use LemurCms\Menu\Presentation\LemurMenuBuilder;

$builder = new LemurMenuBuilder();
$menus = $builder
    ->menu('main', 'Main Menu')
    ->item('/', 'Home', ['icon' => 'bi bi-house'])
    ->dropdown('Services', [...])
    ->mega('Products', [...])
    ->build();
```

## 3. Direct HTML Rendering

```php
use LemurCms\Menu\Presentation\LemurMenuRenderer;

$renderer = new LemurMenuRenderer('/current-url');
$html = $renderer->render($menuItems);
```

## Bootstrap 5 Classes Used

| Element       | Classes                                         |
| ------------- | ----------------------------------------------- |
| Navbar        | `navbar navbar-expand-lg navbar-light bg-light` |
| Nav Items     | `nav-item`                                      |
| Links         | `nav-link`                                      |
| Dropdowns     | `dropdown dropdown-toggle`                      |
| Dropdown Menu | `dropdown-menu`                                 |
| Dropdown Item | `dropdown-item`                                 |
| Mega Menu     | `mega-menu dropdown-menu p-3 row`               |
| Icons         | `bi bi-*` (Bootstrap Icons)                     |
| Active State  | `active`                                        |

## Caching

Cache files are stored in: `storage/cache/menus/`

Cache TTL: 3600 seconds (1 hour) by default

Clear cache:
```php
$getNavbar->clearCache('main');
```

## Data Structure

Menu tree format:
```php
[
    [
        'label' => 'Home',
        'url' => '/',
        'type' => 'link|dropdown|mega|button|divider',
        'target' => '_self|_blank',
        'icon' => 'bi bi-house',
        'css_class' => 'custom-class',
        'sort_order' => 0,
        'status' => 1,
        'children' => [/* nested items */],
        'mega' => [ /* mega menu structure */ ]
    ]
]
```
