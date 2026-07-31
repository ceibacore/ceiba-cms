<?php

declare(strict_types=1);

return [
    'menu' => [
        'missing_label' => 'La etiqueta del elemento de menú es obligatoria y no puede estar vacía',
        'missing_url' => 'La URL del elemento de menú es obligatoria',
        'invalid_type' => 'Tipo de elemento de menú inválido "{type}". Tipos válidos: {valid_types}',
        'missing_menu_slug' => 'El slug del menú es obligatorio',
        'missing_menu_name' => 'El nombre del menú es obligatorio',
        'duplicate_menu_slug' => 'Ya existe un menú con el slug "{slug}"',
    ],
    'permission' => [
        'denied' => 'Permiso "{permission}" denegado',
        'role_not_found' => 'Rol con ID {role_id} no encontrado',
        'missing_permission' => 'El permiso "{slug}" no existe',
    ],
    'user' => [
        'missing_email' => 'El correo electrónico del usuario es obligatorio',
        'invalid_email' => 'Formato de correo electrónico inválido: {email}',
        'missing_password' => 'La contraseña del usuario es obligatoria',
        'weak_password' => 'La contraseña debe tener al menos 8 caracteres con mayúsculas, minúsculas y números',
        'email_exists' => 'Ya existe un usuario con el correo electrónico "{email}"',
        'not_found' => 'Usuario con ID {id} no encontrado',
        'new_password_required' => 'La nueva contraseña es obligatoria',
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
        'publish_content_required' => 'La página debe tener contenido para ser publicada',
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
        'footer_tree_invalid' => 'Footer_tree del layout inválido: {errors}',
    ],
    'template' => [
        'name_required' => 'El nombre de la plantilla es obligatorio y debe ser una cadena de texto',
        'name_max_length' => 'El nombre de la plantilla no debe exceder los 200 caracteres',
        'tree_required' => 'El árbol de la plantilla es obligatorio',
        'tree_invalid' => 'Árbol de plantilla inválido: {errors}',
        'tree_malformed_json' => 'El árbol de la plantilla es un JSON malformado',
        'tree_json_array_object' => 'El JSON del árbol de la plantilla debe ser un array u objeto',
        'tree_invalid_format' => 'El árbol de la plantilla debe ser una cadena de texto o un array',
    ],
    'language' => [
        'code_required' => 'El código del idioma es obligatorio.',
        'label_required' => 'La etiqueta del idioma esatoria.',
        'translations_array' => 'Las traducciones deben ser un array.',
    ],
    'general' => [
        'resource_not_found_or_denied' => 'El recurso {name} no existe o no tienes permisos',
    ],
    'auth' => [
        'unauthorized' => 'Acceso no autorizado',
        'forbidden' => 'No tienes los privilegios requeridos para acceder a este recurso',
    ],
];
