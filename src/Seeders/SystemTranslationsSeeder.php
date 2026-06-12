<?php
declare(strict_types=1);

namespace LemurCms\Seeders;

use LemurCms\Seeder\CmsSeeder;
use LemurCms\Support\Helpers\UuidHelper;

class SystemTranslationsSeeder extends CmsSeeder
{
    public function run(): void
    {
        // 1. Create Default Languages
        $englishId = $this->firstOrCreate('languages',
            ['code' => 'en'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'English',
                'is_active' => 1,
                'is_default' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $spanishId = $this->firstOrCreate('languages',
            ['code' => 'es'],
            [
                'id' => UuidHelper::v4(),
                'label' => 'Español',
                'is_active' => 1,
                'is_default' => 0,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        $now = date('Y-m-d H:i:s');

        // 2. Call Catalog Functions
        $englishCatalog = $this->getEnglishCatalog();
        $spanishCatalog = $this->getSpanishCatalog();

        // 3. Insert English Translations
        foreach ($englishCatalog as $group => $categories) {
            foreach ($categories as $category => $items) {
                foreach ($items as $key => $value) {
                    $compositeKey = "{$category}.{$key}";
                    $this->firstOrCreate('translations',
                        [
                            'language_id' => $englishId,
                            'group' => $group,
                            'key' => $compositeKey
                        ],
                        [
                            'id' => UuidHelper::v4(),
                            'value' => $value,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]
                    );
                }
            }
        }

        // 4. Insert Spanish Translations
        foreach ($spanishCatalog as $group => $categories) {
            foreach ($categories as $category => $items) {
                foreach ($items as $key => $value) {
                    $compositeKey = "{$category}.{$key}";
                    $this->firstOrCreate('translations',
                        [
                            'language_id' => $spanishId,
                            'group' => $group,
                            'key' => $compositeKey
                        ],
                        [
                            'id' => UuidHelper::v4(),
                            'value' => $value,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]
                    );
                }
            }
        }
    }

    private function getEnglishCatalog(): array
    {
        return [
            'errors' => [
                'menu' => [
                    'missing_label' => 'Menu item label is required and must not be empty',
                    'missing_url' => 'Menu item URL is required',
                    'invalid_type' => 'Invalid menu item type "{type}". Valid types: {valid_types}',
                    'missing_menu_slug' => 'Menu slug is required',
                    'missing_menu_name' => 'Menu name is required',
                    'duplicate_menu_slug' => 'Menu with slug "{slug}" already exists'
                ],
                'permission' => [
                    'denied' => 'Permission "{permission}" denied',
                    'role_not_found' => 'Role with ID {role_id} not found',
                    'missing_permission' => 'Permission "{slug}" does not exist'
                ],
                'user' => [
                    'missing_email' => 'User email is required',
                    'invalid_email' => 'Invalid email format: {email}',
                    'missing_password' => 'User password is required',
                    'weak_password' => 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
                    'email_exists' => 'User with email "{email}" already exists',
                    'not_found' => 'User with ID {id} not found',
                    'new_password_required' => 'New password is required'
                ],
                'page' => [
                    'not_found_by_id' => 'Page with ID {id} not found',
                    'not_found_by_slug' => 'Page with slug "{slug}" not found',
                    'none_published' => 'No published pages found',
                    'title_required' => 'Page title is required and must be a string',
                    'title_max_length' => 'Page title must not exceed 255 characters',
                    'slug_required' => 'Page slug is required and must be a string',
                    'slug_format' => 'Page slug must contain only alphanumeric characters and hyphens',
                    'content_required' => 'Page content is required',
                    'content_invalid_tree' => 'Invalid page tree: {errors}',
                    'content_malformed_json' => 'Page content is malformed JSON',
                    'content_json_array_object' => 'Page content JSON must be an array or object',
                    'content_invalid_format' => 'Page content must be a string or array',
                    'status_invalid' => 'Invalid page status "{status}". Valid: {valid_statuses}',
                    'publish_title_required' => 'Page must have a title to be published',
                    'publish_content_required' => 'Page must have content to be published'
                ],
                'layout' => [
                    'name_required' => 'Layout name is required and must be a string',
                    'name_max_length' => 'Layout name must not exceed 200 characters',
                    'menu_slug_string' => 'Layout menu_slug must be a string',
                    'menu_slug_max_length' => 'Layout menu_slug must not exceed 300 characters',
                    'palette_malformed_json' => 'Layout palette is malformed JSON',
                    'palette_decode_array' => 'Layout palette must decode to an array',
                    'palette_array_or_json' => 'Layout palette must be an array or JSON string',
                    'footer_tree_malformed_json' => 'Layout footer_tree is malformed JSON',
                    'footer_tree_array_or_json' => 'Layout footer_tree must be an array or JSON string',
                    'footer_tree_invalid' => 'Invalid layout footer_tree: {errors}'
                ],
                'template' => [
                    'name_required' => 'Template name is required and must be a string',
                    'name_max_length' => 'Template name must not exceed 200 characters',
                    'tree_required' => 'Template tree is required',
                    'tree_invalid' => 'Invalid template tree: {errors}',
                    'tree_malformed_json' => 'Template tree is malformed JSON',
                    'tree_json_array_object' => 'Template tree JSON must be an array or object',
                    'tree_invalid_format' => 'Template tree must be a string or array'
                ],
                'language' => [
                    'code_required' => 'Language code is required.',
                    'label_required' => 'Language label is required.',
                    'translations_array' => 'Translations must be an array.'
                ]
            ],
            'messages' => [
                'language' => [
                    'retrieved' => 'Languages retrieved',
                    'created' => 'Language created',
                    'updated' => 'Language updated',
                    'deleted' => 'Language deleted'
                ],
                'translation' => [
                    'retrieved' => 'Translations retrieved',
                    'updated' => 'Translations updated'
                ],
                'settings' => [
                    'retrieved' => 'Settings retrieved',
                    'updated' => 'Settings updated'
                ],
                'template' => [
                    'retrieved' => 'Templates retrieved',
                    'saved' => 'Template saved',
                    'deleted' => 'Template deleted'
                ],
                'reserved_path' => [
                    'added' => 'Reserved path added',
                    'removed' => 'Reserved path removed'
                ],
                'cache' => [
                    'cleared' => 'Cache cleared',
                    'menu_cleared' => 'Menu cache cleared for: {slug}'
                ]
            ]
        ];
    }

    private function getSpanishCatalog(): array
    {
        return [
            'errors' => [
                'menu' => [
                    'missing_label' => 'La etiqueta del elemento de menú es obligatoria y no puede estar vacía',
                    'missing_url' => 'La URL del elemento de menú es obligatoria',
                    'invalid_type' => 'Tipo de elemento de menú inválido "{type}". Tipos válidos: {valid_types}',
                    'missing_menu_slug' => 'El slug del menú es obligatorio',
                    'missing_menu_name' => 'El nombre del menú es obligatorio',
                    'duplicate_menu_slug' => 'Ya existe un menú con el slug "{slug}"'
                ],
                'permission' => [
                    'denied' => 'Permiso "{permission}" denegado',
                    'role_not_found' => 'Rol con ID {role_id} no encontrado',
                    'missing_permission' => 'El permiso "{slug}" no existe'
                ],
                'user' => [
                    'missing_email' => 'El correo electrónico del usuario es obligatorio',
                    'invalid_email' => 'Formato de correo electrónico inválido: {email}',
                    'missing_password' => 'La contraseña del usuario es obligatoria',
                    'weak_password' => 'La contraseña debe tener al menos 8 caracteres con mayúsculas, minúsculas y números',
                    'email_exists' => 'Ya existe un usuario con el correo electrónico "{email}"',
                    'not_found' => 'Usuario con ID {id} no encontrado',
                    'new_password_required' => 'La nueva contraseña es obligatoria'
                ],
                'page' => [
                    'not_found_by_id' => 'Página con ID {id} no encontrada',
                    'not_found_by_slug' => 'Página con slug "{slug}" no encontrada',
                    'none_published' => 'No se encontraron páginas publicadas',
                    'title_required' => 'El título de la página es obligatorio y debe ser una cadena de texto',
                    'title_max_length' => 'El título de la página no debe exceder los 255 caracteres',
                    'slug_required' => 'El slug de la página es obligatorio y debe ser una cadena de texto',
                    'slug_format' => 'El slug de la página solo debe contener caracteres alfanuméricos y guiones',
                    'content_required' => 'El contenido de la página es obligatorio',
                    'content_invalid_tree' => 'Árbol de página inválido: {errors}',
                    'content_malformed_json' => 'El contenido de la página es un JSON malformado',
                    'content_json_array_object' => 'El JSON del contenido de la página debe ser un array u objeto',
                    'content_invalid_format' => 'El contenido de la página debe ser una cadena de texto o un array',
                    'status_invalid' => 'Estado de página inválido "{status}". Válidos: {valid_statuses}',
                    'publish_title_required' => 'La página debe tener un título para ser publicada',
                    'publish_content_required' => 'La página debe tener contenido para ser publicada'
                ],
                'layout' => [
                    'name_required' => 'El nombre del layout es obligatorio y debe ser una cadena de texto',
                    'name_max_length' => 'El nombre del layout no debe exceder los 200 caracteres',
                    'menu_slug_string' => 'El menu_slug del layout debe ser una cadena de texto',
                    'menu_slug_max_length' => 'El menu_slug del layout no debe exceder los 300 caracteres',
                    'palette_malformed_json' => 'La paleta del layout es un JSON malformado',
                    'palette_decode_array' => 'La paleta del layout debe decodificarse como un array',
                    'palette_array_or_json' => 'La paleta del layout debe ser un array o una cadena JSON',
                    'footer_tree_malformed_json' => 'El footer_tree del layout es un JSON malformado',
                    'footer_tree_array_or_json' => 'El footer_tree del layout debe ser un array o una cadena JSON',
                    'footer_tree_invalid' => 'Footer_tree del layout inválido: {errors}'
                ],
                'template' => [
                    'name_required' => 'El nombre de la plantilla es obligatorio y debe ser una cadena de texto',
                    'name_max_length' => 'El nombre de la plantilla no debe exceder los 200 caracteres',
                    'tree_required' => 'El árbol de la plantilla es obligatorio',
                    'tree_invalid' => 'Árbol de plantilla inválido: {errors}',
                    'tree_malformed_json' => 'El árbol de la plantilla es un JSON malformado',
                    'tree_json_array_object' => 'El JSON del árbol de la plantilla debe ser un array u objeto',
                    'tree_invalid_format' => 'El árbol de la plantilla debe ser una cadena de texto o un array'
                ],
                'language' => [
                    'code_required' => 'El código del idioma es obligatorio.',
                    'label_required' => 'La etiqueta del idioma esatoria.',
                    'translations_array' => 'Las traducciones deben ser un array.'
                ]
            ],
            'messages' => [
                'language' => [
                    'retrieved' => 'Idiomas recuperados',
                    'created' => 'Idioma creado',
                    'updated' => 'Idioma actualizado',
                    'deleted' => 'Idioma eliminado'
                ],
                'translation' => [
                    'retrieved' => 'Traducciones recuperadas',
                    'updated' => 'Traducciones actualizadas'
                ],
                'settings' => [
                    'retrieved' => 'Ajustes recuperados',
                    'updated' => 'Ajustes actualizados'
                ],
                'template' => [
                    'retrieved' => 'Plantillas recuperadas',
                    'saved' => 'Plantilla guardada',
                    'deleted' => 'Plantilla eliminada'
                ],
                'reserved_path' => [
                    'added' => 'Ruta reservada añadida',
                    'removed' => 'Ruta reservada eliminada'
                ],
                'cache' => [
                    'cleared' => 'Caché limpiada',
                    'menu_cleared' => 'Caché de menú limpiada para: {slug}'
                ]
            ],
            'general' => [
                'actions' => [
                    'add' => 'Agregar',
                    'update' => 'Actualizar',
                    'back' => 'Volver',
                    'cancel' => 'Cancelar',
                    'save' => 'Guardar',
                    'create' => 'Crear',
                    'search' => 'Buscar',
                    'accept' => 'Aceptar',
                    'close' => 'Cerrar',
                    'next' => 'Siguiente',
                    'previous' => 'Anterior',
                    'yes' => 'Sí',
                    'no' => 'No',
                    'clear' => 'Limpiar',
                    'filter' => 'Filtrar',
                    'upload' => 'Subir',
                    'download' => 'Descargar',
                    'show' => 'Mostrar',
                    'hide' => 'Ocultar'
                ],
                'labels' => [
                    'name' => 'Nombre',
                    'description' => 'Descripción',
                    'status' => 'Estado',
                    'date' => 'Fecha',
                    'all' => 'Todos',
                    'filters' => 'Filtros',
                    'success' => 'Éxito',
                    'error' => 'Error',
                    'warning' => 'Advertencia',
                    'info' => 'Información',
                    'loading' => 'Cargando...',
                    'saving' => 'Guardando...',
                    'sending' => 'Enviando...',
                    'actions' => 'Acciones',
                    'type' => 'Tipo',
                    'active_fem' => 'Activa',
                    'inactive_fem' => 'Inactiva',
                    'revoked_fem' => 'Revocada',
                    'expired_fem' => 'Expirada',
                    'email' => 'Correo electrónico',
                    'password' => 'Contraseña',
                    'confirm_password' => 'Confirmar contraseña',
                    'new_password' => 'Nueva contraseña',
                    'current_password' => 'Contraseña actual',
                    'plan' => 'Plan',
                    'expires' => 'Expira',
                    'total' => 'Total',
                    'quantity' => 'Cantidad',
                    'price' => 'Precio'
                ]
            ],
            'dashboard' => [
                'branding' => [
                    'activar' => 'Activar',
                    'activar_como_logo' => 'Activar como logo principal',
                    'alto_px' => 'Alto (px)',
                    'ancho_px' => 'Ancho (px)',
                    'banner' => 'Banner',
                    'banner_eliminado_correctamente' => 'Banner eliminado correctamente',
                    'contenido_del_banner' => 'Contenido del banner',
                    'crear_banner' => 'Crear banner',
                    'crear_logo' => 'Crear logo',
                    'desactivar' => 'Desactivar',
                    'editar_banner' => 'Editar banner',
                    'editar_logo' => 'Editar logo',
                    'eliminar_banner' => 'Eliminar banner',
                    'eliminar_logo' => 'Eliminar logo',
                    'fin_opcional' => 'Fin (opcional)',
                    'guardando' => 'Guardando…',
                    'guardar_cambios' => 'Guardar cambios',
                    'inicio_opcional' => 'Inicio (opcional)',
                    'logo' => 'Logo',
                    'logo_de_mi' => 'Logo de Mi Empresa',
                    'logo_eliminado_correctamente' => 'Logo eliminado correctamente',
                    'mi_empresa' => 'Mi Empresa',
                    'no_hay_banners' => 'No hay banners configurados.',
                    'no_hay_logos' => 'No hay logos. Crea uno para empezar.',
                    'nombre_del_sitio' => 'Nombre del sitio',
                    'nuevo_banner' => 'Nuevo banner',
                    'nuevo_logo' => 'Nuevo logo',
                    'orden' => 'Orden',
                    'permite_cerrar' => 'Permite cerrar',
                    'posicin' => 'Posición',
                    'se_puede_cerrar' => 'Se puede cerrar',
                    'sin_imagen' => 'Sin imagen',
                    'texto_alternativo_alt' => 'Texto alternativo (alt)',
                    'texto_del_enlace' => 'Texto del enlace',
                    'url_del_enlace' => 'URL del enlace',
                    'url_imagen_dark' => 'URL imagen dark',
                    'url_imagen_mobile' => 'URL imagen mobile',
                    'url_imagen_principal' => 'URL imagen principal',
                    'ver_oferta' => 'Ver oferta',
                    'vista_previa_del' => 'Vista previa del banner…',
                    'eliminar_este_banner' => '¿Eliminar este banner?',
                    'eliminar_este_logo' => '¿Eliminar este logo?',
                    'arriba' => '▲ Arriba',
                    'encima_del_men' => '▲ Encima del menú',
                    'abajo' => '▼ Abajo',
                    'debajo_del_men' => '▼ Debajo del menú',
                    'activo' => '✓ Activo',
                    'versin_dark_disponible' => '🌙 Versión dark disponible',
                    'oferta_especial_20' => '🎉 Oferta especial: 20% de descuento este fin de semana',
                    'branding__logos' => '🎨 Branding — Logos & Banners',
                    'banners' => '📢 Banners',
                    'logos' => '🖼️ Logos',
                    'title' => 'CMS — Personalización y Branding',
                    'subtitle' => 'Configura la identidad visual, logotipos, favicon y los colores globales del portal público del CMS.',
                    'tabs.identity' => 'Identidad Visual',
                    'tabs.colors' => 'Paleta de Colores',
                    'identity.logo' => 'Logotipo principal',
                    'identity.logo_dark' => 'Logotipo para modo oscuro',
                    'identity.favicon' => 'Favicon del sitio',
                    'save_btn' => 'Guardar cambios',
                    'colors.section_title' => 'Colores de la plataforma',
                    'colors.primary' => 'Color Primario',
                    'colors.secondary' => 'Color Secundario',
                    'colors.background' => 'Color de Fondo',
                    'colors.text' => 'Color del Texto',
                    'colors.default_theme' => 'Estilo del tema predeterminado',
                    'colors.theme_light' => 'Claro',
                    'colors.theme_dark' => 'Oscuro'
                ],
                'dashboard' => [
                    'archivos_media' => 'Archivos media',
                    'banners_activos' => 'Banners activos',
                    'borradores' => 'Borradores',
                    'cms__panel' => 'CMS — Panel de Administración',
                    'gestiona_la_estructura' => 'Gestiona la estructura, el diseño y las etiquetas semánticas de tu sitio web.',
                    'items_de_men' => 'Items de menú',
                    'limpiar_cach_cms' => 'Limpiar caché CMS',
                    'logos_activos' => 'Logos activos',
                    'mens' => 'Menús',
                    'publicadas' => 'Publicadas',
                    'pginas_totales' => 'Páginas totales',
                    'rutas_bloqueadas' => 'Rutas bloqueadas',
                    'limpiar_toda_la' => '¿Limpiar toda la caché del CMS? Los menús se regenerarán al próximo acceso.',
                    'welcome' => 'Bienvenido, :name',
                    'wl_panel_title' => 'Panel de gestión White-Label · Lemur LMS',
                    'client_license' => 'Licencia cliente',
                    'client_partner' => 'CLIENTE PARTNER',
                    'license_managed_by' => 'Licencia gestionada por :partner',
                    'default_panel_title' => 'Panel de control · Lemur LMS',
                    'stats.active_licenses' => 'Licencias activas',
                    'stats.activations' => 'Activaciones',
                    'stats.current_plan' => 'Plan actual',
                    'stats.expires_at' => 'Expira en',
                    'stats.license_capacity' => 'Capacidad de licencias',
                    'stats.used' => 'usadas',
                    'stats.maximum' => 'máximo',
                    'warnings.near_limit' => '⚠️ Cerca del límite de capacidad.',
                    'clients.title' => 'Gestión de clientes',
                    'clients.desc' => 'Crea licencias On-Premise para tus clientes con verificación de correo.',
                    'clients.view_all' => 'Ver clientes',
                    'clients.single_client' => 'cliente',
                    'managed_license' => 'LICENCIA GESTIONADA',
                    'partner_responsible' => 'Partner responsable',
                    'support_notice' => 'Para soporte técnico o cambios en tu licencia, contacta a tu partner.',
                    'my_licenses.title' => 'Mis licencias',
                    'my_licenses.desc' => 'Gestiona tus licencias activas y verifica el estado de tus activaciones.',
                    'my_licenses.link' => 'Ver licencias',
                    'billing.title' => 'Facturación',
                    'billing.desc' => 'Revisa tu suscripción actual, descarga facturas y gestiona tus métodos de pago.',
                    'billing.link' => 'Ver facturación'
                ],
                'dynamicmoduleform' => [
                    'seleccionar' => '-- Seleccionar --',
                    'seleccionar_relacin' => '-- Seleccionar Relación --',
                    'aaaammdd_hhmmss_ej' => 'AAAA-MM-DD HH:MM:SS (ej. 2026-05-22 14:30:00)',
                    'editar_registro' => 'Editar Registro',
                    'error_en_el' => 'Error en el Servidor:',
                    'escribe_aqu' => 'Escribe aquí...',
                    'escribe_el_contenido' => 'Escribe el contenido aquí...',
                    'guardar_registro' => 'Guardar Registro',
                    'ingrese_en_formato' => 'Ingrese en formato YYYY-MM-DD HH:MM:SS',
                    'listado' => 'Listado',
                    'nuevo_registro' => 'Nuevo Registro',
                    'rellena_los_campos' => 'Rellena los campos definidos en el esquema del módulo.',
                    'vista_previa' => 'Vista previa',
                    'biblioteca' => '🖼️ Biblioteca',
                    'seleccionar_de_biblioteca' => '🖼️ Seleccionar de Biblioteca de Media'
                ],
                'dynamicmoduleindex' => [
                    'agregar_primer_registro' => 'Agregar primer registro',
                    'buscar_en_campos' => 'Buscar en campos indexados...',
                    'creado' => 'Creado',
                    'no_se_ha' => 'No se ha agregado ningún registro a este módulo dinámico.',
                    'schemas' => 'Schemas',
                    'sin_asignar' => 'Sin Asignar',
                    'sin_registros_an' => 'Sin registros aún',
                    'eliminar_este_registro' => '¿Eliminar este registro de contenido?'
                ],
                'layouteditor' => [
                    'agrega_hojas_de' => 'Agrega hojas de estilo enlazadas, fuentes o scripts externos para este layout en particular (ej. Bootstrap alternativo, Google Fonts, FontAwesome). Si se dejan vacíos, se usará el CDN de Bootstrap 5.3 por defecto.',
                    'cdns_y_recursos' => 'CDNs y Recursos Externos',
                    'datos_del_layout' => 'Datos del layout',
                    'define_variables_css' => 'Define variables CSS personalizadas. Ej:',
                    'descripcin_opcional' => 'Descripción opcional',
                    'ej_landing_con' => 'Ej: Landing con nav y footer',
                    'eliminar_fila' => 'Eliminar fila',
                    'footer_page_builder' => 'Footer (Page Builder)',
                    'guardar_layout' => 'Guardar layout',
                    'men_de_navegacin' => 'Menú de navegación',
                    'nuevo_layout' => 'Nuevo layout',
                    'paleta_de_colores' => 'Paleta de colores',
                    'recursos_en_body' => 'Recursos en Body (Scripts)',
                    'se_inyecta_antes' => 'Se inyecta antes del cierre de',
                    'usar_paleta_del' => 'Usar paleta del sistema (Bootswatch)',
                    'variable' => 'Variable',
                    'sin_men' => '— Sin menú —'
                ],
                'layouts' => [
                    'crear_el_primero' => 'Crear el primero',
                    'eliminar_layout' => 'Eliminar layout',
                    'footer' => 'Footer',
                    'layout_eliminado_correctamente' => 'Layout eliminado correctamente',
                    'layouts_cms' => 'Layouts CMS',
                    'men' => 'Menú',
                    'paleta' => 'Paleta',
                    'personalizada' => 'Personalizada',
                    'sin_layouts' => 'Sin layouts.',
                    'sistema' => 'Sistema'
                ],
                'localization' => [
                    'activar_idioma' => 'Activar idioma',
                    'buscar_por_clave' => 'Buscar por clave o texto traducido...',
                    'cms__localizacin' => 'CMS — Localización y Traducciones',
                    'cargando_traducciones' => 'Cargando traducciones...',
                    'clave_key' => 'Clave (Key)',
                    'clona_todas_las' => 'Clona todas las traducciones del idioma seleccionado para arrancar rápidamente.',
                    'copiar_claves_base' => 'Copiar claves base desde',
                    'cdigo' => 'Código',
                    'cdigo_iso' => 'Código ISO',
                    'cdigo_iso_ej' => 'Código ISO (Ej: \'es\', \'en\', \'fr\')',
                    'desactivar_idioma' => 'Desactivar idioma',
                    'edita_las_claves' => 'Edita las claves de traducción de la plataforma. La caché se invalidará automáticamente al guardar.',
                    'editar_idioma' => 'Editar Idioma',
                    'el_idioma_predeterminado' => 'El idioma predeterminado debe permanecer activo.',
                    'error_al_actualizar' => 'Error al actualizar idioma.',
                    'error_al_cargar' => 'Error al cargar traducciones.',
                    'error_al_crear' => 'Error al crear idioma.',
                    'error_al_eliminar' => 'Error al eliminar idioma.',
                    'error_al_guardar' => 'Error al guardar.',
                    'error_de_red' => 'Error de red al guardar traducciones.',
                    'escribe_la_traduccin' => 'Escribe la traducción...',
                    'establecer' => 'Establecer',
                    'establecer_como_idioma' => 'Establecer como idioma predeterminado',
                    'estado_activo' => 'Estado (Activo)',
                    'estado_del_idioma' => 'Estado del idioma actualizado.',
                    'franais' => 'Français',
                    'gestiona_los_idiomas' => 'Gestiona los idiomas activos de la plataforma y edita los diccionarios de traducciones almacenados en caché.',
                    'grupo' => 'Grupo',
                    'habilitar_idioma' => 'Habilitar idioma',
                    'habilitar_idioma_de' => 'Habilitar idioma de forma inmediata',
                    'idioma' => 'Idioma',
                    'idioma_actualizado_correctamente' => 'Idioma actualizado correctamente.',
                    'idioma_creado_correctamente' => 'Idioma creado correctamente.',
                    'idioma_eliminado_correctamente' => 'Idioma eliminado correctamente.',
                    'idiomas' => 'Idiomas',
                    'no_hay_idiomas' => 'No hay idiomas registrados en la base de datos.',
                    'no_puedes_eliminar' => 'No puedes eliminar el idioma predeterminado del sistema.',
                    'no_se_encontraron' => 'No se encontraron claves de traducción para los filtros aplicados.',
                    'nombre_del_idioma' => 'Nombre del idioma (Etiqueta)',
                    'predeterminado' => 'Predeterminado',
                    'registrar' => 'Registrar',
                    'registrar_idioma' => 'Registrar Idioma',
                    'registrar_nuevo_idioma' => 'Registrar nuevo idioma',
                    'todos_los_grupos' => 'Todos los grupos',
                    'traducciones_actualizadas_e' => 'Traducciones actualizadas e invalidada la caché.',
                    'traduccin_valor' => 'Traducción (Valor)',
                    'traducir' => 'Traducir',
                    'volver_a_idiomas' => 'Volver a Idiomas',
                    'volver_al_cms' => 'Volver al CMS',
                    'no_duplicar_vaco' => '— No duplicar (Vacío) —',
                    'o_fr' => '🇫🇷 o fr'
                ],
                'media' => [
                    'archivo_eliminado' => 'Archivo eliminado.',
                    'arrastra_imgenes_aqu' => 'Arrastra imágenes aquí o',
                    'biblioteca_de_media' => 'Biblioteca de Media',
                    'buscar_por_nombre' => 'Buscar por nombre o alt text...',
                    'copiar_url' => 'Copiar URL',
                    'eliminar_archivo' => 'Eliminar archivo',
                    'error_al_eliminar' => 'Error al eliminar el archivo.',
                    'error_al_subir' => 'Error al subir',
                    'fallo_de_red' => 'Fallo de red al subir',
                    'jpg_png_gif' => 'JPG, PNG, GIF, WebP, SVG — Máximo 8 MB por archivo',
                    'manejador' => 'Manejador',
                    'no_hay_archivos' => 'No hay archivos. Sube una imagen para comenzar.',
                    'zona_de_subida' => 'Zona de subida de archivos',
                    'eliminar_este_archivo' => '¿Eliminar este archivo? No se puede deshacer.',
                    'url' => '⎘ URL',
                    'copiado' => '✓ Copiado',
                    'title' => 'CMS — Biblioteca de Medios',
                    'subtitle' => 'Sube, visualiza y gestiona las imágenes y recursos multimedia utilizados en tus páginas del CMS.',
                    'back_to_cms' => 'Volver al CMS',
                    'upload_btn' => 'Subir nuevo archivo',
                    'upload.drag_drop' => 'Arrastra un archivo aquí o haz clic para buscarlo',
                    'upload.hint' => 'Tipos permitidos: imágenes (JPG, PNG, GIF, SVG, WebP) y PDFs. Máximo 10MB.',
                    'toast.copied' => 'Copiado al portapapeles',
                    'toast.copied_detail' => 'Enlace copiado correctamente al portapapeles.',
                    'confirm_delete' => '¿Estás seguro de eliminar este archivo? Esta acción no se puede deshacer.',
                    'toast.deleted' => 'Archivo eliminado correctamente.',
                    'upload_success' => 'archivo(s) subido(s) correctamente.',
                    'uploading' => 'Subiendo...'
                ],
                'menuitems' => [
                    'editar_item' => 'Editar item',
                    'eliminar_item' => 'Eliminar item',
                    'etiqueta' => 'Etiqueta',
                    'inicio' => 'Inicio',
                    'item_eliminado_correctamente' => 'Item eliminado correctamente',
                    'misma_pestaa' => 'Misma pestaña',
                    'no_hay_items' => 'No hay items.',
                    'nueva_pestaa' => 'Nueva pestaña',
                    'nuevo_item' => 'Nuevo item',
                    'target' => 'Target',
                    'url' => 'URL'
                ],
                'menus' => [
                    'eliminar_men' => 'Eliminar menú',
                    'gestionar_items' => 'Gestionar items',
                    'items' => 'Items',
                    'men_eliminado_correctamente' => 'Menú eliminado correctamente',
                    'men_principal' => 'Menú principal',
                    'mens_cms' => 'Menús CMS',
                    'mobile' => 'Mobile',
                    'nfd' => 'NFD',
                    'nuevo_men' => 'Nuevo menú',
                    'principal' => 'Principal',
                    'sidebar' => 'Sidebar',
                    'tipo' => 'Tipo'
                ],
                'modulebuilder' => [
                    '0_campos' => '0 campo(s)',
                    'campos' => 'Campos',
                    'contenido' => 'Contenido',
                    'crear_mdulo' => 'Crear Módulo',
                    'editar_esquema' => 'Editar Esquema',
                    'eliminar_mdulo' => 'Eliminar módulo',
                    'icono' => 'Icono',
                    'mdulo' => 'Módulo',
                    'mdulo_eliminado_correctamente' => 'Módulo eliminado correctamente',
                    'mdulos_dinmicos' => 'Módulos Dinámicos',
                    'no_hay_mdulos' => 'No hay módulos dinámicos definidos',
                    'sin_descripcin' => 'Sin descripción'
                ],
                'modulebuilderedit' => [
                    'buscable' => 'Buscable',
                    'cms_esttico' => 'CMS Estático',
                    'campo' => 'Campo',
                    'crear_mdulo_dinmico' => 'Crear Módulo Dinámico',
                    'define_el_esquema' => 'Define el esquema, campos y relaciones para un nuevo tipo de contenido.',
                    'detalle_el_propsito' => 'Detalle el propósito de este contenido...',
                    'editar_mdulo_dinmico' => 'Editar Módulo Dinámico',
                    'editor_enriquecido_html' => 'Editor Enriquecido (HTML)',
                    'ej_preguntas_frecuentes' => 'Ej. Preguntas Frecuentes, Banners, Libros',
                    'el_mdulo_debe' => 'El módulo debe tener al menos un campo.',
                    'eliminar_campo' => 'Eliminar campo',
                    'etiqueta_visual' => 'Etiqueta Visual',
                    'fecha_y_hora' => 'Fecha y Hora',
                    'guardar_mdulo' => 'Guardar Módulo',
                    'icono_emoji' => 'Icono (Emoji)',
                    'ingresa_el_formato' => 'Ingresa el formato',
                    'lista_de_seleccin' => 'Lista de Selección (Dropdown)',
                    'longitud_mxima' => 'Longitud Máxima',
                    'nombre_columna_bd' => 'Nombre Columna (BD)',
                    'nombre_del_mdulo' => 'Nombre del Módulo',
                    'nmero_decimal' => 'Número Decimal',
                    'nmero_entero' => 'Número Entero',
                    'orden_en_el' => 'Orden en el Menú',
                    'otro_campo' => 'Otro campo',
                    'pginas_cms_pages' => 'Páginas CMS (pages)',
                    'relacin_con_otro' => 'Relación con otro Módulo',
                    'requerido' => 'Requerido',
                    'slug_nombre_de' => 'Slug (Nombre de Tabla)',
                    'solo_letras_minsculas' => 'Solo letras minúsculas, números y guiones bajos.',
                    'texto_corto_varchar' => 'Texto Corto (Varchar)',
                    'texto_largo_text' => 'Texto Largo (Text)',
                    'texto_visible_en' => 'Texto visible en formularios',
                    'tipo_de_campo' => 'Tipo de Campo',
                    'valor' => 'Valor',
                    'clave_valor' => 'clave: Valor',
                    'ej_precio_de' => 'ej. Precio de Lanzamiento',
                    'ej_preciolanzamiento' => 'ej. precio_lanzamiento',
                    'min3_url_email' => 'min:3, url, email',
                    'configuracin_general' => '⚙️ Configuración General',
                    'destino_de_la' => '🎯 Destino de la Relación',
                    'recomendaciones' => '💡 Recommendations',
                    'campos_del_mdulo' => '🗂️ Campos del Módulo'
                ],
                'pageeditorbuilder' => [
                    'archivado' => 'Archivado',
                    'borrador' => 'Borrador',
                    'editar_pgina' => 'Editar página',
                    'layout' => 'Layout',
                    'mi_pgina' => 'Mi página',
                    'mximo_3_niveles' => 'Máximo 3 niveles',
                    'nueva_pgina_page' => 'Nueva página (Page Builder)',
                    'profundidad' => 'Profundidad:',
                    'publicado' => 'Publicado',
                    'si_no_se' => 'Si no se selecciona, se usará el layout activo por defecto.',
                    'sobrescribe_el_men' => 'Sobrescribe el menú definido en el layout.',
                    'ttulo' => 'Título',
                    'volver' => 'Volver',
                    'layout_predeterminado' => '— Layout predeterminado —',
                    'men_del_layout' => '— Menú del layout —'
                ],
                'pageeditorstatic' => [
                    'contenido_html' => 'Contenido (HTML)',
                    'crear_pgina_esttica' => 'Crear página estática',
                    'cdigo_personalizado' => 'Código Personalizado',
                    'escribe_el_contenido' => 'Escribe el contenido de la página aquí...',
                    'mi_pgina_esttica' => 'Mi página estática',
                    'nueva_pgina_clsica' => 'Nueva página (Clásica)',
                    'seo__metadatos' => 'SEO & Metadatos',
                    'template' => 'Template',
                    'vista_previa' => '👁 Vista previa'
                ],
                'pages' => [
                    'archivadas' => 'Archivadas',
                    'avanzada_page_builder' => 'Avanzada (Page Builder)',
                    'buscar_por_ttulo' => 'Buscar por título o slug...',
                    'clsica_texto_enriquecido' => 'Clásica (Texto Enriquecido)',
                    'eliminar_pgina' => 'Eliminar página',
                    'listado_y_administracin' => 'Listado y administración de las páginas dinámicas y de texto enriquecido.',
                    'media' => 'Media',
                    'nueva_pgina' => 'Nueva Página',
                    'preview' => 'Preview',
                    'publicar' => 'Publicar',
                    'pgina_eliminada_correctamente' => 'Página eliminada correctamente',
                    'pginas_cms' => 'Páginas CMS',
                    'todos_los_estados' => 'Todos los estados',
                    'eliminar_esta_pgina' => '¿Eliminar esta página? Esta acción es irreversible.',
                    'publicar_esta_pgina' => '¿Publicar esta página?'
                ],
                'reservedpaths' => [
                    'accin' => 'Acción',
                    'aadir' => 'Añadir',
                    'path' => 'Path',
                    'personalizadas' => 'Personalizadas',
                    'razn' => 'Razón',
                    'razn_opcional' => 'Razón (opcional)',
                    'rutas_restringidas' => 'Rutas Restringidas',
                    'rutas_bloqueadas_por' => 'Rutas bloqueadas por el administrador',
                    'rutas_protegidas_por' => 'Rutas protegidas por defecto',
                    'sin_rutas_personalizadas' => 'Sin rutas personalizadas.'
                ],
                'settings' => [
                    'bloquear_completamente_noindexnofollow' => 'Bloquear Completamente (noindex,nofollow)',
                    'cdns_globales' => 'CDNs Globales',
                    'cdns_y_recursos' => 'CDNs y Recursos Globales:',
                    'cms__configuracin' => 'CMS — Configuración Global',
                    'css_global' => 'CSS Global',
                    'css_info' => 'Este código se inyecta dentro de la etiqueta &lt;head&gt; en todas las páginas públicas del CMS. Ideal para estilos globales, tipografías y overrides de componentes.',
                    'compartir_en_redes' => 'Compartir en Redes (OpenGraph)',
                    'configura_los_enlaces' => 'Configura los enlaces de CDN por defecto (ej. Bootstrap, FontAwesome, Google Fonts) para todo el sitio. Si un layout no define sus propios CDNs, heredará estos valores. Si ambos están vacíos, se aplicará Bootstrap 5.3 por defecto.',
                    'configuracin' => 'Configuración',
                    'configuracin_seo_global' => 'Configuración SEO Global:',
                    'configuracin_global_guardada' => 'Configuración global guardada correctamente.',
                    'cdigo_de_idioma' => 'Código de idioma (ej.',
                    'define_los_valores' => 'Define los valores por defecto que se utilizarán como fallback si una página no tiene definidos sus propios metadatos SEO, así como el idioma principal del sitio.',
                    'descripcin_seo_global' => 'Descripción SEO Global',
                    'descripcin_general_de' => 'Descripción general de mi sitio web...',
                    'directiva_robots_global' => 'Directiva Robots Global',
                    'error_al_guardar' => 'Error al guardar la configuración.',
                    'este_cdigo_se' => 'Este código se inyecta antes del cierre de la etiqueta',
                    'idioma_principal_del' => 'Idioma Principal del Sitio (HTML lang)',
                    'imagen_opengraph_global' => 'Imagen OpenGraph Global',
                    'imagen_por_defecto' => 'Imagen por defecto al compartir enlaces si la página no especifica una.',
                    'indexar_pero_no' => 'Indexar pero No Seguir enlaces (index,nofollow)',
                    'indexar_y_seguir' => 'Indexar y Seguir enlaces (index,follow)',
                    'js_global' => 'JS Global',
                    'meta_descripcin_predeterminada' => 'Meta descripción predeterminada para el posicionamiento orgánico.',
                    'metadatos_de_bsqueda' => 'Metadatos de Búsqueda',
                    'mi_sitio_web' => 'Mi Sitio Web',
                    'no_indexar_pero' => 'No Indexar pero Seguir enlaces (noindex,follow)',
                    'recursos_body_globales' => 'Recursos Body Globales (Scripts)',
                    'recursos_head_globales' => 'Recursos Head Globales (CSS/JS)',
                    'seo_global_e' => 'SEO Global e Idioma',
                    'seleccionar' => 'Seleccionar',
                    'ttulo_seo_global' => 'Título SEO Global',
                    'ttulo_por_defecto' => 'Título por defecto para las pestañas de los buscadores.',
                    'vista_previa_opengraph' => 'Vista previa OpenGraph global',
                    'en_todas_las' => 'en todas las páginas públicas del CMS. Ideal para analíticas, scripts de terceros o comportamientos globales.',
                    'biblioteca_de_media' => '🖼️ Biblioteca de Media',
                    'title' => 'CMS — Ajustes Generales',
                    'subtitle' => 'Configura los parámetros principales del motor del CMS, SEO global e inyección de código.',
                    'tabs.general' => 'Información del Sitio',
                    'tabs.seo' => 'SEO Global',
                    'tabs.code' => 'Scripts y CSS',
                    'general.site_title' => 'Título del Sitio',
                    'general.site_description' => 'Descripción del Sitio',
                    'general.default_language' => 'Idioma por defecto',
                    'seo.meta_title' => 'Meta Título Global',
                    'seo.meta_description' => 'Meta Descripción Global',
                    'seo.robots' => 'Robots (Directiva global)',
                    'code.head_inject' => 'Inyección de código en Head',
                    'code.body_inject' => 'Inyección de código en Body',
                    'toast.success' => 'Los cambios en la configuración se han guardado.'
                ],
                'tags' => [
                    'category.structure' => 'Estructura',
                    'category.advanced_structure' => 'Estructura Avanzada',
                    'category.text' => 'Texto',
                    'category.inline' => 'Formato en Línea',
                    'category.list' => 'Listas',
                    'category.media' => 'Multimedia',
                    'category.table' => 'Tablas',
                    'category.form' => 'Formularios',
                    'category.advanced_form' => 'Formularios Avanzados',
                    'category.interactive' => 'Interactivos',
                    'label_div' => 'División',
                    'label_section' => 'Sección',
                    'label_header' => 'Encabezado Superior',
                    'label_footer' => 'Pie de Página',
                    'label_h1' => 'Encabezado 1',
                    'label_h2' => 'Encabezado 2',
                    'label_h3' => 'Encabezado 3',
                    'label_h4' => 'Encabezado 4',
                    'label_h5' => 'Encabezado 5',
                    'label_h6' => 'Encabezado 6',
                    'label_p' => 'Párrafo',
                    'label_blockquote' => 'Cita en Bloque',
                    'label_ul' => 'Lista Desordenada',
                    'label_ol' => 'Lista Ordenada',
                    'label_li' => 'Elemento de Lista',
                    'label_img' => 'Imagen',
                    'label_video' => 'Video',
                    'label_audio' => 'Audio',
                    'label_iframe' => 'Marco Flotante (Iframe)',
                    'label_form' => 'Formulario',
                    'label_input' => 'Campo de Entrada',
                    'label_textarea' => 'Área de Texto',
                    'label_select' => 'Selector Desplegable',
                    'label' => 'Etiqueta',
                    'label_submit' => 'Botón de Envío',
                    'label_main' => 'Contenido Principal',
                    'label_article' => 'Artículo',
                    'label_aside' => 'Barra Lateral (Aside)',
                    'label_nav' => 'Navegación',
                    'label_table' => 'Tabla',
                    'label_thead' => 'Encabezado de Tabla',
                    'label_tbody' => 'Cuerpo de Tabla',
                    'label_tr' => 'Fila de Tabla',
                    'label_th' => 'Celda de Encabezado',
                    'label_td' => 'Celda de Datos',
                    'label_option' => 'Opción',
                    'label_optgroup' => 'Grupo de Opciones',
                    'label_fieldset' => 'Conjunto de Campos',
                    'label_legend' => 'Leyenda',
                    'label_details' => 'Acordeón de Detalles',
                    'label_summary' => 'Resumen',
                    'label_dialog' => 'Ventana de Diálogo',
                    'label_link' => 'Enlace',
                    'label_span' => 'Contenedor en Línea (Span)',
                    'label_icon' => 'Icono',
                    'label_hr' => 'Separador Horizontal'
                ]
            ],
            'auth' => [
                'confirmpassword' => [
                    'title' => 'Confirmar contraseña',
                    'description' => 'Por favor confirma tu contraseña antes de continuar.',
                    'password' => 'Contraseña'
                ],
                'forgotpassword' => [
                    'title' => 'Recuperar contraseña',
                    'description' => 'Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.',
                    'email' => 'Correo electrónico',
                    'email_placeholder' => 'correo@ejemplo.com',
                    'send_link' => 'Enviar enlace',
                    'back_to_login' => 'Volver al login'
                ],
                'login' => [
                    'title' => 'Iniciar sesión',
                    'email' => 'Correo electrónico',
                    'email_placeholder' => 'correo@ejemplo.com',
                    'password' => 'Contraseña',
                    'forgot_password' => '¿Olvidaste tu contraseña?',
                    'show' => 'Mostrar',
                    'hide' => 'Ocultar',
                    'remember_me' => 'Recordarme',
                    'sign_in' => 'Iniciar sesión',
                    'no_account' => '¿No tienes cuenta?',
                    'register' => 'Registrarse'
                ],
                'register' => [
                    'title' => 'Crear cuenta',
                    'full_name' => 'Nombre completo',
                    'name_placeholder' => 'Tu nombre',
                    'email' => 'Correo electrónico',
                    'email_placeholder' => 'correo@ejemplo.com',
                    'password' => 'Contraseña',
                    'confirm_password' => 'Confirmar contraseña',
                    'create_account' => 'Crear cuenta',
                    'already_have_account' => '¿Ya tienes cuenta?',
                    'sign_in' => 'Iniciar sesión'
                ],
                'resetpassword' => [
                    'title' => 'Nueva contraseña',
                    'email' => 'Correo electrónico',
                    'new_password' => 'Nueva contraseña',
                    'confirm_password' => 'Confirmar contraseña',
                    'reset_password' => 'Restablecer contraseña'
                ],
                'twofactorchallenge' => [
                    'title' => 'Verificación de dos factores',
                    'use_recovery_description' => 'Ingresa uno de tus códigos de recuperación de emergencia.',
                    'use_code_description' => 'Ingresa el código de tu aplicación de autenticación.',
                    'auth_code' => 'Código de autenticación',
                    'recovery_code' => 'Código de recuperación',
                    'verify' => 'Verificar',
                    'use_auth_code' => 'Usar código de autenticación',
                    'use_recovery_code' => 'Usar código de recuperación'
                ],
                'verifyemail' => [
                    'title' => 'Verificación de correo',
                    'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a la dirección de correo que proporcionaste al registrarte.',
                    'resend' => 'Reenviar correo de verificación',
                    'logout' => 'Cerrar sesión'
                ]
            ],
            'billing' => [
                'index' => [
                    'title' => 'Facturación y Suscripción',
                    'current_subscription' => 'Suscripción Actual',
                    'standard_plan' => 'Plan Estándar',
                    'subscription_id' => 'ID de Suscripción',
                    'next_charge' => 'Siguiente cobro',
                    'payment_method' => 'Método de pago',
                    'pause' => 'Pausar',
                    'cancel' => 'Cancelar',
                    'no_active_subscription' => 'No tienes una suscripción activa.',
                    'choose_plan' => 'Elegir un Plan',
                    'payment_history' => 'Historial de Pagos',
                    'col_date' => 'Fecha',
                    'col_concept' => 'Concepto',
                    'col_amount' => 'Monto',
                    'col_status' => 'Estado',
                    'col_action' => 'Acción',
                    'subscription_payment' => 'Pago de suscripción',
                    'status_paid' => 'Pagado',
                    'status_issued' => 'Emitido',
                    'status_draft' => 'Borrador',
                    'status_void' => 'Anulado',
                    'status_uncollectible' => 'Incobrable',
                    'action_view_details' => 'Ver Detalles',
                    'action_download_pdf' => 'Descargar PDF',
                    'cancel_title' => 'Cancelar Suscripción',
                    'cancel_description' => 'Elige cómo deseas proceder con tu cancelación:',
                    'cancel_eop_title' => 'Al finalizar el periodo',
                    'cancel_eop_desc' => 'Mantendrás acceso hasta el final de tu periodo actual.',
                    'cancel_imm_title' => 'Inmediatamente',
                    'cancel_imm_desc' => 'La licencia será revocada de inmediato.',
                    'cancel_warning' => 'Atención: Esta acción es irreversible. Para confirmar, escribe',
                    'cancel_word' => 'CANCELAR',
                    'cancel_word_now' => 'CANCELAR AHORA',
                    'cancel_placeholder' => 'Escribe la palabra de seguridad...',
                    'pause_title' => 'Pausar Suscripción',
                    'pause_description' => 'Pausar tu suscripción detendrá los cobros automáticos pero tu licencia dejará de ser válida hasta que la reanudes.',
                    'pause_warning' => 'Escribe PAUSAR para confirmar esta acción.',
                    'pause_word' => 'PAUSAR'
                ],
                'invoices' => [
                    'title' => 'Historial de Facturas',
                    'back_to_billing' => '← Facturación',
                    'col_date' => 'Fecha',
                    'col_concept' => 'Concepto',
                    'col_amount' => 'Monto',
                    'col_status' => 'Estado',
                    'col_actions' => 'Acciones',
                    'status_paid' => 'Pagada',
                    'action_view_details' => 'Ver Detalles',
                    'action_download_pdf' => 'Descargar PDF'
                ],
                'invoice_detail' => [
                    'title' => 'Detalle de Factura',
                    'back' => 'Volver',
                    'invoice_number' => 'Factura #',
                    'status_paid' => 'Pagada',
                    'concept' => 'Concepto',
                    'subscription_payment' => 'Pago de Suscripción',
                    'plan_prefix' => 'Plan:',
                    'subscription_period' => 'Período de Suscripción',
                    'invoice_id' => 'ID de Factura',
                    'col_description' => 'Descripción',
                    'col_quantity' => 'Cantidad',
                    'col_price' => 'Precio',
                    'col_total' => 'Total',
                    'subtotal' => 'Subtotal:',
                    'taxes' => 'Impuestos:',
                    'total' => 'Total:',
                    'download_pdf' => 'Descargar PDF',
                    'payment_info' => 'Información de Pago',
                    'provider' => 'Proveedor',
                    'payment_method' => 'Método de Pago',
                    'currency' => 'Divisa',
                    'payment_date' => 'Fecha de Pago'
                ]
            ],
            'settings' => [
                'appearance' => [
                    'title' => 'Ajustes de apariencia',
                    'description' => 'Actualiza los ajustes de apariencia de tu cuenta'
                ],
                'profile' => [
                    'title' => 'Ajustes de perfil',
                    'section_title' => 'Información de perfil',
                    'section_description' => 'Actualiza tu nombre y dirección de correo',
                    'name' => 'Nombre',
                    'name_placeholder' => 'Nombre completo',
                    'email' => 'Correo electrónico',
                    'email_placeholder' => 'Correo electrónico',
                    'unverified_email' => 'Tu dirección de correo no está verificada.',
                    'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
                    'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
                    'save' => 'Guardar'
                ],
                'security' => [
                    'title' => 'Ajustes de seguridad',
                    'password_section_title' => 'Actualizar contraseña',
                    'password_section_desc' => 'Asegúrate de que tu cuenta use una contraseña larga y aleatoria para mantenerla segura',
                    'current_password' => 'Contraseña actual',
                    'current_password_ph' => 'Contraseña actual',
                    'new_password' => 'Nueva contraseña',
                    'new_password_ph' => 'Nueva contraseña',
                    'confirm_password' => 'Confirmar contraseña',
                    'confirm_password_ph' => 'Confirmar contraseña',
                    'save_password' => 'Guardar contraseña',
                    '2fa_section_title' => 'Autenticación de dos factores',
                    '2fa_section_desc' => 'Administra tu configuración de autenticación de dos factores',
                    '2fa_enable_description' => 'Al activar la autenticación de dos factores, se te solicitará un PIN seguro al iniciar sesión. Puedes obtenerlo desde una aplicación compatible con TOTP en tu teléfono.',
                    '2fa_enabled_description' => 'Se te solicitará un PIN seguro y aleatorio al iniciar sesión, que puedes obtener desde la aplicación compatible con TOTP en tu teléfono.',
                    'continue_setup' => 'Continuar configuración',
                    'enable_2fa' => 'Activar 2FA',
                    'disable_2fa' => 'Desactivar 2FA'
                ]
            ],
            'controllers' => [
                'billing' => [
                    'invoice_not_found' => 'Factura no encontrada.',
                    'cancel_failed' => 'No se pudo cancelar la suscripción.',
                    'cancel_success' => 'Suscripción cancelada correctamente.',
                    'pause_failed' => 'No se pudo pausar la suscripción.',
                    'pause_success' => 'Suscripción pausada correctamente.'
                ],
                'child_license' => [
                    'verification_sent' => 'Correo de verificación enviado a ',
                    'license_created' => 'Licencia creada exitosamente.',
                    'code_resent' => 'Código reenviado.',
                    'token_invalid' => 'Token de verificación inválido.',
                    'link_expired' => 'El enlace de verificación expiró o es inválido.',
                    'email_verified_register' => 'Email verificado. Completa tu registro.',
                    'email_verified' => 'Email verificado exitosamente.',
                    'license_revoked' => 'Licencia revocada.'
                ],
                'dashboard' => [
                    'no_plan' => 'Sin Plan',
                    'partner_fallback' => 'Partner'
                ],
                'email_verification' => [
                    'already_verified' => 'Ya verificado.',
                    'throttle' => 'Por favor espera antes de solicitar otro envío.',
                    'link_sent' => 'Enlace de verificación enviado.',
                    'link_invalid' => 'Enlace de verificación inválido o expirado.'
                ],
                'onboarding' => [
                    'checkout_success' => 'Suscripción activada. ¡Bienvenido a Lemur LMS!',
                    'checkout_cancelled' => 'El proceso de pago fue cancelado. Puedes intentarlo de nuevo cuando estés listo.'
                ],
                'white_label' => [
                    'already_active' => 'Ya tienes una solicitud activa.',
                    'request_sent' => 'Solicitud enviada. Te avisaremos pronto.'
                ],
                'admin' => [
                    'user_created' => 'Usuario creado exitosamente.',
                    'whitelabel_approved' => 'Aplicación aprobada.',
                    'whitelabel_rejected' => 'Aplicación rechazada.'
                ],
                'branding' => [
                    'logo_created' => 'Logo creado correctamente.',
                    'logo_not_found' => 'Logo no encontrado.',
                    'logo_updated' => 'Logo actualizado.',
                    'logo_deleted' => 'Logo eliminado.',
                    'logo_activated' => 'Logo activado. Los demás logos fueron desactivados.',
                    'banner_created' => 'Banner creado correctamente.',
                    'banner_not_found' => 'Banner no encontrado.',
                    'banner_updated' => 'Banner actualizado.',
                    'banner_deleted' => 'Banner eliminado.',
                    'banner_activated' => 'Banner activado.',
                    'banner_deactivated' => 'Banner desactivado.',
                    'order_updated' => 'Orden actualizado.'
                ],
                'cms' => [
                    'cache_cleared' => 'Caché del CMS limpiada correctamente.',
                    'template_created' => 'Plantilla creada correctamente.',
                    'template_error' => 'Error al crear la plantilla: '
                ],
                'language' => [
                    'created' => 'Idioma creado correctamente.',
                    'create_error' => 'Error al crear idioma: ',
                    'updated' => 'Idioma actualizado correctamente.',
                    'update_error' => 'Error al actualizar idioma: ',
                    'deleted' => 'Idioma eliminado correctamente.',
                    'delete_error' => 'Error al eliminar idioma: ',
                    'translations_updated' => 'Traducciones actualizadas correctamente.'
                ],
                'layout' => [
                    'created' => 'Layout creado.',
                    'updated' => 'Layout actualizado.',
                    'deleted' => 'Layout eliminado.',
                    'not_found' => 'Layout no encontrado.'
                ],
                'media' => [
                    'type_not_allowed' => 'Tipo de archivo no permitido. Solo imágenes.',
                    'file_too_large' => 'El archivo supera el límite de 8 MB.',
                    'file_not_found' => 'Archivo no encontrado.',
                    'file_deleted' => 'Archivo eliminado.'
                ],
                'menu' => [
                    'menu_not_found' => 'Menú no encontrado.',
                    'item_created' => 'Item creado.',
                    'item_updated' => 'Item actualizado.',
                    'item_deleted' => 'Item eliminado.',
                    'menu_created' => 'Menú creado.',
                    'menu_deleted' => 'Menú eliminado.'
                ],
                'page' => [
                    'created' => 'Página creada. Puedes continuar editando.',
                    'not_found' => 'Página no encontrada.',
                    'updated' => 'Página actualizada.',
                    'published' => 'Página publicada.',
                    'deleted' => 'Página eliminada.',
                    'custom_code_saved' => 'Custom code guardado.',
                    'schema_json_invalid' => 'El JSON de Schema es inválido.',
                    'seo_saved' => 'SEO guardado correctamente.',
                    'html_required' => 'El campo html es requerido.',
                    'html_imported' => 'HTML importado correctamente.',
                    'html_error' => 'Error al procesar el HTML: '
                ],
                'cms_settings' => [
                    'saved' => 'Configuración guardada correctamente.'
                ],
                'gateway' => [
                    'configured' => 'Pasarela {provider} configurada correctamente.',
                    'internal_error' => 'Error interno al procesar la configuración.'
                ],
                'dynamic_module' => [
                    'module_not_found' => 'Módulo no encontrado.',
                    'not_authenticated' => 'No autenticado.',
                    'profile_not_found' => 'Perfil de acceso CMS no encontrado.',
                    'no_permission' => 'No tienes permiso para {action} en el módulo {module}.',
                    'record_not_found' => 'Registro no encontrado.',
                    'record_created' => 'Registro creado correctamente.',
                    'record_updated' => 'Registro actualizado correctamente.',
                    'record_deleted' => 'Registro eliminado.'
                ],
                'module_builder' => [
                    'created' => 'Módulo dinámico creado correctamente.',
                    'updated' => 'Módulo dinámico actualizado correctamente.',
                    'deleted' => 'Módulo dinámico eliminado.'
                ],
                'profile' => [
                    'updated' => 'Perfil actualizado.'
                ],
                'security' => [
                    'password_updated' => 'Contraseña actualizada.'
                ],
                'team' => [
                    'created' => 'Equipo creado.',
                    'updated' => 'Equipo actualizado.',
                    'deleted' => 'Equipo eliminado.'
                ],
                'team_invitation' => [
                    'sent' => 'Invitación enviada.',
                    'cancelled' => 'Invitación cancelada.'
                ],
                'team_member' => [
                    'role_updated' => 'Rol del miembro actualizado.',
                    'owner_cannot_be_removed' => 'El propietario del equipo no puede ser eliminado.',
                    'removed' => 'Miembro eliminado.'
                ]
            ]
        ];
    }
}