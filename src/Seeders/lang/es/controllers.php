<?php

declare(strict_types=1);

return [
    'billing' => [
        'invoice_not_found' => 'Factura no encontrada.',
        'cancel_failed' => 'No se pudo cancelar la suscripción.',
        'cancel_success' => 'Suscripción cancelada correctamente.',
        'pause_failed' => 'No se pudo pausar la suscripción.',
        'pause_success' => 'Suscripción pausada correctamente.',
    ],
    'child_license' => [
        'verification_sent' => 'Correo de verificación enviado a ',
        'license_created' => 'Licencia creada exitosamente.',
        'code_resent' => 'Código reenviado.',
        'token_invalid' => 'Token de verificación inválido.',
        'link_expired' => 'El enlace de verificación expiró o es inválido.',
        'email_verified_register' => 'Email verificado. Completa tu registro.',
        'email_verified' => 'Email verificado exitosamente.',
        'license_revoked' => 'Licencia revocada.',
    ],
    'dashboard' => [
        'no_plan' => 'Sin Plan',
        'partner_fallback' => 'Partner',
    ],
    'email_verification' => [
        'already_verified' => 'Ya verificado.',
        'throttle' => 'Por favor espera antes de solicitar otro envío.',
        'link_sent' => 'Enlace de verificación enviado.',
        'link_invalid' => 'Enlace de verificación inválido o expirado.',
    ],
    'onboarding' => [
        'checkout_success' => 'Suscripción activada. ¡Bienvenido a Lemur LMS!',
        'checkout_cancelled' => 'El proceso de pago fue cancelado. Puedes intentarlo de nuevo cuando estés listo.',
    ],
    'white_label' => [
        'already_active' => 'Ya tienes una solicitud activa.',
        'request_sent' => 'Solicitud enviada. Te avisaremos pronto.',
    ],
    'admin' => [
        'user_created' => 'Usuario creado exitosamente.',
        'whitelabel_approved' => 'Aplicación aprobada.',
        'whitelabel_rejected' => 'Aplicación rechazada.',
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
        'order_updated' => 'Orden actualizado.',
    ],
    'cms' => [
        'cache_cleared' => 'Caché del CMS limpiada correctamente.',
        'template_created' => 'Plantilla creada correctamente.',
        'template_error' => 'Error al crear la plantilla: ',
    ],
    'language' => [
        'created' => 'Idioma creado correctamente.',
        'create_error' => 'Error al crear idioma: ',
        'updated' => 'Idioma actualizado correctamente.',
        'update_error' => 'Error al actualizar idioma: ',
        'deleted' => 'Idioma eliminado correctamente.',
        'delete_error' => 'Error al eliminar idioma: ',
        'translations_updated' => 'Traducciones actualizadas correctamente.',
    ],
    'layout' => [
        'created' => 'Layout creado.',
        'updated' => 'Layout actualizado.',
        'deleted' => 'Layout eliminado.',
        'not_found' => 'Layout no encontrado.',
    ],
    'media' => [
        'type_not_allowed' => 'Tipo de archivo no permitido. Solo imágenes.',
        'file_too_large' => 'El archivo supera el límite de 8 MB.',
        'file_not_found' => 'Archivo no encontrado.',
        'file_deleted' => 'Archivo eliminado.',
    ],
    'menu' => [
        'menu_not_found' => 'Menú no encontrado.',
        'item_created' => 'Item creado.',
        'item_updated' => 'Item actualizado.',
        'item_deleted' => 'Item eliminado.',
        'menu_created' => 'Menú creado.',
        'menu_deleted' => 'Menú eliminado.',
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
        'html_error' => 'Error al procesar el HTML: ',
    ],
    'cms_settings' => [
        'saved' => 'Configuración guardada correctamente.',
    ],
    'gateway' => [
        'configured' => 'Pasarela {provider} configurada correctamente.',
        'internal_error' => 'Error interno al procesar la configuración.',
    ],
    'dynamic_module' => [
        'module_not_found' => 'Módulo no encontrado.',
        'not_authenticated' => 'No autenticado.',
        'profile_not_found' => 'Perfil de acceso CMS no encontrado.',
        'no_permission' => 'No tienes permiso para {action} en el módulo {module}.',
        'record_not_found' => 'Registro no encontrado.',
        'record_created' => 'Registro creado correctamente.',
        'record_updated' => 'Registro actualizado correctamente.',
        'record_deleted' => 'Registro eliminado.',
    ],
    'module_builder' => [
        'created' => 'Módulo dinámico creado correctamente.',
        'updated' => 'Módulo dinámico actualizado correctamente.',
        'deleted' => 'Módulo dinámico eliminado.',
    ],
    'profile' => [
        'updated' => 'Perfil actualizado.',
    ],
    'security' => [
        'password_updated' => 'Contraseña actualizada.',
    ],
    'team' => [
        'created' => 'Equipo creado.',
        'updated' => 'Equipo actualizado.',
        'deleted' => 'Equipo eliminado.',
    ],
    'team_invitation' => [
        'sent' => 'Invitación enviada.',
        'cancelled' => 'Invitación cancelada.',
    ],
    'team_member' => [
        'role_updated' => 'Rol del miembro actualizado.',
        'owner_cannot_be_removed' => 'El propietario del equipo no puede ser eliminado.',
        'removed' => 'Miembro eliminado.',
    ],
];
