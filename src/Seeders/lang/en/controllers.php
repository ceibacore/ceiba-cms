<?php

declare(strict_types=1);

return [
    'billing' => [
        'invoice_not_found' => 'Invoice not found.',
        'cancel_failed' => 'Could not cancel the subscription.',
        'cancel_success' => 'Subscription cancelled successfully.',
        'pause_failed' => 'Could not pause the subscription.',
        'pause_success' => 'Subscription paused successfully.',
    ],
    'child_license' => [
        'verification_sent' => 'Verification email sent to',
        'license_created' => 'License created successfully.',
        'code_resent' => 'Code resent.',
        'token_invalid' => 'Invalid verification token.',
        'link_expired' => 'The verification link has expired or is invalid.',
        'email_verified_register' => 'Email verified. Complete your registration.',
        'email_verified' => 'Email verified successfully.',
        'license_revoked' => 'License revoked.',
    ],
    'dashboard' => [
        'no_plan' => 'No Plan',
        'partner_fallback' => 'Partner',
    ],
    'email_verification' => [
        'already_verified' => 'Already verified.',
        'throttle' => 'Please wait before requesting another send.',
        'link_sent' => 'Verification link sent.',
        'link_invalid' => 'Invalid or expired verification link.',
    ],
    'onboarding' => [
        'checkout_success' => 'Subscription activated. Welcome to Lemur LMS!',
        'checkout_cancelled' => 'The payment process was cancelled. You can try again when you are ready.',
    ],
    'white_label' => [
        'already_active' => 'You already have an active request.',
        'request_sent' => 'Request sent. We will notify you soon.',
    ],
    'admin' => [
        'user_created' => 'User created successfully.',
        'whitelabel_approved' => 'Application approved.',
        'whitelabel_rejected' => 'Application rejected.',
    ],
    'branding' => [
        'logo_created' => 'Logo created successfully.',
        'logo_not_found' => 'Logo not found.',
        'logo_updated' => 'Logo updated.',
        'logo_deleted' => 'Logo deleted.',
        'logo_activated' => 'Logo activated. Other logos were deactivated.',
        'banner_created' => 'Banner created successfully.',
        'banner_not_found' => 'Banner not found.',
        'banner_updated' => 'Banner updated.',
        'banner_deleted' => 'Banner deleted.',
        'banner_activated' => 'Banner activated.',
        'banner_deactivated' => 'Banner deactivated.',
        'order_updated' => 'Order updated.',
    ],
    'cms' => [
        'cache_cleared' => 'CMS cache cleared successfully.',
        'template_created' => 'Template created successfully.',
        'template_error' => 'Error creating template:',
    ],
    'language' => [
        'created' => 'Language created successfully.',
        'create_error' => 'Error creating language:',
        'updated' => 'Language updated successfully.',
        'update_error' => 'Error updating language:',
        'deleted' => 'Language deleted successfully.',
        'delete_error' => 'Error deleting language:',
        'translations_updated' => 'Translations updated successfully.',
    ],
    'layout' => [
        'created' => 'Layout created.',
        'updated' => 'Layout updated.',
        'deleted' => 'Layout deleted.',
        'not_found' => 'Layout not found.',
    ],
    'media' => [
        'type_not_allowed' => 'File type not allowed. Images only.',
        'file_too_large' => 'The file exceeds the 8 MB limit.',
        'file_not_found' => 'File not found.',
        'file_deleted' => 'File deleted.',
    ],
    'menu' => [
        'menu_not_found' => 'Menu not found.',
        'item_created' => 'Item created.',
        'item_updated' => 'Item updated.',
        'item_deleted' => 'Item deleted.',
        'menu_created' => 'Menu created.',
        'menu_deleted' => 'Menu deleted.',
    ],
    'page' => [
        'created' => 'Page created. You can continue editing.',
        'not_found' => 'Page not found.',
        'updated' => 'Page updated.',
        'published' => 'Page published.',
        'deleted' => 'Page deleted.',
        'custom_code_saved' => 'Custom code saved.',
        'schema_json_invalid' => 'The Schema JSON is invalid.',
        'seo_saved' => 'SEO saved successfully.',
        'html_required' => 'The html field is required.',
        'html_imported' => 'HTML imported successfully.',
        'html_error' => 'Error processing the HTML:',
    ],
    'cms_settings' => [
        'saved' => 'Settings saved successfully.',
    ],
    'gateway' => [
        'configured' => 'Gateway {provider} configured successfully.',
        'internal_error' => 'Internal error processing the configuration.',
    ],
    'dynamic_module' => [
        'module_not_found' => 'Module not found.',
        'not_authenticated' => 'Not authenticated.',
        'profile_not_found' => 'CMS access profile not found.',
        'no_permission' => 'You do not have permission to {action} in the module {module}.',
        'record_not_found' => 'Record not found.',
        'record_created' => 'Record created successfully.',
        'record_updated' => 'Record updated successfully.',
        'record_deleted' => 'Record deleted.',
    ],
    'module_builder' => [
        'created' => 'Dynamic module created successfully.',
        'updated' => 'Dynamic module updated successfully.',
        'deleted' => 'Dynamic module deleted.',
    ],
    'profile' => [
        'updated' => 'Profile updated.',
    ],
    'security' => [
        'password_updated' => 'Password updated.',
    ],
    'team' => [
        'created' => 'Team created.',
        'updated' => 'Team updated.',
        'deleted' => 'Team deleted.',
    ],
    'team_invitation' => [
        'sent' => 'Invitation sent.',
        'cancelled' => 'Invitation cancelled.',
    ],
    'team_member' => [
        'role_updated' => 'Member role updated.',
        'owner_cannot_be_removed' => 'The team owner cannot be removed.',
        'removed' => 'Member removed.',
    ],
];
